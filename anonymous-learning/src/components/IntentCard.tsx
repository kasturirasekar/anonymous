import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from './Button';

interface IntentCardProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export function IntentCard({ title, description, icon: Icon, selected, onClick }: IntentCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center text-center p-8 rounded-2xl border-2 transition-all duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 w-full max-w-sm',
        {
          'border-accent bg-accent/5 scale-[1.02] shadow-sm': selected,
          'border-border bg-background hover:border-muted-foreground/30 hover:bg-muted/50': !selected,
        }
      )}
    >
      <div className={cn(
        'w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors',
        {
          'bg-accent text-background': selected,
          'bg-muted text-foreground': !selected,
        }
      )}>
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </button>
  );
}
