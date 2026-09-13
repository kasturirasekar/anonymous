import React from 'react';
import { cn } from './Button';

export interface MessageType {
  id: string;
  sender: 'you' | 'other';
  text: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: MessageType;
  otherName: string;
}

export function ChatMessage({ message, otherName }: ChatMessageProps) {
  const isYou = message.sender === 'you';

  return (
    <div className={cn('flex flex-col w-full mb-6', { 'items-end': isYou, 'items-start': !isYou })}>
      <span className="text-xs font-medium text-muted-foreground mb-1.5 px-1">
        {isYou ? 'You' : otherName}
      </span>
      <div 
        className={cn(
          'max-w-[85%] md:max-w-[75%] px-4 py-3 text-sm leading-relaxed',
          {
            'bg-foreground text-background rounded-2xl rounded-tr-sm': isYou,
            'bg-muted text-foreground rounded-2xl rounded-tl-sm': !isYou,
          }
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
