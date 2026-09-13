import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '../components/Button';

export default function SessionEnded() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically transition to rate screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/rate');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <Clock size={32} className="text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">This session has ended.</h1>
      
      <Button variant="outline" onClick={() => navigate('/dashboard')}>
        Return to dashboard
      </Button>
    </div>
  );
}
