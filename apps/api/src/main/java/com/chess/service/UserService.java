package com.chess.service;

import com.chess.dto.UserDto;
import com.chess.model.User;
import com.chess.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDto createUser(String username, String email, String password) {
        User user = new User(username, email, password);
        user = userRepository.save(user);
        return convertToDto(user);
    }

    public UserDto createGuestUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(username + "@guest.local");
        user.setPassword(""); // No password for guest users
        user.setIsGuest(true);
        user.setRating(1200);
        user = userRepository.save(user);
        return convertToDto(user);
    }

    public Optional<UserDto> findUserById(Long id) {
        return userRepository.findById(id)
                .map(this::convertToDto);
    }

    public Optional<UserDto> findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::convertToDto);
    }

    public Optional<UserDto> findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::convertToDto);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserDto updateUserRating(Long userId, Integer newRating) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRating(newRating);
        user = userRepository.save(user);
        return convertToDto(user);
    }

    public void updateLastLogin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getGuestUsers() {
        return userRepository.findGuestUsers()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    private UserDto convertToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRating(),
                user.getIsGuest(),
                user.getCreatedAt(),
                user.getLastLogin()
        );
    }
}
