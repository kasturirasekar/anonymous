import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Intent = 'learn' | 'teach';

export interface UserState {
  authenticated: boolean;
  anonymousId: string;
  intent?: Intent;
  topic?: string;
  emailForVerification?: string;
}

interface AuthContextType {
  user: UserState;
  loginRequest: (email: string) => void;
  verifyLogin: () => void;
  logout: () => void;
  setIntent: (intent: Intent) => void;
  setTopic: (topic: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A simple utility to generate a pseudo-random anonymous UUID for the mock
const generateAnonymousId = () => {
  return 'anon-' + Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>({
    authenticated: false,
    anonymousId: '',
  });

  const loginRequest = (email: string) => {
    // In a real app, this would hit an API to send an email.
    // Here we just store the email temporarily to show it on the verify page.
    setUser((prev) => ({ ...prev, emailForVerification: email }));
  };

  const verifyLogin = () => {
    setUser({
      authenticated: true,
      anonymousId: generateAnonymousId(),
      emailForVerification: undefined,
    });
  };

  const logout = () => {
    setUser({
      authenticated: false,
      anonymousId: '',
    });
  };

  const setIntent = (intent: Intent) => {
    setUser((prev) => ({ ...prev, intent }));
  };

  const setTopic = (topic: string) => {
    setUser((prev) => ({ ...prev, topic }));
  };

  return (
    <AuthContext.Provider value={{ user, loginRequest, verifyLogin, logout, setIntent, setTopic }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
