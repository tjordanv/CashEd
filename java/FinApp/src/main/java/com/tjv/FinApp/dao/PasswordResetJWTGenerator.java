package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.User;
import com.tjv.FinApp.security.SecurityConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
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
        Date expiration = new Date(now.getTime() + 20 * 60 * 1000); // 24 hours

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

    public User verifyToken(String token) {
        String sql = "SELECT id " +
                "from password_reset_jwt " +
                "WHERE token = ? " +
                "AND is_active = true";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, token);

        if (results.next()) {
            try {
                Claims claims = Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJws(token).getBody();

                Date currentTime = new Date();
                Date expiration = claims.getExpiration();

                if (currentTime.before(expiration)) {
                    User user = new User();
                    user.setId(claims.get("userId", Integer.class));
                    user.setEmail(claims.get("email", String.class));

                    return user;
                }
            } catch (Exception e) {
                Integer tokenId = results.getInt("id");

                sql = "UPDATE password_reset_jwt " +
                        "SET is_active = false " +
                        "WHERE id = ?";

                jdbcTemplate.update(sql, tokenId);
            }
        }
        return null;
    }

    //public User
}
