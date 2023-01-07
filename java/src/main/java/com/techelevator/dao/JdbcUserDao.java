package com.techelevator.dao;

import java.security.Principal;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.techelevator.model.RegisterUserDTO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.techelevator.model.User;

@Service
public class JdbcUserDao implements UserDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


	@Override
	public User getByUsername(String username) {
		String sql = "SELECT * FROM users WHERE username iLike ?";
		SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);
		if(results.next()) {
			return mapRowToUser(results, false);
		} else {
			throw new RuntimeException(username + " was not found.");
		}
	}

    @Override
    public User getAllByUsername(String username) {
        String sql = "SELECT users.user_id, username, password_hash, role, city, state, email, phone, " +
                "first_name, last_name, join_date, termination_date, mission_statement" +
                " FROM users JOIN user_info ON users.user_id = user_info.user_id" +
                " JOIN user_contact ON user_info.user_id = user_contact.user_id" +
                " WHERE username = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);
        if(results.next()) {
            return mapRowToUser(results, true);
        } else {
            throw new RuntimeException(username + " was not found.");
        }
    }

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String sql = "select * from users";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            User user = mapRowToUser(results, false);
            users.add(user);
        }

        return users;
    }

    @Override
    public boolean create(RegisterUserDTO newUser) {
        boolean userCreated = false;

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = formatter.format(date);

        // create user
        String insertUser = "INSERT INTO users (username ,password_hash, role) VALUES (?,?,?)";
        String insertUserInfo = "INSERT INTO user_info (user_id, first_name, last_name, join_date, " +
                "mission_statement) VALUES (?, ?, ?, ?, ?)";
        String insertUserContact = "INSERT INTO user_contact (user_id, city, state, email, phone) " +
                "VALUES (?, ?, ?, ?, ?)";
        String password_hash = new BCryptPasswordEncoder().encode(newUser.getPassword());
        String ssRole = "ROLE_USER";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "user_id";
        userCreated = jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(insertUser, new String[]{id_column});
                    ps.setString(1, newUser.getUsername());
                    ps.setString(2, password_hash);
                    ps.setString(3, ssRole);
                    return ps;
                }
                , keyHolder) == 1;
        int newUserId = (int) keyHolder.getKeys().get(id_column);
        jdbcTemplate.update(insertUserInfo, newUserId, newUser.getFirstName(), newUser.getLastName(),
        date, newUser.getMissionStatement());
        jdbcTemplate.update(insertUserContact, newUserId, newUser.getCity(), newUser.getState(),
                newUser.getEmail(), newUser.getPhone());
        return userCreated;
    }

    private User mapRowToUser(SqlRowSet rs, boolean selectAll) {
        User user = new User();
        user.setId(rs.getLong("user_id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password_hash"));
        user.setAuthorities(rs.getString("role"));
        user.setActivated(true);

        if (selectAll) {
            user.setCity(rs.getString("city"));
            user.setState(rs.getString("state"));
            user.setEmail(rs.getString("email"));
            user.setPhone(rs.getString("phone"));
            user.setFirstName(rs.getString("first_name"));
            user.setLastName(rs.getString("last_name"));
            user.setJoinDate(rs.getDate("join_date"));
            user.setTerminationDate(rs.getDate("termination_date"));
            user.setMissionStatement(rs.getString("mission_statement"));
        }
        return user;
    }
}
