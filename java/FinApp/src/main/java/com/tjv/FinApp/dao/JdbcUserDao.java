package com.tjv.FinApp.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.security.Principal;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

import com.tjv.FinApp.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JdbcUserDao implements UserDao{
    private final JdbcTemplate jdbcTemplate;
    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT u.*, e.email_address, COUNT(sqa.id) active_security_questions " +
                        "FROM users u " +
                        "JOIN user_email_addresses_xref ex ON u.id = ex.user_id " +
                        "JOIN email_addresses e ON ex.email_address_id = e.id " +
                        "LEFT JOIN user_security_question_answers_xref sqx ON u.id = sqx.user_id " +
                        "LEFT JOIN security_question_answers sqa ON sqx.answer_id = sqa.id AND sqa.is_active = true " +
                        "GROUP BY u.id, e.email_address";

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
        // this exception is thrown, but I do not think it is really caught or handled anywhere.
        // That should be looked into
        throw new UsernameNotFoundException("User" + username + " was not found.");
    }

    @Override
    public boolean create(String username, String firstName, String lastName, String email, String password, String role) {
        boolean userCreated = false;

        String insertUser = "INSERT INTO users (username, password_hash, role, first_name, last_name) Values(?,?,?,?,?)";
        String password_hash = new BCryptPasswordEncoder().encode(password);
        String ssRole = "ROLE_" + role.toUpperCase();

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "id";
        userCreated = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(insertUser, new String[]{id_column});
            ps.setString(1, username);
            ps.setString(2, password_hash);
            ps.setString(3, ssRole);
            ps.setString(4, firstName);
            ps.setString(5, lastName);
            return ps;
        }
        , keyHolder) == 1;

        Long newUserIdLong = (Long) keyHolder.getKeys().get(id_column);
        int newUserId = newUserIdLong.intValue();

        int newEmailAddressID = createEmailAddress(email);

        String sql = "INSERT INTO user_email_addresses_xref (user_id, email_address_id) VALUES (?, ?)";

        jdbcTemplate.update(sql, newUserId, newEmailAddressID);

        return userCreated;
    }

    @Override
    public void updatePassword(User user) {
        String sql = "UPDATE users " +
                "SET password_hash = ? " +
                "WHERE id = ?";

        System.out.println(user.getPassword());
        String passwordHash = new BCryptPasswordEncoder().encode(user.getPassword());
        System.out.println(passwordHash);
        jdbcTemplate.update(sql, passwordHash, user.getId());
    }

    @Override
    public Boolean checkEmailAvailability(String email) {
        String sql = "SELECT email_address " +
                "FROM email_addresses " +
                "WHERE email_address = ? " +
                "AND is_active = true"; //Once this flag is added, this will need to be included "AND u.isActive" +

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, email);

        return results.next();
    }
    @Override
    public Boolean checkUsernameAvailability(String username) {
        String sql = "SELECT username " +
                "FROM users " +
                "WHERE username = ? ";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);

        return results.next();
    }

    public int createEmailAddress(String emailAddress) {
        String sql = "INSERT INTO email_addresses (email_address, is_active, is_verified) VALUES (?, true, false) RETURNING ID";

        Integer userId = jdbcTemplate.queryForObject(sql, Integer.class, emailAddress);

        if (userId != null) {
            return userId;
        } else {
            throw new RuntimeException("Email address was not created: " + emailAddress);
        }
    }
    @Override
    public User getUserByEmailAddress(String emailAddress) {
        User user = new User();
        String sql = "Select u.*, e.Email_Address from Users u join User_Email_Addresses_xref ex " +
                "on u.ID = ex.User_ID Join Email_Addresses e on ex.Email_Address_ID = e.ID WHERE e.Email_Address = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, emailAddress);

        if(results.next()) {
            user = mapRowToUser(results);
        } else {
            return null;
        }

        return user;
    }
    @Override
    public User getUserById(int id) {
        User user = new User();
        String sql = "Select username, email_address FROM users u " +
                "join user_email_addresses_xref ex on u.id = ex.user_id " +
                "join email_addresses e on ex.email_address_id = e.id WHERE u.id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);

        if(results.next()) {
            user.setUsername(results.getString("username"));
            user.setEmail(results.getString("email_address"));
        } else {
            return null;
        }
        return user;
    }

    @Override
    public int getUserIdByUsername(Principal principal) {
        User user = this.findByUsername(principal.getName());

        return user.getId() != null ? user.getId() : 0;
    }

    private User mapRowToUser(SqlRowSet rs) {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setEmail(rs.getString("email_address"));
        if (rs.getMetaData().getColumnCount() >= 8 && rs.findColumn("active_security_questions") > 0) {
            user.setActiveSecurityQuestions(rs.getInt("active_security_questions"));
        }
        user.setPassword(rs.getString("password_hash"));
        user.setAuthorities(rs.getString("role"));
        user.setActivated(true);
        return user;
    }
}
