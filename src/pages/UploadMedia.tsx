import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowLeft, Upload, FileAudio, FileVideo, FileImage, FileText, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function UploadMedia() {
  const { memoryId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [memory, setMemory] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    if (!user || !memoryId) {
      navigate('/dashboard');
      return;
    }
    loadMemory();
  }, [user, memoryId, navigate]);

  const loadMemory = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('id', memoryId)
        .single();

      if (error) throw error;
      setMemory(data);
    } catch (error) {
      console.error('Error loading memory:', error);
      toast({ title: "Error", description: "Failed to load memory", variant: "destructive" });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, mediaType: string) => {
    const file = e.target.files?.[0];
    if (!file || !user || !memoryId) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${memoryId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('media-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('uploaded_media')
        .insert({
          memory_id: memoryId,
          user_id: user.id,
          media_type: mediaType,
          file_path: fileName,
        });

      if (dbError) throw dbError;

      toast({ 
        title: "Upload successful", 
        description: `${mediaType} file has been uploaded.`,
      });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleTextSave = async () => {
    if (!textContent.trim() || !user || !memoryId) return;

    setUploading(true);
    try {
      const { error } = await supabase
        .from('uploaded_media')
        .insert({
          memory_id: memoryId,
          user_id: user.id,
          media_type: 'text',
          text_content: textContent,
        });

      if (error) throw error;

      toast({ title: "Text saved", description: "Your text has been saved." });
      setTextContent('');
    } catch (error: any) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold">SoulEcho</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Upload Media</h1>
        <p className="text-muted-foreground mb-8">
          {memory ? `Add photos, videos, audio, and text for ${memory.name}` : 'Loading...'}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="card-soul">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileVideo className="w-5 h-5" />
                Videos
              </CardTitle>
              <CardDescription>Upload video recordings</CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="video-upload">
                <Button variant="outline" className="w-full" disabled={uploading} asChild>
                  <div>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Video
                  </div>
                </Button>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'video')}
                />
              </label>
            </CardContent>
          </Card>

          <Card className="card-soul">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileAudio className="w-5 h-5" />
                Audio
              </CardTitle>
              <CardDescription>Upload voice recordings</CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="audio-upload">
                <Button variant="outline" className="w-full" disabled={uploading} asChild>
                  <div>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Audio
                  </div>
                </Button>
                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'audio')}
                />
              </label>
            </CardContent>
          </Card>

          <Card className="card-soul">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="w-5 h-5" />
                Images
              </CardTitle>
              <CardDescription>Upload photos</CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="image-upload">
                <Button variant="outline" className="w-full" disabled={uploading} asChild>
                  <div>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </div>
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'image')}
                />
              </label>
            </CardContent>
          </Card>

          <Card className="card-soul">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Text
              </CardTitle>
              <CardDescription>Add messages or stories</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <FileText className="w-4 h-4 mr-2" />
                Add Text
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="card-soul">
          <CardHeader>
            <CardTitle>Add Text Memories</CardTitle>
            <CardDescription>
              Write messages, stories, or paste text conversations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-content">Text Content</Label>
              <Textarea
                id="text-content"
                placeholder="Paste emails, messages, diary entries, or write your memories..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={8}
              />
            </div>
            <Button onClick={handleTextSave} disabled={uploading || !textContent.trim()}>
              <Check className="w-4 h-4 mr-2" />
              {uploading ? 'Saving...' : 'Save Text'}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button size="lg" onClick={() => navigate(`/chat/${memoryId}`)}>
            Start Chatting →
          </Button>
        </div>
      </main>
    </div>
  );
}