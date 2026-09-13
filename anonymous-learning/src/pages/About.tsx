import React from 'react';
import { EyeOff, UserX, Clock, MessageSquareOff } from 'lucide-react';

export default function About() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
      
      <div className="mb-16">
        <h1 className="text-4xl font-semibold tracking-tight mb-6">About Anonymous Learning</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We believe learning happens best when ego is removed.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-medium mb-4">The Philosophy</h2>
          <p className="text-foreground leading-relaxed">
            In traditional professional networks and social media, knowledge exchange often becomes entangled with personal branding, networking, and status. People hesitate to ask "stupid" questions because they fear looking foolish. People hesitate to teach because they fear not sounding authoritative enough.
          </p>
          <br />
          <p className="text-foreground leading-relaxed">
            Anonymous Learning strips all of that away. You are just a Learner, and they are just a Teacher. When the session ends, the connection is gone forever. All that remains is the knowledge you exchanged.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-6">Core Privacy Principles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-xl bg-card">
              <UserX className="text-accent mb-4" size={24} />
              <h3 className="font-semibold mb-2">No Profiles</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't collect names, avatars, biographies, or job titles. Your account is only used to verify that you belong to an educational or professional organization.
              </p>
            </div>
            
            <div className="p-6 border border-border rounded-xl bg-card">
              <EyeOff className="text-accent mb-4" size={24} />
              <h3 className="font-semibold mb-2">Anonymous Identity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                During a session, you are only identified as "Anonymous Learner" or "Anonymous Teacher". No historical data is shared between users.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-card">
              <Clock className="text-accent mb-4" size={24} />
              <h3 className="font-semibold mb-2">Ephemeral Sessions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sessions are strictly timeboxed. When the timer runs out, the chat is permanently closed. This encourages focus and prevents lingering obligations.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl bg-card">
              <MessageSquareOff className="text-accent mb-4" size={24} />
              <h3 className="font-semibold mb-2">No Contact Sharing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our client-side PII detection actively prevents the sharing of emails, phone numbers, and social media links to enforce the anonymous nature of the platform.
              </p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
