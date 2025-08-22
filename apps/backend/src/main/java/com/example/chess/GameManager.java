package com.example.chess;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GameManager {

    private final List<Game> games = new ArrayList<>();
    private final List<WebSocketSession> users = new ArrayList<>();
    private WebSocketSession pendingUser = null;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void addUser(WebSocketSession session) {
        users.add(session);
    }

    public void removeUser(WebSocketSession session) {
        users.remove(session);
        // Handle game cleanup if user was in a game
        games.removeIf(game -> game.hasPlayer(session));
    }

    public void handleMessage(WebSocketSession session, String messagePayload) throws Exception {
        JsonNode messageNode = objectMapper.readTree(messagePayload);
        String messageType = messageNode.get("type").asText();

        switch (messageType) {
            case "init_game":
                handleInitGame(session);
                break;
            case "move":
                handleMove(session, messageNode);
                break;
        }
    }

    private void handleInitGame(WebSocketSession session) throws Exception {
        if (pendingUser != null) {
            // Start a new game
            Game game = new Game(pendingUser, session);
            games.add(game);

            // Send game_started message to both players
            sendMessage(pendingUser, createMessage("game_started", "white"));
            sendMessage(session, createMessage("game_started", "black"));

            pendingUser = null;
        } else {
            pendingUser = session;
        }
    }

    private void handleMove(WebSocketSession session, JsonNode messageNode) throws Exception {
        Game game = findGameByPlayer(session);
        if (game != null) {
            JsonNode moveNode = messageNode.get("move");
            String from = moveNode.get("from").asText();
            String to = moveNode.get("to").asText();
//

            game.makeMove(session, from, to);
        }
    }

    private Game findGameByPlayer(WebSocketSession session) {
        return games.stream()
                .filter(game -> game.hasPlayer(session))
                .findFirst()
                .orElse(null);
    }

    private void sendMessage(WebSocketSession session, String message) throws Exception {
        if (session.isOpen()) {
            session.sendMessage(new TextMessage(message));
        }
    }

    private String createMessage(String type, Object payload) throws Exception {
        Map<String, Object> message = new HashMap<>();
        message.put("type", type);
        message.put("payload", payload);
        return objectMapper.writeValueAsString(message);
    }
}
