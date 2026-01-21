import React, { useState } from 'react';
import type { List } from '../../../types/board';
import { TaskCard } from './TaskCard';
import { boardService } from '../api/board.service';
import { Button } from '../../../components/ui/Button';

interface BoardColumnProps {
  list: List;
  onCardCreated: () => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ list, onCardCreated }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;
    await boardService.createCard(list.id, newCardTitle);
    setNewCardTitle('');
    setIsAdding(false);
    onCardCreated();
  };

  return (
    // 🛠️ FIX 1: Added 'h-full' and 'max-h-full' to outer wrapper
    <div className="w-80 flex-shrink-0 flex flex-col h-full max-h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between p-2 mb-2 flex-shrink-0">
        <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">
          {list.title} <span className="text-dark-600 ml-1">{list.cards.length}</span>
        </h3>
      </div>

      {/* Cards Container */}
      {/* 🛠️ FIX 2: 'flex-1' fills space, 'overflow-y-auto' enables scroll INSIDE column */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-dark-900/30 rounded-xl p-2 border border-dark-800/50">
        <div className="space-y-2"> {/* Added spacing wrapper */}
          {list.cards.map(card => (
            <TaskCard key={card.id} card={card} />
          ))}
        </div>

        {/* Add Card Input */}
        {isAdding ? (
          <form onSubmit={handleAddCard} className="mt-2 animate-fade-in">
            <textarea
              autoFocus
              className="w-full bg-dark-800 text-sm text-white p-3 rounded-lg border border-brand-500 focus:outline-none resize-none"
              placeholder="What needs to be done?"
              rows={3}
              value={newCardTitle}
              onChange={e => setNewCardTitle(e.target.value)}
              onKeyDown={e => {
                if(e.key === 'Enter' && !e.shiftKey) handleAddCard(e);
              }}
            />
            <div className="flex gap-2 mt-2">
              <Button type="submit" size="sm" className="py-1 text-xs">Add</Button>
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-xs text-gray-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-sm text-gray-500 hover:bg-dark-800 hover:text-gray-300 rounded-lg transition-colors border border-dashed border-transparent hover:border-dark-700 flex-shrink-0"
          >
            <span>+</span> Add Task
          </button>
        )}
      </div>
    </div>
  );
};