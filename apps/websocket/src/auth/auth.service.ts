import { JwtService } from './jwt.service';

export interface AuthUser {
  userId: string;
  username: string;
  email?: string;
  isGuest: boolean;
}

export class AuthService {
  static extractAuthUser(token: string): AuthUser | null {
    try {
      const decoded = JwtService.verifyToken(token);
      return {
        userId: decoded.userId,
        username: decoded.username,
        email: decoded.email,
        isGuest: decoded.isGuest || false,
      };
    } catch (error) {
      console.error('Authentication failed:', error);
      return null;
    }
  }

  static validateToken(token: string): boolean {
    try {
      JwtService.verifyToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
