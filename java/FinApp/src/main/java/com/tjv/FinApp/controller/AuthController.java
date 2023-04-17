package com.tjv.FinApp.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.AuthResponseDTO;
import com.tjv.FinApp.model.LoginDTO;
import com.tjv.FinApp.model.RegisterDTO;
import com.tjv.FinApp.model.User;
import com.tjv.FinApp.exceptions.UserAlreadyExistsException;
import com.tjv.FinApp.security.TokenGenerator;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserDao userDao;
    private TokenGenerator tokenGenerator;

    public AuthController(AuthenticationManager authenticationManager, UserDao userDao, TokenGenerator tokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.userDao = userDao;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(),
                        loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/auth/register")
    public void register(@Valid @RequestBody RegisterDTO newUser) {
        try {
            User user = userDao.findByUsername(newUser.getUsername());
            throw new UserAlreadyExistsException();
        } catch (UsernameNotFoundException e) {
            userDao.create(newUser.getUsername(),newUser.getEmail(),newUser.getPassword(), newUser.getRole());
        }
    }

    static class LoginResponse {
        private String token;
        private User user;

        LoginResponse(String token, User user) {
            this.token = token;
            this.user = user;
        }

        @JsonProperty("token")
        String getToken() {
            return token;
        }
        void setToken(String token) {
            this.token = token;
        }
        @JsonProperty("user")
        public User getUser() {
            return user;
        }
        public void setUser(User user) {
            this.user = user;
        }
    }
}
