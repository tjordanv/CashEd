package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.email.GMailer;
import com.tjv.FinApp.model.User;
import com.tjv.FinApp.model.UserRecovery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class MailController {
    private final GMailer gMailer;
    private UserDao userDao;

    @Autowired MailController(GMailer gMailer, UserDao userDao) {
        this.gMailer = gMailer;
        this.userDao = userDao;
    }

    @GetMapping("/auth/resetPassword")
    public void resetPassword(@RequestBody UserRecovery userRecovery) throws Exception {
        try {
            User user = userDao.getUserByEmailAddress(userRecovery.getEmailAddress());

            if (user == null) {
                throw new Exception("user was not found");
            }
            new GMailer().sendMail(userRecovery.getEmailAddress(), "A new message", """
            Dear reader,
                            
            Hello world.
                            
            Best regards,
            Big Bone
            """);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    @GetMapping("/auth/usernameRecovery")
    public void usernameRecovery(@RequestParam int id) throws Exception {

        try {
            User user = userDao.getUserById(id);
            System.out.println("check");
            if (user == null) {
                throw new Exception("user was not found");
            }
            new GMailer().sendMail(user.getEmail(), "User Recovery", """
            Hello reader,
                            
            Thank you for using my sick application.
            Below you will find your username. Try not to forget this again, buddy.
            
            %s
                            
            Best regards,
            Big Bone
            """.formatted(user.getUsername()));

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}

