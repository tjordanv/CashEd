package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TestDao;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.TestModel;
import com.tjv.FinApp.model.User;
import com.tjv.FinApp.dao.PasswordResetJWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class TestController {

    @Autowired
    TestDao testDao;

    private final UserDao userDao;
    private final PasswordResetJWTGenerator tokenGenerator;

    public TestController(UserDao userDao, PasswordResetJWTGenerator tokenGenerator) {
        this.userDao = userDao;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("auth/test")
    @ResponseStatus(HttpStatus.CREATED)
    public void test(@RequestParam String username, @RequestParam String email){
        // First verify the user input matches to a valid user
        try {
            User user = userDao.findByUsername(username);
            if (user.getEmail().equals(email)){
                // If username and email match, generate and store token
                String token = tokenGenerator.generateToken(user.getId(), email);
                tokenGenerator.storeToken(token);
            } else {
                throw new Exception("Username and/or Email do not exist");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @GetMapping("/login")
    public void testLogin(){
        System.out.println("login");

        TestModel model = testDao.getData();
        //return model;
    }


//    @PostMapping("/logout")
//    public void logout(){
//
//
//    }
}
