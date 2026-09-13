import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { cn } from './Button';

const PREDEFINED_TOPICS = [
  'React', 'Java', 'Python', 'C++', 'Algorithms', 'Data Structures',
  'Machine Learning', 'AI', 'Cybersecurity', 'Databases', 'Operating Systems',
  'Computer Networks', 'Mathematics', 'Physics', 'Statistics', 'System Design',
  'Git', 'Linux'
];

interface TopicSelectorProps {
  selectedTopic?: string;
  onSelect: (topic: string) => void;
}

export function TopicSelector({ selectedTopic, onSelect }: TopicSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return PREDEFINED_TOPICS;
    const lowerQuery = searchQuery.toLowerCase();
    return PREDEFINED_TOPICS.filter(t => t.toLowerCase().includes(lowerQuery));
  }, [searchQuery]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-muted-foreground" size={18} />
        </div>
        <input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow text-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center max-h-[40vh] overflow-y-auto pb-4 px-2">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => {
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => onSelect(topic)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
                  {
                    'bg-foreground text-background scale-105 shadow-sm': isSelected,
                    'bg-muted text-muted-foreground hover:bg-border hover:text-foreground': !isSelected,
                  }
                )}
              >
                {topic}
              </button>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground py-8">No topics found matching "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
}
