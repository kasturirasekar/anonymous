import { useNavigate } from 'react-router-dom';
import { Shield, UserX, Clock, EyeOff, ArrowDown, MessagesSquare } from 'lucide-react';
import { Button } from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground max-w-3xl leading-tight">
          Learn something.<br />
          Teach something.<br />
          <span className="text-muted-foreground">Meet someone anonymous.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Anonymous Learning pairs you with strangers based on what they want to learn and what you know.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={() => navigate('/login')}>
            Start Learning
          </Button>
          <Button size="lg" variant="outline" onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            How it works
          </Button>
        </div>

        {/* Abstract Visual Concept */}
        <div className="mt-20 flex flex-col items-center select-none opacity-80">
          <div className="px-6 py-3 rounded-full bg-muted border border-border text-sm font-medium">
            Anonymous Learner
          </div>
          <div className="h-12 w-px bg-border flex items-center justify-center my-2 relative">
             <div className="absolute bg-background px-2 text-xs font-medium text-accent">React</div>
          </div>
          <ArrowDown className="text-border mb-2" size={16} />
          <div className="px-6 py-3 rounded-full bg-foreground text-background border border-foreground text-sm font-medium">
            Anonymous Teacher
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="w-full bg-muted/30 py-24 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight mb-16 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col">
              <span className="text-accent text-sm font-bold mb-4">01</span>
              <h3 className="text-xl font-medium mb-3">Choose your topic</h3>
              <p className="text-muted-foreground leading-relaxed">
                Select exactly what you want to learn or teach. No complex profiles to fill out.
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-accent text-sm font-bold mb-4">02</span>
              <h3 className="text-xl font-medium mb-3">Get matched instantly</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our system pairs you with someone who knows what you want to learn, or wants to learn what you know.
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-accent text-sm font-bold mb-4">03</span>
              <h3 className="text-xl font-medium mb-3">Focus on the knowledge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Have a focused, 15-minute text conversation. When time is up, the session disappears forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Match Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center">
        <div className="w-full max-w-2xl border border-border rounded-xl bg-background shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-border bg-muted/30 p-4 text-center">
            <p className="text-sm font-medium">You want to learn <span className="text-accent">React</span></p>
            <p className="text-xs text-muted-foreground mt-1">Matched with someone who can teach React</p>
          </div>
          <div className="p-6 flex flex-col gap-4 bg-grid-slate-50">
            <div className="self-end max-w-[80%] bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
              I'm trying to understand how reconciliation actually works when state changes.
            </div>
            <div className="self-start max-w-[80%] bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessagesSquare size={12} className="text-muted-foreground" />
              </div>
              <div>
                Think of it as React comparing two snapshots. Let's break down the virtual DOM tree...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight">Learn without putting yourself out there.</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A quiet, safe space where the focus is entirely on exchanging knowledge, not building a personal brand.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-6 border border-border rounded-lg bg-background flex items-start gap-4">
            <Shield className="text-accent" />
            <div>
              <h3 className="font-medium mb-1">Anonymous identity</h3>
              <p className="text-sm text-muted-foreground">You are known only as "Learner" or "Teacher" in every session.</p>
            </div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background flex items-start gap-4">
            <UserX className="text-accent" />
            <div>
              <h3 className="font-medium mb-1">No profiles</h3>
              <p className="text-sm text-muted-foreground">No photos, no bios, no history. Every conversation is a fresh start.</p>
            </div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background flex items-start gap-4">
            <Clock className="text-accent" />
            <div>
              <h3 className="font-medium mb-1">Ephemeral conversations</h3>
              <p className="text-sm text-muted-foreground">Sessions last 15 minutes by default and disappear when finished.</p>
            </div>
          </div>
          <div className="p-6 border border-border rounded-lg bg-background flex items-start gap-4">
            <EyeOff className="text-accent" />
            <div>
              <h3 className="font-medium mb-1">No contact sharing</h3>
              <p className="text-sm text-muted-foreground">Our client-side filters prevent sharing personal identifiable information.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="w-full border-t border-border bg-muted/30 py-24 text-center px-6">
        <h2 className="text-2xl font-medium tracking-tight mb-6">Ready to exchange knowledge?</h2>
        <Button size="lg" onClick={() => navigate('/login')}>
          Enter the learning room
        </Button>
      </section>
    </div>
  );
}
