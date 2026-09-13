import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { useAuth, type Intent } from '../contexts/AuthContext';
import { IntentCard } from '../components/IntentCard';
import { TopicSelector } from '../components/TopicSelector';
import { Button } from '../components/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setIntent, setTopic } = useAuth();

  // Redirect to login if not authenticated (Mock protection)
  useEffect(() => {
    if (!user.authenticated) {
      navigate('/login');
    }
  }, [user.authenticated, navigate]);

  if (!user.authenticated) return null;

  const handleIntentSelect = (intent: Intent) => {
    setIntent(intent);
    if (!user.topic) {
      // Scroll down smoothly if selecting intent for the first time
      setTimeout(() => {
        document.getElementById('topic-selection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleTopicSelect = (topic: string) => {
    setTopic(topic);
  };

  const handleFindMatch = () => {
    navigate('/matchmaking');
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">
      
      {/* Intent Selection */}
      <section className="w-full flex flex-col items-center mb-24 mt-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-12 text-center">What are you here to do?</h1>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <IntentCard
            title="I want to learn something"
            description="Get matched with someone who can explain a topic to you."
            icon={BookOpen}
            selected={user.intent === 'learn'}
            onClick={() => handleIntentSelect('learn')}
          />
          <IntentCard
            title="I can help someone learn"
            description="Share your knowledge with someone eager to understand it."
            icon={Lightbulb}
            selected={user.intent === 'teach'}
            onClick={() => handleIntentSelect('teach')}
          />
        </div>
      </section>

      {/* Topic Selection (only visible if intent is selected) */}
      {user.intent && (
        <section id="topic-selection" className="w-full flex flex-col items-center pt-12 border-t border-border animate-in fade-in duration-500">
          <h2 className="text-2xl font-medium tracking-tight mb-8 text-center">What topic?</h2>
          <TopicSelector 
            selectedTopic={user.topic} 
            onSelect={handleTopicSelect} 
          />
        </section>
      )}

      {/* Matchmaking CTA (only visible if both are selected) */}
      {user.intent && user.topic && (
        <section className="w-full flex flex-col items-center pt-16 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-muted/40 border border-border p-6 rounded-2xl w-full max-w-md text-center flex flex-col items-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">You're looking for:</p>
            <p className="text-lg font-medium mb-8">
              Someone who can <span className="text-accent">{user.intent === 'learn' ? 'teach' : 'learn'}</span>
              <br />
              <span className="text-2xl font-bold">{user.topic}</span>
            </p>
            <Button size="lg" className="w-full group" onClick={handleFindMatch}>
              Find someone
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      )}
      
    </div>
  );
}
