import api from "../../api/axios";

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}

export const workspacesService = {
  // gett all workspace for the user

  getAll: async () => {
    const res = await api.get<Workspace[]>("/workspaces");
    return res.data;
  },

  create: async (name: string) => {
    // 1. Create Workspace
    const wsRes = await api.post<Workspace>("/workspaces", { name });
    const workspaceId = wsRes.data.id;

    // 2. Auto-create a "Main Board"
    const boardRes = await api.post("/boards", {
      title: "Main Board",
      workspaceId,
    });

    // 3. Auto-create "Todo", "In Progress", "Done" Lists
    const boardId = boardRes.data.id;
    await api.post("/lists", { title: "To Do", order: 1, boardId });
    await api.post("/lists", { title: "In Progress", order: 2, boardId });
    await api.post("/lists", { title: "Done", order: 3, boardId });

    // Return the BOARD ID instead of workspace, just for this MVP
    return { ...wsRes.data, id: boardId };
  },
};
