import React from 'react';
import type { Card as CardType } from '../../../types/board';

interface TaskCardProps {
  card: CardType;
}

export const TaskCard :React.FC<TaskCardProps> = ({card}) =>{
    const isAigenerated = card.title.startsWith('[AI]');



    return (
        <div className={`
        bg-dark-800 p-3 rounded-lg border shadow-sm mb-2 hover:border-brand-500/50 transition-colors group
        ${isAigenerated ? 'border-purple-500/30 bg-purple-500/5' : 'border-dark-700'}
        `}>
            {/*AI generated */}
            { isAigenerated && (
                <div className="flex items-center gap-1 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"/>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">AI Architect</span>
                </div>
            )}
            {/* Title */}
            <h4 className="text-sm font-medium text-gray-200 group-hover:text-white">
                {card.title}
            </h4>
            {/* AI Summary (if it exists) */}
            {card.aiSummary && (
                <div className="mt-2 pt-2 border-t border-dark-700/50">
                <p className="text-xs text-gray-500 italic line-clamp-2">
                    " {card.aiSummary} "
                </p>
                </div>
            )}
        </div>
    )
}