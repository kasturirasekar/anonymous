import React, { useState } from 'react';
import { MoreVertical, Ban, LogOut } from 'lucide-react';
import { Button } from './Button';

interface SafetyMenuProps {
  onEndSession: () => void;
  onBlockAndEnd: () => void;
}

export function SafetyMenu({ onEndSession, onBlockAndEnd }: SafetyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
      >
        <MoreVertical size={18} className="text-muted-foreground" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close menu */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            <button 
              onClick={() => {
                setIsOpen(false);
                onEndSession();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors text-left"
            >
              <LogOut size={16} />
              End Session
            </button>
            <button 
              onClick={() => {
                setIsOpen(false);
                setShowBlockModal(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
            >
              <Ban size={16} />
              End & Block
            </button>
          </div>
        </>
      )}

      {showBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-lg border border-border mx-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Ban size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">End and block this person?</h3>
            <p className="text-muted-foreground text-sm mb-6">
              This will end the conversation immediately. You won't be matched with this person again.
            </p>
            
            <div className="flex justify-end gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={() => setShowBlockModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" onClick={onBlockAndEnd}>
                End & Block
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
