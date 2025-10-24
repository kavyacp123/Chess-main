import { AuthResponse, LoginRequest } from '../types/auth.types';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

export class AuthService {
  static async loginWithGoogle(): Promise<void> {
    window.open(`${BACKEND_URL}/auth/google`, '_self');
  }

  static async loginWithGithub(): Promise<void> {
    window.open(`${BACKEND_URL}/auth/github`, '_self');
  }

  static async loginAsGuest(request: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${BACKEND_URL}/auth/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to login as guest');
    }

    return response.json();
  }

  static async logout(): Promise<void> {
    // Implement logout logic
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  static getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
