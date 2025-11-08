import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { memory_id, conversation_id, message } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get memory details and personality
    const { data: memory, error: memoryError } = await supabase
      .from('memories')
      .select('*')
      .eq('id', memory_id)
      .single();

    if (memoryError) throw memoryError;

    // Get uploaded media (text content for now)
    const { data: media } = await supabase
      .from('uploaded_media')
      .select('text_content, media_type')
      .eq('memory_id', memory_id)
      .eq('media_type', 'text')
      .limit(10);

    // Build context from uploaded media
    const mediaContext = media && media.length > 0
      ? media.map(m => m.text_content).join('\n\n')
      : 'No text memories uploaded yet.';

    // Get recent conversation history
    const { data: recentMessages } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: false })
      .limit(10);

    const conversationHistory = recentMessages
      ? recentMessages.reverse().map(m => ({ role: m.role, content: m.content }))
      : [];

    // Build personality prompt
    const traits = Array.isArray(memory.personality_traits) 
      ? memory.personality_traits.join(', ')
      : 'kind and caring';

    const systemPrompt = `You are a compassionate AI helping someone connect with memories of ${memory.name}, their ${memory.relationship || 'loved one'}.

Your role is to respond as if you are echoing ${memory.name}'s personality, based on these characteristics:
- Personality traits: ${traits}
- Relationship: ${memory.relationship || 'loved one'}

Context from their memories:
${mediaContext}

Guidelines:
- Be warm, empathetic, and comforting
- Reference shared memories when relevant
- Use the personality traits to guide your tone and style
- Keep responses personal and emotionally authentic
- If you don't have enough information, acknowledge it gently and ask to learn more
- Help the user feel connected to their loved one's memory`;

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          { role: 'user', content: message }
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', error);
      throw new Error('AI service error');
    }

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;

    // Save AI response to database
    const { data: savedMessage, error: saveError } = await supabase
      .from('messages')
      .insert({
        conversation_id,
        role: 'assistant',
        content: aiResponse,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        message_id: savedMessage.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in soul-chat:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});