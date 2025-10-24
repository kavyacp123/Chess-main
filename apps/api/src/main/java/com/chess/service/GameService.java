package com.chess.service;

import com.chess.dto.GameDto;
import com.chess.dto.MoveDto;
import com.chess.model.Game;
import com.chess.model.Move;
import com.chess.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public GameDto createGame(Long whitePlayerId, Long blackPlayerId) {
        Game game = new Game(whitePlayerId, blackPlayerId);
        game = gameRepository.save(game);
        return convertToDto(game);
    }

    public Optional<GameDto> findGameById(Long gameId) {
        return gameRepository.findById(gameId)
                .map(this::convertToDto);
    }

    public List<GameDto> findGamesByPlayerId(Long playerId) {
        return gameRepository.findByWhitePlayerIdOrBlackPlayerId(playerId, playerId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameDto> findActiveGamesByPlayerId(Long playerId) {
        return gameRepository.findActiveGamesByPlayerId(playerId, Game.GameStatus.IN_PROGRESS)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameDto> findCompletedGamesByPlayerId(Long playerId) {
        return gameRepository.findCompletedGamesByPlayerId(playerId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public GameDto updateGameStatus(Long gameId, Game.GameStatus status) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        game.setStatus(status);
        if (status == Game.GameStatus.COMPLETED) {
            game.setEndAt(LocalDateTime.now());
        }
        game = gameRepository.save(game);
        return convertToDto(game);
    }

    public GameDto updateGameResult(Long gameId, Game.GameResult result) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        game.setResult(result);
        game.setStatus(Game.GameStatus.COMPLETED);
        game.setEndAt(LocalDateTime.now());
        game = gameRepository.save(game);
        return convertToDto(game);
    }

    public GameDto updateCurrentFen(Long gameId, String currentFen) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        game.setCurrentFen(currentFen);
        game = gameRepository.save(game);
        return convertToDto(game);
    }

    public void deleteGame(Long gameId) {
        gameRepository.deleteById(gameId);
    }

    public Long getGameCountByPlayerId(Long playerId) {
        return gameRepository.countCompletedGamesByPlayerId(playerId);
    }

    public Long getWinCountAsWhite(Long playerId) {
        return gameRepository.countWinsAsWhite(playerId);
    }

    public Long getWinCountAsBlack(Long playerId) {
        return gameRepository.countWinsAsBlack(playerId);
    }

    private GameDto convertToDto(Game game) {
        List<MoveDto> moveDtos = game.getMoves() != null ? 
                game.getMoves().stream()
                        .map(this::convertMoveToDto)
                        .collect(Collectors.toList()) : 
                List.of();

        return new GameDto(
                game.getId(),
                game.getWhitePlayerId(),
                game.getBlackPlayerId(),
                game.getStatus(),
                game.getResult(),
                game.getTimeControl(),
                game.getStartingFen(),
                game.getCurrentFen(),
                game.getStartAt(),
                game.getEndAt(),
                game.getOpening(),
                game.getEvent(),
                moveDtos
        );
    }

    private MoveDto convertMoveToDto(Move move) {
        return new MoveDto(
                move.getId(),
                move.getGameId(),
                move.getMoveNumber(),
                move.getFrom(),
                move.getTo(),
                move.getComments(),
                move.getBefore(),
                move.getAfter(),
                move.getTimeTaken(),
                move.getCreatedAt(),
                move.getSan()
        );
    }
}
