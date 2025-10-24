export interface User {
  id: string;
  username?: string;
  name?: string;
  email: string;
  provider: AuthProvider;
  rating: number;
  isGuest: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum AuthProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
  GUEST = 'GUEST'
}

export interface LoginRequest {
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
