import api from "../../../api/axios";

export interface User {
  id: string;
  email: string;
}
export interface LoginResponse {
  access_token: string;
}

export const AuthService = {
  login: async (creds: { email: string; password: string }) => {
    const res = await api.post<LoginResponse>("/auth/login", creds);
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get<User>("/users/profile");
    return res.data;
  },
};
