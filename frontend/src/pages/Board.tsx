import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoardColumn } from '../features/board/components/BoardColumn';
import { boardService } from '../features/board/api/board.service';
import type { Board as BoardType } from '../types/board';
import { useSocket } from '../hooks/useSocket'; // Ensure this path is correct
import { ChatSidebar } from '../features/board/components/SideBar';

export default function Board() {
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  // Helper to refresh board data
  const fetchBoard = async () => {
    if (!boardId) return;
    try {
      const data = await boardService.getBoard(boardId);
      setBoard(data);
    } catch (error) {
      console.error('Failed to load board', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Initial Load
  useEffect(() => {
    fetchBoard();
  }, [boardId]);

 
// 2. Real-Time Updates Listener
  // 2. Real-Time Updates Listener
  useEffect(() => {
    if (!socket || !board) return;

    socket.on('card-created', (newCard: any) => {
      console.log('⚡ EVENT RECEIVED:', newCard);

      // 1. Normalize IDs to Strings (Fixes Number vs String mismatch)
      const eventBoardId = String(newCard.boardId);
      const currentBoardId = String(board.id);

      if (eventBoardId !== currentBoardId) {
        console.log(`⛔ Board ID mismatch: ${eventBoardId} vs ${currentBoardId}`);
        return;
      }

      setBoard((prev) => {
        if (!prev) return null;

        const updatedLists = prev.lists.map((list) => {
          // 2. Find the List ID (Handle both formats)
          // Backend might send newCard.list.id OR newCard.listId
          const rawListId = newCard.list?.id || newCard.listId;
          const targetListId = String(rawListId);
          const currentListId = String(list.id);

          if (currentListId === targetListId) {
            console.log(`✅ MATCH! Adding card "${newCard.title}" to list "${list.title}"`);
            
            // Prevent duplicates
            if (list.cards.find(c => String(c.id) === String(newCard.id))) {
              return list;
            }

            return {
              ...list,
              cards: [...list.cards, newCard],
            };
          }
          return list;
        });

        return { ...prev, lists: updatedLists };
      });
    });

    return () => {
      socket.off('card-created');
    };
  }, [socket, board]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-900 text-white">
        Loading Board...
      </div>
    );
  }

  if (!board) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-900 text-white">
        Board not found
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-dark-900 overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-dark-800 flex items-center px-6 bg-dark-900/50 backdrop-blur shrink-0">
        <h1 className="text-xl font-bold text-white tracking-tight">{board.title}</h1>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-dark-900/50">
        <div className="h-full flex px-6 py-6 gap-6">
          {board.lists.map((list) => (
            <BoardColumn 
              key={list.id} 
              list={list} 
              onCardCreated={fetchBoard} // Fallback refresh
            />
          ))}
        </div>
      </div>


      {/* 👇 IT MUST BE HERE (Outside the scrollable canvas) */}
      {board && <ChatSidebar boardId={board.id} />}
    </div>
  );
}