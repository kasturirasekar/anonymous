import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Users } from 'lucide-react';
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
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate, user.topic, user.intent]);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
      <div className="text-center mb-10 animate-pulse">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Looking for your match...</h1>
        <p className="text-muted-foreground">
          Searching for someone who can {user.intent === 'learn' ? 'teach' : 'learn'} <span className="font-semibold text-foreground">{user.topic}</span>
        </p>
      </div>

      {/* Radar Scanner Animation */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center my-12">
        
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-accent/10 bg-accent/5" />
        <div className="absolute inset-4 rounded-full border border-accent/10" />
        <div className="absolute inset-12 rounded-full border border-accent/10" />

        {/* Small background users (the people being scanned) */}
        <div className="absolute top-[12%] left-[22%] w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0ms' }}>
          <Users size={18} className="text-accent" />
        </div>
        <div className="absolute top-[25%] right-[12%] w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '500ms' }}>
          <Users size={18} className="text-accent" />
        </div>
        <div className="absolute bottom-[22%] left-[12%] w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1000ms' }}>
          <Users size={18} className="text-accent" />
        </div>
        <div className="absolute bottom-[18%] right-[22%] w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '1500ms' }}>
          <Users size={18} className="text-accent" />
        </div>

        {/* The Scanning Line (Rotates) */}
        <div className="absolute inset-0 rounded-full animate-[spin_2s_linear_infinite]">
          {/* A gradient wedge for the radar sweep effect */}
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-[conic-gradient(from_270deg,transparent_0deg,rgba(var(--accent),0.1)_90deg)] origin-top-left" />
          {/* The crisp leading line */}
          <div className="absolute right-0 top-1/2 w-1/2 h-[1.5px] bg-gradient-to-r from-accent/0 to-accent/60 -translate-y-1/2 shadow-[0_0_8px_rgba(var(--accent),0.8)]" />
        </div>

        {/* Center Node (You) */}
        <div className="relative z-10 w-20 h-20 bg-accent text-background rounded-full flex items-center justify-center shadow-xl border-4 border-background ring-4 ring-accent/20">
          <User size={36} />
        </div>
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
