package com.example.chess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String username = email;

        // Create or update user in DB
        Optional<User> userOpt = userService.findByUsername(username);
        User user;
        if (userOpt.isEmpty()) {
            user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(""); // No password for OAuth users
            user.setRoles(Set.of("USER"));
            userService.save(user);
        } else {
            user = userOpt.get();
        }

        // Generate JWT
        String token = jwtUtil.generateToken(username);

        // Return JWT in response (as JSON)
        response.setContentType("application/json");
        response.getWriter().write("{\"token\": \"" + token + "\"}");
        response.getWriter().flush();
    }
}
