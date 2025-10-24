package com.chess.dto;

import java.time.LocalDateTime;

public class MoveDto {
    private Long id;
    private Long gameId;
    private Integer moveNumber;
    private String from;
    private String to;
    private String comments;
    private String before;
    private String after;
    private Integer timeTaken;
    private LocalDateTime createdAt;
    private String san;

    // Constructors
    public MoveDto() {}

    public MoveDto(Long id, Long gameId, Integer moveNumber, String from, String to, 
                   String comments, String before, String after, Integer timeTaken, 
                   LocalDateTime createdAt, String san) {
        this.id = id;
        this.gameId = gameId;
        this.moveNumber = moveNumber;
        this.from = from;
        this.to = to;
        this.comments = comments;
        this.before = before;
        this.after = after;
        this.timeTaken = timeTaken;
        this.createdAt = createdAt;
        this.san = san;
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
}
