package com.chess.dto;

import java.time.LocalDateTime;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private Integer rating;
    private Boolean isGuest;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

    // Constructors
    public UserDto() {}

    public UserDto(Long id, String username, String email, Integer rating, Boolean isGuest, 
                   LocalDateTime createdAt, LocalDateTime lastLogin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.rating = rating;
        this.isGuest = isGuest;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public Boolean getIsGuest() { return isGuest; }
    public void setIsGuest(Boolean isGuest) { this.isGuest = isGuest; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
}
