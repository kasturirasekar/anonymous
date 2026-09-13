import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Verify() {
  const navigate = useNavigate();
  const { user, verifyLogin } = useAuth();

  const handleSimulateVerify = () => {
    verifyLogin();
    navigate('/dashboard');
  };

  // Mask the email for privacy (e.g., student@university.edu -> st****t@university.edu)
  const maskEmail = (email?: string) => {
    if (!email) return 'your email';
    const [local, domain] = email.split('@');
    if (!domain) return email;
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local.substring(0, 2)}****${local.substring(local.length - 1)}@${domain}`;
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 relative">
          <Mail className="text-foreground" size={28} />
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
            <CheckCircle2 className="text-accent" size={20} />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight mb-3">Check your inbox.</h1>
        <p className="text-muted-foreground mb-10 text-lg">
          We sent a verification link to<br />
          <span className="font-medium text-foreground">{maskEmail(user.emailForVerification)}</span>
        </p>

        <div className="w-full p-6 border border-border bg-card rounded-xl flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            For this prototype, no actual email is sent. Click the button below to simulate clicking the magic link in your email.
          </p>
          <Button onClick={handleSimulateVerify} size="lg" className="w-full">
            Simulate verification
          </Button>
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Use a different email
        </button>
      </div>
    </div>
  );
}
