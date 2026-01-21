export interface Card {
  id: string;
  title: string;
  description?: string;
  aiSummary?: string; // <--- The AI magic
  priority: "LOW" | "MEDIUM" | "HIGH";
  order: number;
}

export interface List {
  id: string;
  title: string;
  order: number;
  cards: Card[]; // A list contains an array of cards
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
}
