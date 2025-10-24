package com.chess.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "moves")
public class Move {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_id", nullable = false)
    private Long gameId;

    @Column(name = "move_number", nullable = false)
    private Integer moveNumber;

    @Column(name = "from_square", nullable = false)
    private String from;

    @Column(name = "to_square", nullable = false)
    private String to;

    @Column(name = "comments")
    private String comments;

    @Column(name = "before_fen", nullable = false)
    private String before;

    @Column(name = "after_fen", nullable = false)
    private String after;

    @Column(name = "time_taken")
    private Integer timeTaken = 0;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "san")
    private String san;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", insertable = false, updatable = false)
    private Game game;

    // Constructors
    public Move() {
        this.createdAt = LocalDateTime.now();
    }

    public Move(Long gameId, Integer moveNumber, String from, String to, String before, String after) {
        this();
        this.gameId = gameId;
        this.moveNumber = moveNumber;
        this.from = from;
        this.to = to;
        this.before = before;
        this.after = after;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getGameId() { return gameId; }
    public void setGameId(Long gameId) { this.gameId = gameId; }

    public Integer getMoveNumber() { return moveNumber; }
    public void setMoveNumber(Integer moveNumber) { this.moveNumber = moveNumber; }

    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getBefore() { return before; }
    public void setBefore(String before) { this.before = before; }

    public String getAfter() { return after; }
    public void setAfter(String after) { this.after = after; }

    public Integer getTimeTaken() { return timeTaken; }
    public void setTimeTaken(Integer timeTaken) { this.timeTaken = timeTaken; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getSan() { return san; }
    public void setSan(String san) { this.san = san; }

    public Game getGame() { return game; }
    public void setGame(Game game) { this.game = game; }
}
