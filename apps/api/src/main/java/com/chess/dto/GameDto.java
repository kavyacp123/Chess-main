package com.chess.dto;

import com.chess.model.Game;
import java.time.LocalDateTime;
import java.util.List;

public class GameDto {
    private Long id;
    private Long whitePlayerId;
    private Long blackPlayerId;
    private Game.GameStatus status;
    private Game.GameResult result;
    private Game.TimeControl timeControl;
    private String startingFen;
    private String currentFen;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String opening;
    private String event;
    private List<MoveDto> moves;

    // Constructors
    public GameDto() {}

    public GameDto(Long id, Long whitePlayerId, Long blackPlayerId, Game.GameStatus status, 
                   Game.GameResult result, Game.TimeControl timeControl, String startingFen, 
                   String currentFen, LocalDateTime startAt, LocalDateTime endAt, 
                   String opening, String event, List<MoveDto> moves) {
        this.id = id;
        this.whitePlayerId = whitePlayerId;
        this.blackPlayerId = blackPlayerId;
        this.status = status;
        this.result = result;
        this.timeControl = timeControl;
        this.startingFen = startingFen;
        this.currentFen = currentFen;
        this.startAt = startAt;
        this.endAt = endAt;
        this.opening = opening;
        this.event = event;
        this.moves = moves;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getWhitePlayerId() { return whitePlayerId; }
    public void setWhitePlayerId(Long whitePlayerId) { this.whitePlayerId = whitePlayerId; }

    public Long getBlackPlayerId() { return blackPlayerId; }
    public void setBlackPlayerId(Long blackPlayerId) { this.blackPlayerId = blackPlayerId; }

    public Game.GameStatus getStatus() { return status; }
    public void setStatus(Game.GameStatus status) { this.status = status; }

    public Game.GameResult getResult() { return result; }
    public void setResult(Game.GameResult result) { this.result = result; }

    public Game.TimeControl getTimeControl() { return timeControl; }
    public void setTimeControl(Game.TimeControl timeControl) { this.timeControl = timeControl; }

    public String getStartingFen() { return startingFen; }
    public void setStartingFen(String startingFen) { this.startingFen = startingFen; }

    public String getCurrentFen() { return currentFen; }
    public void setCurrentFen(String currentFen) { this.currentFen = currentFen; }

    public LocalDateTime getStartAt() { return startAt; }
    public void setStartAt(LocalDateTime startAt) { this.startAt = startAt; }

    public LocalDateTime getEndAt() { return endAt; }
    public void setEndAt(LocalDateTime endAt) { this.endAt = endAt; }

    public String getOpening() { return opening; }
    public void setOpening(String opening) { this.opening = opening; }

    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }

    public List<MoveDto> getMoves() { return moves; }
    public void setMoves(List<MoveDto> moves) { this.moves = moves; }
}
