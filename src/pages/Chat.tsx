import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Heart, ArrowLeft, Send, Mic, Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export default function Chat() {
  const { memoryId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [memory, setMemory] = useState<any>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [voiceCredits, setVoiceCredits] = useState<number>(0);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!user || !memoryId) {
      navigate('/dashboard');
      return;
    }
    initializeChat();
  }, [user, memoryId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = async () => {
    setLoading(true);
    try {
      // Load memory
      const { data: memoryData, error: memoryError } = await supabase
        .from('memories')
        .select('*')
        .eq('id', memoryId)
        .single();

      if (memoryError) throw memoryError;
      setMemory(memoryData);

      // Load user profile to get voice credits
      const { data: profileData } = await supabase
        .from('profiles')
        .select('voice_credits')
        .eq('user_id', user!.id)
        .single();
      
      if (profileData) {
        setVoiceCredits(profileData.voice_credits);
      }

      // Get or create conversation
      let { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('memory_id', memoryId)
        .maybeSingle();

      if (!convData) {
        const { data: newConv, error: createError } = await supabase
          .from('conversations')
          .insert({
            memory_id: memoryId,
            user_id: user!.id,
            title: `Chat with ${memoryData.name}`,
          })
          .select()
          .single();

        if (createError) throw createError;
        convData = newConv;
      }

      setConversation(convData);

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convData.id)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;
      setMessages((messagesData || []) as Message[]);
    } catch (error: any) {
      console.error('Error initializing chat:', error);
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !conversation || sending) return;

    const userMessage = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      // Add user message to UI
      const tempUserMsg: Message = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: userMessage,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, tempUserMsg]);

      // Save user message to DB
      const { data: savedUserMsg, error: userError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          role: 'user',
          content: userMessage,
        })
        .select()
        .single();

      if (userError) throw userError;

      // Call AI edge function
      const { data, error } = await supabase.functions.invoke('soul-chat', {
        body: {
          memory_id: memoryId,
          conversation_id: conversation.id,
          message: userMessage,
        },
      });

      if (error) throw error;

      // Add AI response to UI
      const aiMessage: Message = {
        id: data.message_id,
        role: 'assistant',
        content: data.response,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id).concat([
        { ...tempUserMsg, id: savedUserMsg.id },
        aiMessage,
      ]));
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to send message", 
        variant: "destructive" 
      });
      setMessages(prev => prev.filter(m => !m.id.startsWith('temp-')));
    } finally {
      setSending(false);
    }
  };

  const playVoiceResponse = async (messageId: string, text: string) => {
    if (playingAudio === messageId) {
      // Stop current audio
      audioRef.current?.pause();
      setPlayingAudio(null);
      return;
    }

    if (voiceCredits <= 0) {
      toast({
        title: "Insufficient Credits",
        description: "You need to purchase more voice credits.",
        variant: "destructive"
      });
      return;
    }

    try {
      setPlayingAudio(messageId);

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (error) {
        if (error.message?.includes('402') || error.message?.includes('Insufficient')) {
          toast({
            title: "Insufficient Credits",
            description: "You need to purchase more voice credits.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        setPlayingAudio(null);
        return;
      }

      // Create audio blob and play
      const audioBlob = new Blob([data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setPlayingAudio(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audioRef.current.play();

      // Update credits locally
      setVoiceCredits(prev => Math.max(0, prev - 1));

    } catch (error: any) {
      console.error('Error playing voice:', error);
      toast({
        title: "Error",
        description: "Failed to generate voice response",
        variant: "destructive"
      });
      setPlayingAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            <div>
              <h1 className="text-xl font-bold">
                {memory ? `Chat with ${memory.name}` : 'SoulEcho'}
              </h1>
              {memory?.relationship && (
                <p className="text-sm text-muted-foreground">{memory.relationship}</p>
              )}
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Voice Credits: </span>
            <span className="font-semibold">{voiceCredits}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Loading conversation...</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Start a conversation with {memory?.name}
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card
                    className={`max-w-[80%] p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </Card>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  disabled={sending}
                />
                <Button onClick={sendMessage} disabled={!inputText.trim() || sending}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                🎙️ Voice feature coming soon!
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}