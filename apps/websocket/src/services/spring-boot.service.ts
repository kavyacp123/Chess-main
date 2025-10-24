import axios from 'axios';

const SPRING_BOOT_URL = process.env.SPRING_BOOT_URL || 'http://localhost:8080';

export class SpringBootService {
  private baseURL = SPRING_BOOT_URL;

  async createGame(whitePlayerId: string, blackPlayerId: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseURL}/api/games`, {
        whitePlayerId: parseInt(whitePlayerId),
        blackPlayerId: parseInt(blackPlayerId)
      });
      return response.data;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }

  async saveMove(gameId: string, move: any): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/api/games/${gameId}/moves`, move);
    } catch (error) {
      console.error('Error saving move:', error);
      throw error;
    }
  }

  async updateGameResult(gameId: string, result: string): Promise<void> {
    try {
      await axios.put(`${this.baseURL}/api/games/${gameId}/result`, {
        result: result
      });
    } catch (error) {
      console.error('Error updating game result:', error);
      throw error;
    }
  }

  async updateGameStatus(gameId: string, status: string): Promise<void> {
    try {
      await axios.put(`${this.baseURL}/api/games/${gameId}/status`, {
        status: status
      });
    } catch (error) {
      console.error('Error updating game status:', error);
      throw error;
    }
  }

  async getGame(gameId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/api/games/${gameId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting game:', error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
}
