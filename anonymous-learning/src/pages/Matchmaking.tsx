import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Matchmaking() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If the user lands here without a topic, send them back to dashboard
    if (!user.topic || !user.intent) {
      navigate('/dashboard');
      return;
    }

    // Simulate matchmaking delay (3 seconds)
    const timer = setTimeout(() => {
      navigate('/match-found');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, user.topic, user.intent]);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
      <div className="text-center mb-16 animate-pulse">
        <h1 className="text-3xl font-medium tracking-tight">Looking for your match...</h1>
      </div>

      <div className="w-full flex flex-col items-center mb-24 relative">
        <p className="text-muted-foreground mb-1">You want to {user.intent === 'learn' ? 'learn' : 'teach'}</p>
        <p className="text-2xl font-semibold text-accent mb-8">{user.topic}</p>

        {/* Abstract Animation Nodes */}
        <div className="relative w-full h-32 flex items-center justify-center overflow-hidden my-4">
          {/* Node 1 (You) */}
          <div className="absolute w-12 h-12 bg-foreground rounded-full z-10 left-1/4 animate-in fade-in zoom-in duration-1000" />
          
          {/* Searching Node (Them) */}
          <div className="absolute w-12 h-12 border-2 border-dashed border-muted-foreground rounded-full z-10 right-1/4 animate-[spin_4s_linear_infinite]" />
          
          {/* Connecting line scanning */}
          <div className="absolute h-px bg-gradient-to-r from-border via-accent to-border w-1/2 left-1/4 overflow-hidden">
            <div className="w-full h-full bg-accent/20 absolute -left-full animate-[slide_1.5s_ease-in-out_infinite]" />
          </div>
        </div>

        <p className="text-muted-foreground mt-8 text-sm">
          Searching for someone who can {user.intent === 'learn' ? 'teach' : 'learn'} {user.topic}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full mb-12">
        <Shield size={16} className="text-accent" />
        <span>Your identity stays anonymous.</span>
      </div>

      <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
        Cancel Search
      </Button>
    </div>
  );
}
