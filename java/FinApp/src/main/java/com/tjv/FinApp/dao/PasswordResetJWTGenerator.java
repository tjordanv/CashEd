package com.tjv.FinApp.dao;

import com.tjv.FinApp.security.SecurityConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component

public class PasswordResetJWTGenerator {
    private final JdbcTemplate jdbcTemplate;


    public PasswordResetJWTGenerator(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String generateToken(int userId, String email) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", email);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.JWT_SECRET)
                .compact();
    }
    public void storeToken(String token) {
        String sql = "INSERT INTO password_reset_jwt (token) VALUES (?)";
        jdbcTemplate.update(sql, token);
    }
}
