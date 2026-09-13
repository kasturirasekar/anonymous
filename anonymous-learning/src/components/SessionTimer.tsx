import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { cn, Button } from './Button';

// DEV CONSTANT: Set to true to make 1 second equal 1 minute for faster testing
const DEV_SPEEDUP = false;

interface SessionTimerProps {
  onEndSession: () => void;
}

export function SessionTimer({ onEndSession }: SessionTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [extendRequested, setExtendRequested] = useState(false);
  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onEndSession();
      return;
    }

    const timerId = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - (DEV_SPEEDUP ? 60 : 1)));
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsRemaining, onEndSession]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  
  const isWarning = secondsRemaining <= 120; // 2 minutes or less

  const handleRequestExtend = () => {
    setExtendRequested(true);
    // Simulate other user accepting after 2 seconds
    setTimeout(() => {
      setSecondsRemaining(prev => prev + 10 * 60);
      setIsExtended(true);
      setExtendRequested(false);
      setShowExtendModal(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {!isExtended && secondsRemaining <= 300 && ( // Show extend button when 5 mins or less remaining
          <button 
            onClick={() => setShowExtendModal(true)}
            className="text-xs font-medium text-accent hover:underline"
          >
            Extend
          </button>
        )}
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-sm transition-colors",
          {
            "bg-red-50 text-red-600 border border-red-200": isWarning,
            "bg-muted text-foreground": !isWarning,
          }
        )}>
          <Clock size={14} className={isWarning ? "animate-pulse" : ""} />
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {showExtendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-lg border border-border mx-4">
            <h3 className="text-xl font-semibold mb-2">Want to keep learning?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Both people need to agree to extend the session by 10 minutes.
            </p>
            
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowExtendModal(false)} disabled={extendRequested}>
                Cancel
              </Button>
              <Button onClick={handleRequestExtend} disabled={extendRequested}>
                {extendRequested ? 'Waiting for response...' : 'Request extension'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
