import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageCircleHeart, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button, cn } from '../components/Button';

export default function Rate() {
  const navigate = useNavigate();
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [respectful, setRespectful] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // In a real app, this would submit the rating to the backend
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const isFormComplete = helpful !== null && respectful !== null;

  if (submitted) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-accent" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Thank you for sharing feedback.</h1>
        <p className="text-muted-foreground text-lg">Returning to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 flex flex-col items-center justify-center animate-in fade-in duration-500">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">How was your session?</h1>
      <p className="text-muted-foreground mb-12">Your feedback helps us keep the community safe and helpful.</p>
      
      <div className="w-full bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-10 shadow-sm">
        
        {/* Helpful Question */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium mb-6">Was the session helpful?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setHelpful(true)}
              className={cn(
                "flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 transition-all",
                helpful === true
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
              )}
            >
              <ThumbsUp size={32} className={helpful === true ? "text-accent mb-3" : "text-muted-foreground mb-3"} />
              <span className={helpful === true ? "font-medium" : "text-muted-foreground"}>Helpful</span>
            </button>
            <button
              onClick={() => setHelpful(false)}
              className={cn(
                "flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 transition-all",
                helpful === false
                  ? "border-red-500 bg-red-50"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
              )}
            >
              <ThumbsDown size={32} className={helpful === false ? "text-red-500 mb-3" : "text-muted-foreground mb-3"} />
              <span className={helpful === false ? "font-medium" : "text-muted-foreground"}>Not Helpful</span>
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-border" />

        {/* Respectful Question */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium mb-6">Was the other person polite and respectful?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setRespectful(true)}
              className={cn(
                "flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 transition-all",
                respectful === true
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
              )}
            >
              <MessageCircleHeart size={32} className={respectful === true ? "text-accent mb-3" : "text-muted-foreground mb-3"} />
              <span className={respectful === true ? "font-medium" : "text-muted-foreground"}>Yes</span>
            </button>
            <button
              onClick={() => setRespectful(false)}
              className={cn(
                "flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 transition-all",
                respectful === false
                  ? "border-red-500 bg-red-50"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
              )}
            >
              <AlertTriangle size={32} className={respectful === false ? "text-red-500 mb-3" : "text-muted-foreground mb-3"} />
              <span className={respectful === false ? "font-medium" : "text-muted-foreground"}>No</span>
            </button>
          </div>
        </div>
        
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-sm">
        <Button 
          size="lg" 
          className="w-full" 
          disabled={!isFormComplete} 
          onClick={handleSubmit}
        >
          Submit feedback
        </Button>
        <button 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate('/dashboard')}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
