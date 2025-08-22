package com.example.chess;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class ChessWebSocketHandler extends TextWebSocketHandler {

    private final GameManager gameManager;

    public ChessWebSocketHandler(GameManager gameManager) {
        this.gameManager = gameManager;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        gameManager.addUser(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        gameManager.handleMessage(session, message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        gameManager.removeUser(session);
    }
}
