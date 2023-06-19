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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDao userDao;
    private final TokenGenerator tokenGenerator;

    public AuthController(AuthenticationManager authenticationManager, UserDao userDao, TokenGenerator tokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.userDao = userDao;
        this.tokenGenerator = tokenGenerator;
    }

    @GetMapping("/currentUser")
    @ResponseStatus(HttpStatus.OK)
    public Long currentUser(Principal principal) {
        try {
            return userDao.findByUsername(principal.getName()).getId();
        } catch (Exception e) {
            System.out.println("no current user");
        }
        return null;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getUsername(),
                            loginDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenGenerator.generateToken(authentication);
            User user = userDao.findByUsername(loginDTO.getUsername());

            return new ResponseEntity<>(new AuthResponseDTO(token, user), HttpStatus.OK);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Username and password do not match.");
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/auth/register")
    public void register(@Valid @RequestBody RegisterDTO newUser) {
        try {
            User user = userDao.findByUsername(newUser.getUsername());
            throw new UserAlreadyExistsException("Username taken.");
        } catch (UsernameNotFoundException e) {
            userDao.create(newUser.getUsername(),newUser.getEmail(),newUser.getPassword(), newUser.getRole());
        }
    }

    // This exception handler is handling when the UserAlreadyExistsException is thrown. Otherwise, the exceptionHandling method
    // called in the SecurityFilterChain inside the WebSecurityConfig file handles it with the default AuthenticationException
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleUserBadCredentialsException(BadCredentialsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
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
