package com.tjv.FinApp.controller;

import com.tjv.FinApp.email.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MailController {
    private final MailService mailService;

    @Autowired MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/resetPassword")
    public void resetPassword() {
        mailService.sendEmail();
    }

}
