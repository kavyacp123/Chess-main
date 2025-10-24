package com.chess.repository;

import com.chess.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    
    List<Game> findByWhitePlayerIdOrBlackPlayerId(Long whitePlayerId, Long blackPlayerId);
    
    List<Game> findByStatus(Game.GameStatus status);
    
    List<Game> findByResult(Game.GameResult result);
    
    @Query("SELECT g FROM Game g WHERE (g.whitePlayerId = :playerId OR g.blackPlayerId = :playerId) AND g.status = :status")
    List<Game> findActiveGamesByPlayerId(@Param("playerId") Long playerId, @Param("status") Game.GameStatus status);
    
    @Query("SELECT g FROM Game g WHERE (g.whitePlayerId = :playerId OR g.blackPlayerId = :playerId) AND g.status = 'COMPLETED' ORDER BY g.endAt DESC")
    List<Game> findCompletedGamesByPlayerId(@Param("playerId") Long playerId);
    
    @Query("SELECT g FROM Game g WHERE g.startAt BETWEEN :startDate AND :endDate")
    List<Game> findGamesByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(g) FROM Game g WHERE (g.whitePlayerId = :playerId OR g.blackPlayerId = :playerId) AND g.status = 'COMPLETED'")
    Long countCompletedGamesByPlayerId(@Param("playerId") Long playerId);
    
    @Query("SELECT COUNT(g) FROM Game g WHERE g.whitePlayerId = :playerId AND g.result = 'WHITE_WINS'")
    Long countWinsAsWhite(@Param("playerId") Long playerId);
    
    @Query("SELECT COUNT(g) FROM Game g WHERE g.blackPlayerId = :playerId AND g.result = 'BLACK_WINS'")
    Long countWinsAsBlack(@Param("playerId") Long playerId);
}
