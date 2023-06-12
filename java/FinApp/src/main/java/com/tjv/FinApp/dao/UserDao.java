package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();
    User findByUsername(String username);
    boolean create(String username, String email, String password, String role);
}
