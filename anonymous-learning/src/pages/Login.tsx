import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginRequest } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Simulate sending email
    loginRequest(email);
    navigate('/verify');
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6">
          <Lock className="text-foreground" size={24} />
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Enter the learning room.</h1>
        <p className="text-muted-foreground mb-8">
          Only verified educational or approved organization accounts can join.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Educational or organization email"
              className="w-full h-11 px-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            />
            {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
          </div>

          <Button type="submit" size="lg" className="w-full group">
            Send verification link
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-10 p-4 border border-border bg-muted/30 rounded-lg text-sm text-muted-foreground text-left flex gap-3">
          <div className="mt-0.5">
            <ShieldIcon />
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Privacy Notice</p>
            <p>Your email is used only for verification. Your identity in the app is anonymous.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
