import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { SendHorizontal, AlertCircle } from 'lucide-react';
import { detectPII } from '../utils/piiDetection';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState('');
  const [piiWarning, setPiiWarning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (detectPII(trimmed)) {
      setPiiWarning(true);
      return;
    }

    setPiiWarning(false);
    onSendMessage(trimmed);
    setText('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {piiWarning && (
        <div className="w-full max-w-3xl mb-3 flex items-start gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100 animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">Contact information can't be shared here.</span><br />
            This space is intentionally anonymous. Please remove any emails, phone numbers, or links.
          </p>
        </div>
      )}
      
      <div className="w-full max-w-3xl relative flex items-end gap-2 bg-background border border-border rounded-2xl p-2 focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent transition-all shadow-sm">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (piiWarning) setPiiWarning(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="w-full max-h-[120px] bg-transparent resize-none outline-none text-sm py-2 px-3 placeholder:text-muted-foreground"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:hover:bg-foreground transition-colors"
          aria-label="Send message"
        >
          <SendHorizontal size={18} className="ml-0.5" />
        </button>
      </div>
    </div>
  );
}
