package com.example.chess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return userService.findByUsername(username)
                .map(user -> ResponseEntity.ok(Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "roles", user.getRoles()
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, String> body) {
        String username = userDetails.getUsername();
        return userService.findByUsername(username)
                .map(user -> {
                    if (body.containsKey("email")) user.setEmail(body.get("email"));
                    // Add more fields as needed
                    userService.save(user);
                    return ResponseEntity.ok(Map.of("message", "Profile updated"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
