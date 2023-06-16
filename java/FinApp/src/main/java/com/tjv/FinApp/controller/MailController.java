package com.tjv.FinApp.controller;

import com.tjv.FinApp.email.MailService;
import com.tjv.FinApp.email.GMailer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MailController {
    private final MailService mailService;
    private final GMailer gMailer;

    @Autowired MailController(MailService mailService, GMailer gMailer) {
        this.mailService = mailService;
        this.gMailer = gMailer;
    }

    @GetMapping("/resetPassword")
    public void resetPassword() throws Exception {
        new GMailer().sendMail("A new message", """
                Dear reader,
                                
                Hello world.
                                
                Best regards,
                myself
                """);
    }
        //mailService.sendEmail();
    }

