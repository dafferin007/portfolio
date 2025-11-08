import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function CreateMemory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfPassing, setDateOfPassing] = useState('');
  const [personalityTraits, setPersonalityTraits] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const traits = personalityTraits.split(',').map(t => t.trim()).filter(t => t);

      const { data, error } = await supabase
        .from('memories')
        .insert({
          user_id: user.id,
          name,
          relationship,
          date_of_birth: dateOfBirth || null,
          date_of_passing: dateOfPassing || null,
          personality_traits: traits,
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Memory created", description: `${name}'s memory has been created.` });
      navigate(`/upload/${data.id}`);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Create a New Memory</h1>
        <p className="text-muted-foreground mb-8">
          Share information about your loved one to help us create their digital echo
        </p>

        <Card className="card-soul">
          <CardHeader>
            <CardTitle>Memory Details</CardTitle>
            <CardDescription>
              Tell us about the person you want to remember
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Their name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship *</Label>
                <Input
                  id="relationship"
                  placeholder="e.g., Mother, Father, Friend, Partner"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dop">Date of Passing</Label>
                  <Input
                    id="dop"
                    type="date"
                    value={dateOfPassing}
                    onChange={(e) => setDateOfPassing(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="traits">Personality Traits</Label>
                <Textarea
                  id="traits"
                  placeholder="Kind, funny, wise, caring (separate with commas)"
                  value={personalityTraits}
                  onChange={(e) => setPersonalityTraits(e.target.value)}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Describe their personality to help create a more accurate echo
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Creating...' : 'Create Memory'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}