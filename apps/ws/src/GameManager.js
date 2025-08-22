import { SpringBootService } from './springBootService.js';

export class GameManager {
  constructor() {
    this.games = [];
    this.users = [];
    this.springBootService = new SpringBootService();
  }

  addUser(user) {
    this.users.push(user);
    this.addHandler(user);
  }

  removeUser(socket) {
    this.users = this.users.filter(user => user.socket !== socket);
  }

  addHandler(user) {
    user.socket.on("message", async (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === 'init_game') {
        if (this.pendingUser) {
          // Create game in Spring Boot backend
          const game = await this.springBootService.createGame(
              this.pendingUser.userId,
              user.userId
          );

          if (game) {
            // Start game logic
            this.startGame(this.pendingUser, user, game.id);
          }
          this.pendingUser = null;
        } else {
          this.pendingUser = user;
        }
      }

      if (message.type === 'move') {
        const game = this.games.find(game =>
            game.player1 === user || game.player2 === user
        );

        if (game) {
          // Save move to Spring Boot backend
          await this.springBootService.saveMove(game.gameId, message.move);

          // Broadcast move to opponent
          const opponent = game.player1 === user ? game.player2 : game.player1;
          opponent.socket.send(JSON.stringify({
            type: 'move',
            move: message.move
          }));
        }
      }
    });
  }

  startGame(player1, player2, gameId) {
    const game = {
      id: gameId,
      gameId: gameId,
      player1: player1,
      player2: player2
    };

    this.games.push(game);

    // Notify players
    player1.socket.send(JSON.stringify({
      type: 'init_game',
      color: 'white',
      gameId: gameId
    }));

    player2.socket.send(JSON.stringify({
      type: 'init_game',
      color: 'black',
      gameId: gameId
    }));
  }
}
