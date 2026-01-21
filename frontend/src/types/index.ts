export interface User {
  id: string;
  email: string;
  fullName?: string;
  // We can add avatarUrl later
}

export interface AuthResponse {
  access_token: string;
  // If your backend returns the user object on login, add it here.
  // Based on your previous logs, it returns 'access_token'.
  // We might need to decode the token or fetch the profile separately.
}

export interface ApiError {
  message: string;
  statusCode: number;
}
