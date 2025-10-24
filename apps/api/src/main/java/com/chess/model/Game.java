package com.chess.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "white_player_id", nullable = false)
    private Long whitePlayerId;

    @Column(name = "black_player_id", nullable = false)
    private Long blackPlayerId;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private GameStatus status;

    @Column(name = "result")
    @Enumerated(EnumType.STRING)
    private GameResult result;

    @Column(name = "time_control", nullable = false)
    @Enumerated(EnumType.STRING)
    private TimeControl timeControl;

    @Column(name = "starting_fen", nullable = false)
    private String startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    @Column(name = "current_fen")
    private String currentFen;

    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @Column(name = "opening")
    private String opening;

    @Column(name = "event")
    private String event;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Move> moves;

    // Constructors
    public Game() {
        this.startAt = LocalDateTime.now();
        this.status = GameStatus.IN_PROGRESS;
        this.timeControl = TimeControl.CLASSICAL;
    }

    public Game(Long whitePlayerId, Long blackPlayerId) {
        this();
        this.whitePlayerId = whitePlayerId;
        this.blackPlayerId = blackPlayerId;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getWhitePlayerId() { return whitePlayerId; }
    public void setWhitePlayerId(Long whitePlayerId) { this.whitePlayerId = whitePlayerId; }

    public Long getBlackPlayerId() { return blackPlayerId; }
    public void setBlackPlayerId(Long blackPlayerId) { this.blackPlayerId = blackPlayerId; }

    public GameStatus getStatus() { return status; }
    public void setStatus(GameStatus status) { this.status = status; }

    public GameResult getResult() { return result; }
    public void setResult(GameResult result) { this.result = result; }

    public TimeControl getTimeControl() { return timeControl; }
    public void setTimeControl(TimeControl timeControl) { this.timeControl = timeControl; }

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

    public List<Move> getMoves() { return moves; }
    public void setMoves(List<Move> moves) { this.moves = moves; }

    // Enums
    public enum GameStatus {
        IN_PROGRESS, COMPLETED, ABANDONED, TIME_UP, PLAYER_EXIT
    }

    public enum GameResult {
        WHITE_WINS, BLACK_WINS, DRAW
    }

    public enum TimeControl {
        CLASSICAL, RAPID, BLITZ, BULLET
    }
}
