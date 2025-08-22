import jwt from 'jsonwebtoken';
import { SpringBootService } from './springBootService.js';

const springBootService = new SpringBootService();

export function extractAuthUser(token, ws) {
    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return {
            socket: ws,
            userId: decoded.userId,
            username: decoded.username
        };
    } catch (error) {
        console.log('Authentication failed:', error.message);
        ws.close();
        return null;
    }
}
