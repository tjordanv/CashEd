package com.techelevator.dao;

import com.techelevator.model.RegisterUserDTO;
import com.techelevator.model.User;

import java.security.Principal;
import java.util.List;

public interface UserDao {

    List<User> findAll();

    User getByUsername(String username);
    User getAllByUsername(String username);

    boolean create(RegisterUserDTO newObject);
}
