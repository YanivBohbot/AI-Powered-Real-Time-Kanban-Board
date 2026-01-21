# 🚀 AI-Powered Real-Time Kanban Board

A modern, full-stack project management tool that combines real-time collaboration with Generative AI capabilities. Built to demonstrate advanced **Full Stack** architecture using **NestJS** and **React**.

Unlike standard Kanban boards, this application uses an AI Agent to analyze complex tasks and automatically break them down into actionable sub-tasks, streamlining the planning process.

## ✨ Key Features

* **⚡ Real-Time Synchronization:** Powered by **WebSockets (Socket.io)**, any move, edit, or creation of a card is instantly reflected on all connected clients without page reloads.
* **🤖 AI Copilot:** Integrated **LangChain** agent that listens to task creation events. If a task is complex, the AI suggests a checklist of sub-tasks automatically.
* **🏗️ Microservices Architecture:** Backend built with **NestJS**, utilizing a modular architecture for scalability.
* **💾 Robust Data Layer:** Uses **PostgreSQL** with **TypeORM/Prisma** for data persistence and **Redis** for caching/session management.
* **🎨 Modern Frontend:** Built with **React** and **TailwindCSS**, featuring a responsive Drag-and-Drop interface.

## 🛠️ Tech Stack

* **Backend:** Node.js, NestJS, Socket.io (Gateway), TypeORM
* **Frontend:** React.js, TypeScript, React Query, TailwindCSS
* **AI Engine:** LangChain (Python/Node.js), OpenAI API / Gemini
* **Database:** PostgreSQL, Redis
* **DevOps:** Docker, Docker Compose

## 🏗️ Architecture Highlight

The system uses a **Gateway Pattern** in NestJS to handle WebSocket connections.
1.  **Client:** Emits `moveCard` event.
2.  **Gateway:** Intercepts event, validates via Service layer.
3.  **Database:** Updates position in Postgres.
4.  **Broadcast:** Gateway emits `cardMoved` to all active clients in the room.

## 📦 Getting Started

### Prerequisites
* Node.js 18+
* Docker (for DB and Redis)

### Installation

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/your-username/ai-kanban-board.git](https://github.com/your-username/ai-kanban-board.git)
    ```

2.  **Start Services (DB & Redis):**
    ```bash
    docker-compose up -d
    ```

3.  **Install & Run Backend:**
    ```bash
    cd backend
    npm install
    npm run start:dev
    ```

4.  **Install & Run Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

