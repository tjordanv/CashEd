package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.PasswordResetJWTGenerator;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.email.GMailer;
import com.tjv.FinApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class MailController {
    private final GMailer gMailer;
    private final PasswordResetJWTGenerator tokenGenerator;
    private UserDao userDao;

    @Autowired MailController(GMailer gMailer, PasswordResetJWTGenerator tokenGenerator, UserDao userDao) {
        this.gMailer = gMailer;
        this.tokenGenerator = tokenGenerator;
        this.userDao = userDao;
    }

    @GetMapping("/auth/resetPassword")
    public boolean resetPassword(@RequestParam String username, @RequestParam String email) throws Exception {
        try {
            String token;
            User user = userDao.findByUsername(username);
            if (user.getEmail().equals(email)){
                // If username and email match, generate and store token
                token = tokenGenerator.generateToken(user.getId(), email);
                tokenGenerator.storeToken(token);
            } else {
                throw new Exception("Username and/or Email do not exist");
            }

            String body = String.format("""
            Dear reader,
                            
            Hello world.
            
            <a href="http://localhost:3000/auth/resetPassword/%s">reset password</a>
                            
            Best regards,
            Big Bone
            """, token);

            new GMailer().sendMailWithHTML(email, "A new message", body);

            return true;

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
    @GetMapping("/auth/usernameRecovery")
    public boolean usernameRecovery(@RequestParam int id) throws Exception {

        try {
            User user = userDao.getUserById(id);
            if (user == null) {
//                throw new Exception("user was not found");
                return false;
            }
            new GMailer().sendMail(user.getEmail(), "User Recovery", """
            Hello reader,
                            
            Thank you for using my sick application.
            Below you will find your username. Try not to forget this again, buddy.
            
            %s
                            
            Best regards,
            Big Bone
            """.formatted(user.getUsername()));

            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}

