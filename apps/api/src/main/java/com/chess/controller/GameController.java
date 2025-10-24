package com.chess.controller;

import com.chess.dto.GameDto;
import com.chess.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping
    public ResponseEntity<GameDto> createGame(@RequestBody CreateGameRequest request) {
        try {
            GameDto game = gameService.createGame(request.getWhitePlayerId(), request.getBlackPlayerId());
            return ResponseEntity.status(HttpStatus.CREATED).body(game);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGameById(@PathVariable Long id) {
        Optional<GameDto> game = gameService.findGameById(id);
        return game.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/player/{playerId}")
    public ResponseEntity<List<GameDto>> getGamesByPlayerId(@PathVariable Long playerId) {
        List<GameDto> games = gameService.findGamesByPlayerId(playerId);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/player/{playerId}/active")
    public ResponseEntity<List<GameDto>> getActiveGamesByPlayerId(@PathVariable Long playerId) {
        List<GameDto> games = gameService.findActiveGamesByPlayerId(playerId);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/player/{playerId}/completed")
    public ResponseEntity<List<GameDto>> getCompletedGamesByPlayerId(@PathVariable Long playerId) {
        List<GameDto> games = gameService.findCompletedGamesByPlayerId(playerId);
        return ResponseEntity.ok(games);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<GameDto> updateGameStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        try {
            GameDto game = gameService.updateGameStatus(id, request.getStatus());
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/result")
    public ResponseEntity<GameDto> updateGameResult(@PathVariable Long id, @RequestBody UpdateResultRequest request) {
        try {
            GameDto game = gameService.updateGameResult(id, request.getResult());
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/fen")
    public ResponseEntity<GameDto> updateCurrentFen(@PathVariable Long id, @RequestBody UpdateFenRequest request) {
        try {
            GameDto game = gameService.updateCurrentFen(id, request.getCurrentFen());
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/player/{playerId}/stats")
    public ResponseEntity<PlayerStats> getPlayerStats(@PathVariable Long playerId) {
        try {
            Long totalGames = gameService.getGameCountByPlayerId(playerId);
            Long winsAsWhite = gameService.getWinCountAsWhite(playerId);
            Long winsAsBlack = gameService.getWinCountAsBlack(playerId);
            
            PlayerStats stats = new PlayerStats();
            stats.setTotalGames(totalGames);
            stats.setWinsAsWhite(winsAsWhite);
            stats.setWinsAsBlack(winsAsBlack);
            stats.setTotalWins(winsAsWhite + winsAsBlack);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        try {
            gameService.deleteGame(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Request DTOs
    public static class CreateGameRequest {
        private Long whitePlayerId;
        private Long blackPlayerId;

        public Long getWhitePlayerId() { return whitePlayerId; }
        public void setWhitePlayerId(Long whitePlayerId) { this.whitePlayerId = whitePlayerId; }
        public Long getBlackPlayerId() { return blackPlayerId; }
        public void setBlackPlayerId(Long blackPlayerId) { this.blackPlayerId = blackPlayerId; }
    }

    public static class UpdateStatusRequest {
        private com.chess.model.Game.GameStatus status;

        public com.chess.model.Game.GameStatus getStatus() { return status; }
        public void setStatus(com.chess.model.Game.GameStatus status) { this.status = status; }
    }

    public static class UpdateResultRequest {
        private com.chess.model.Game.GameResult result;

        public com.chess.model.Game.GameResult getResult() { return result; }
        public void setResult(com.chess.model.Game.GameResult result) { this.result = result; }
    }

    public static class UpdateFenRequest {
        private String currentFen;

        public String getCurrentFen() { return currentFen; }
        public void setCurrentFen(String currentFen) { this.currentFen = currentFen; }
    }

    public static class PlayerStats {
        private Long totalGames;
        private Long winsAsWhite;
        private Long winsAsBlack;
        private Long totalWins;

        public Long getTotalGames() { return totalGames; }
        public void setTotalGames(Long totalGames) { this.totalGames = totalGames; }
        public Long getWinsAsWhite() { return winsAsWhite; }
        public void setWinsAsWhite(Long winsAsWhite) { this.winsAsWhite = winsAsWhite; }
        public Long getWinsAsBlack() { return winsAsBlack; }
        public void setWinsAsBlack(Long winsAsBlack) { this.winsAsBlack = winsAsBlack; }
        public Long getTotalWins() { return totalWins; }
        public void setTotalWins(Long totalWins) { this.totalWins = totalWins; }
    }
}
