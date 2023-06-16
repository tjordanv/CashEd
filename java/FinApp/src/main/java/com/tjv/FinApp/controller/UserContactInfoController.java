package com.tjv.FinApp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.security.Principal;

public class UserContactInfoController {
    @GetMapping("/test")
    @ResponseStatus(HttpStatus.OK)
    public void Tester(Principal principal) {
        System.out.println("test");
        try {
            System.out.println(principal.getName());
        } catch (Exception e) {
            System.out.println("no principal");
        }
    }
}
