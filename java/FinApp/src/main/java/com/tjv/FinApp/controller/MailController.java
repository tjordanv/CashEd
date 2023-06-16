package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.email.GMailer;
import com.tjv.FinApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MailController {
    private final GMailer gMailer;
    private UserDao userDao;

    @Autowired MailController(GMailer gMailer, UserDao userDao) {
        this.gMailer = gMailer;
        this.userDao = userDao;
    }

    @GetMapping("/resetPassword/{recipientEmailAddress}")
    public void resetPassword(@PathVariable String recipientEmailAddress) throws Exception {
        try {
            User user = userDao.getUserByEmailAddress(recipientEmailAddress);

            if (user == null) {
                throw new Exception("email was not found");
            }
            new GMailer().sendMail(recipientEmailAddress, "A new message", """
            Dear reader,
                            
            Hello world.
                            
            Best regards,
            Big Bone
            """);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}

