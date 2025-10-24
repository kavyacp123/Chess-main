import jwt from 'jsonwebtoken';

export class JwtService {
  private static readonly SECRET = process.env.JWT_SECRET || 'your-secret-key';

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static generateToken(payload: any): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: '24h' });
  }

  static decodeToken(token: string): any {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
}
