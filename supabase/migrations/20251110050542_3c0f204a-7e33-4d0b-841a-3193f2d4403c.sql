-- Add credits system to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS voice_credits INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS credits_last_reset TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add memory lock feature to messages
ALTER TABLE public.messages 
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT false;

-- Add memory lock to conversations
ALTER TABLE public.conversations
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT false;

-- Create playlists table for AI-generated playlists
CREATE TABLE IF NOT EXISTS public.playlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  memory_id UUID REFERENCES public.memories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  songs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on playlists
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;

-- RLS policies for playlists
CREATE POLICY "Users can view their own playlists"
ON public.playlists FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own playlists"
ON public.playlists FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists"
ON public.playlists FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists"
ON public.playlists FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for playlists updated_at
CREATE TRIGGER update_playlists_updated_at
BEFORE UPDATE ON public.playlists
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to deduct credits
CREATE OR REPLACE FUNCTION public.deduct_voice_credit(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT voice_credits INTO current_credits
  FROM profiles
  WHERE user_id = user_uuid;
  
  -- Check if user has credits
  IF current_credits > 0 THEN
    -- Deduct one credit
    UPDATE profiles
    SET voice_credits = voice_credits - 1
    WHERE user_id = user_uuid;
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$;

-- Function to add credits (for payments)
CREATE OR REPLACE FUNCTION public.add_voice_credits(user_uuid UUID, amount INTEGER)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET voice_credits = voice_credits + amount
  WHERE user_id = user_uuid;
END;
$$;