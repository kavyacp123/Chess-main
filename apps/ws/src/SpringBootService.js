import fetch from 'node-fetch';

const SPRING_BOOT_URL = process.env.BACKEND_API_URL || 'http://localhost:9090/api';

export class SpringBootService {

    async getUser(userId) {
        try {
            const response = await fetch(`${SPRING_BOOT_URL}/users/${userId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    async createGame(whitePlayerId, blackPlayerId) {
        try {
            const response = await fetch(`${SPRING_BOOT_URL}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ whitePlayerId, blackPlayerId })
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating game:', error);
            return null;
        }
    }

    async saveMove(gameId, move) {
        try {
            const response = await fetch(`${SPRING_BOOT_URL}/games/${gameId}/moves`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ move })
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving move:', error);
            return null;
        }
    }

    async updateGameResult(gameId, result) {
        try {
            const response = await fetch(`${SPRING_BOOT_URL}/games/${gameId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ result })
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating game result:', error);
            return null;
        }
    }
}
