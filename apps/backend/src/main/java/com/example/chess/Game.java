package com.example.chess;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Game {
    private WebSocketSession player1; // White
    private WebSocketSession player2; // Black
    private List<String> moves = new ArrayList<>();
    private String currentPlayer = "white";
    private LocalDateTime startTime;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Game(WebSocketSession player1, WebSocketSession player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = LocalDateTime.now();
    }

    public boolean hasPlayer(WebSocketSession session) {
        return session.equals(player1) || session.equals(player2);
    }

    public void makeMove(WebSocketSession session, String from, String to) throws Exception {
        // Validate if it's the player's turn
        if (!isPlayerTurn(session)) {
            return;
        }

        // Basic move validation (you can integrate a chess library here)
        if (isValidMove(from, to)) {
            String move = from + to;
            moves.add(move);

            // Switch turns
            currentPlayer = currentPlayer.equals("white") ? "black" : "white";

            // Send move to both players
            Map<String, Object> moveMessage = new HashMap<>();
            moveMessage.put("type", "move");
            Map<String, String> moveData = new HashMap<>();
            moveData.put("from", from);
            moveData.put("to", to);
            moveMessage.put("move", moveData);

            String message = objectMapper.writeValueAsString(moveMessage);

            if (player1.isOpen()) {
                player1.sendMessage(new TextMessage(message));
            }
            if (player2.isOpen()) {
                player2.sendMessage(new TextMessage(message));
            }
        }
    }

    private boolean isPlayerTurn(WebSocketSession session) {
        return (currentPlayer.equals("white") && session.equals(player1)) ||
                (currentPlayer.equals("black") && session.equals(player2));
    }

    private boolean isValidMove(String from, String to) {
        // Implement chess move validation logic here
        // You can integrate a chess library like chess.js equivalent for Java
        // For now, return true for basic functionality
        return true;
    }
}
