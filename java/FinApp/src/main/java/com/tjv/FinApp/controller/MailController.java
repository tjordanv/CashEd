package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.ContactInfoDao;
import com.tjv.FinApp.dao.PasswordResetJWTGenerator;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.email.GMailer;
import com.tjv.FinApp.model.ContactInfo;
import com.tjv.FinApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class MailController {
    private final GMailer gMailer;
    private final PasswordResetJWTGenerator tokenGenerator;
    private UserDao userDao;
    private ContactInfoDao contactInfoDao;

    @Autowired MailController(GMailer gMailer, PasswordResetJWTGenerator tokenGenerator, UserDao userDao, ContactInfoDao contactInfoDao) {
        this.gMailer = gMailer;
        this.tokenGenerator = tokenGenerator;
        this.userDao = userDao;
        this.contactInfoDao = contactInfoDao;
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
                Hello %s,<br/><br/>
                                
                Use the link below to reset your password. Access to this link will expire after 20 minutes. If you did
                not request this password reset, please notify us and ignore this link. Let us know if you have any questions or concerns.<br/><br/>
                 
                <a href="http://localhost:3000/resetPassword/%s">Reset Password</a><br/><br/>
                 
                Best regards,<br/>
                Big Bone
                """, user.getFirstName(), token);

            new GMailer().sendMailWithHTML(email, "Password Reset", body);

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

            String body = String.format("""
                    Hello %s,<br/><br/>
                    Thank you for using my sick application.
                    Below you will find your username. Try not to forget this again, buddy.<br/><br/>
                 
                    <strong><i>%s<i></strong><br/><br/>
                             
                    Best regards,
                    Big Bone
                    """, user.getFirstName(), user.getUsername());

            new GMailer().sendMailWithHTML(user.getEmail(), "Username Recovery", body);

            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    @PostMapping("/auth/contactUs")
    public boolean contactUs(@RequestBody ContactInfo contactInfo) throws Exception {
        try {
            ContactInfo updatedContactInfo = contactInfoDao.saveContactInfo(contactInfo);

            // Send email to the user letting them know that we received their message.
            String body = String.format("""
                        Greetings from CashEd,<br/><br/>
                        Thank you for contacting us, %s. We are reviewing you message and will be contacting you shortly with more information.<br/><br/>
                                 
                        Best regards,<br/>
                        Big Bone
                        """, updatedContactInfo.getFirstName());

            new GMailer().sendMailWithHTML(updatedContactInfo.getEmailAddress(), "Thank you for contacting us", body);

            // Send email to self with the contact info to then start the thread with the user.
            body = String.format("""
                    Username: %s <br/>
                    First Name: %s <br/>
                    Last Name: %s <br/>
                    Email Address: %s <br/>
                    Message: %s <br/>
                    """, updatedContactInfo.getUsername(), updatedContactInfo.getFirstName(), updatedContactInfo.getLastName(),
                    updatedContactInfo.getEmailAddress(), updatedContactInfo.getMessage());

            new GMailer().sendMailWithHTML("<cashedfinancial@gmail.com>", "Contact Us Information", body);

        return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}

