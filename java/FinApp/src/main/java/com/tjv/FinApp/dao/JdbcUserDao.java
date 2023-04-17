package com.tjv.FinApp.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

import com.tjv.FinApp.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JdbcUserDao implements UserDao{
    private JdbcTemplate jdbcTemplate;
    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            User user = mapRowToUser(results);
            users.add(user);
        }

        return users;
    }

    @Override
    public User findByUsername(String username) throws UsernameNotFoundException {
        for (User user : this.findAll()) {
            if (user.getUsername().toLowerCase().equals(username.toLowerCase())) {
                return user;
            }
        }
        throw new UsernameNotFoundException("User" + username + " was not found.");
    }

    @Override
    public boolean create(String username, String email, String password, String role) {
        boolean userCreated = false;

        String insertUser = "INSERT INTO users (username,email,password_hash,role) Values(?,?,?,?)";
        String password_hash = new BCryptPasswordEncoder().encode(password);
        String ssRole = "ROLE_" + role.toUpperCase();

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "id";
        userCreated = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(insertUser, new String[]{id_column});
            ps.setString(1, username);
            ps.setString(2, email);
            ps.setString(3, password_hash);
            ps.setString(4, ssRole);
            return ps;
        }
        , keyHolder) == 1;

        int newUserId = (int) keyHolder.getKeys().get(id_column);

        return userCreated;
    }

    private User mapRowToUser(SqlRowSet rs) {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password_hash"));
        user.setAuthorities(rs.getString("role"));
        user.setActivated(true);
        return user;
    }
}
