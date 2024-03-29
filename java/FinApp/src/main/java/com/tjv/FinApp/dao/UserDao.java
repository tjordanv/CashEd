package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.User;

import java.security.Principal;
import java.util.List;

public interface UserDao {
    List<User> findAll();
    User findByUsername(String username);
    User getUserById(int id);
    boolean create(String username, String firstName, String lastName, String email, String password, String role);
    User getUserByEmailAddress(String emailAddress);
    int getUserIdByUsername(Principal principal);
    void updatePassword(User user);
    Boolean checkEmailAvailability(String email);
    Boolean checkUsernameAvailability(String username);
     int createEmailAddress(String emailAddress, boolean isActive);
}
