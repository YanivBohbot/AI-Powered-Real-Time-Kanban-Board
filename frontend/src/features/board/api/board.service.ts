import api from "../../../api/axios";
import type { List, Card } from "../../../types/board";
import type { Board } from "../../../types/board";

export const boardService = {
  getBoard: async (boardId: string): Promise<Board> => {
    const response = await api.get(`/boards/single/${boardId}`);
    return response.data;
  },
  getLists: async (boardId: string): Promise<List[]> => {
    // 1. Get the lists
    const listRes = await api.get<List[]>(`/lists/${boardId}`);
    const lists = listRes.data;

    // 2. Hydrate them with cards (Fetching cards for each list)
    // In a real app, this should be one efficient backend query.
    const fullLists = await Promise.all(
      lists.map(async (list) => {
        const cardsRes = await api.get<Card[]>(`/cards/${list.id}`);
        // Sort cards by 'order' so they appear correctly
        const sortedCards = cardsRes.data.sort((a, b) => a.order - b.order);
        return { ...list, cards: sortedCards };
      }),
    );

    return fullLists.sort((a, b) => a.order - b.order);
  },

  createList: async (boardId: string, title: string, order: number) => {
    return api.post("/lists", { boardId, title, order });
  },

  createCard: async (listId: string, title: string) => {
    // We use the title as the description initially to trigger the AI
    return api.post("/cards", {
      title,
      description: title,
      listId,
      priority: "MEDIUM",
      order: 0,
    });
  },
};
