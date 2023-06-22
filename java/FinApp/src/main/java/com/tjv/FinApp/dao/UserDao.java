package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.User;

import java.security.Principal;
import java.util.List;

public interface UserDao {
    List<User> findAll();
    User findByUsername(String username);
    public User getUserById(int id);
    boolean create(String username, String email, String password, String role);
    User getUserByEmailAddress(String emailAddress);
    public int getUserIdByUsername(Principal principal);
}
