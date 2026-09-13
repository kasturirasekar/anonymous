import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ChatMessage, type MessageType } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { SessionTimer } from '../components/SessionTimer';
import { SafetyMenu } from '../components/SafetyMenu';

export default function Chat() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const otherName = `Anonymous ${user.intent === 'learn' ? 'Teacher' : 'Learner'}`;
  
  // Initial messages based on user intent
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 'msg-1',
      sender: 'other',
      text: "Hi! I'm ready to discuss " + (user.topic || "the topic") + ".",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user.authenticated || !user.topic) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      sender: 'you',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Mock response from the other user after a random delay
    setTimeout(() => {
      const mockResponses = [
        "That makes sense. Can you explain a bit more?",
        "I've always found that part tricky too.",
        "Here's how I think about it: it's all about breaking it down into smaller pieces.",
        "Interesting! Have you tried looking at it from another perspective?",
        "Exactly. That's the core concept right there."
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-mock`,
        sender: 'other',
        text: randomResponse,
        timestamp: new Date()
      }]);
    }, 1500 + Math.random() * 2000); // 1.5 - 3.5 seconds delay
  };

  const handleEndSession = () => {
    navigate('/session-ended');
  };

  const handleBlockAndEnd = () => {
    // In a real app, this would hit a backend to block the user ID
    navigate('/session-ended');
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      
      {/* Chat Header */}
      <div className="w-full h-16 border-b border-border flex items-center justify-between px-6 bg-background/95 sticky top-0 z-10 shrink-0">
        <div className="flex flex-col">
          <span className="font-semibold text-lg leading-tight">{user.topic || 'Topic'}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield size={12} className="text-accent" />
            Anonymous session
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <SessionTimer onEndSession={handleEndSession} />
          <SafetyMenu onEndSession={handleEndSession} onBlockAndEnd={handleBlockAndEnd} />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 w-full overflow-y-auto px-4 py-8 bg-grid-slate-50 relative">
        <div className="max-w-3xl mx-auto flex flex-col">
          <div className="w-full flex justify-center mb-10">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              Conversation started
            </span>
          </div>
          
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} otherName={otherName} />
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="w-full shrink-0 p-4 border-t border-border bg-background">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

    </div>
  );
}
