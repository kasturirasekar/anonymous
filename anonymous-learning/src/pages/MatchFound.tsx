import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessagesSquare, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function MatchFound() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If the user lands here without a topic, send them back to dashboard
    if (!user.topic || !user.intent) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col items-center justify-center animate-in fade-in duration-700">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">You found someone.</h1>
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-lg mb-8">
          {user.topic}
        </div>
        
        <p className="text-xl text-muted-foreground">
          You want to <span className="text-foreground font-medium">{user.intent === 'learn' ? 'learn' : 'teach'}</span>.<br/>
          They can <span className="text-foreground font-medium">{user.intent === 'learn' ? 'teach' : 'learn'}</span>.
        </p>
      </div>

      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 mb-10 flex flex-col items-center shadow-sm">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <User className="text-muted-foreground" size={32} />
        </div>
        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Matched With</p>
        <p className="text-xl font-medium">Anonymous {user.intent === 'learn' ? 'Teacher' : 'Learner'}</p>
      </div>

      {/* Icebreaker Section */}
      <div className="w-full max-w-2xl bg-muted/40 border border-border rounded-xl p-6 mb-12 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <MessagesSquare size={20} className="text-accent" />
        </div>
        <div>
          <p className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">A place to start</p>
          <p className="text-lg italic text-foreground">
            "What is one {user.topic} concept you understand well, and one you're still figuring out?"
          </p>
        </div>
      </div>

      <Button size="lg" className="w-full max-w-md group text-lg h-14" onClick={() => navigate('/chat')}>
        Enter conversation
        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
