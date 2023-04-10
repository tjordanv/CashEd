package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TestDao;
import com.tjv.FinApp.model.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class TestController {
    @Autowired
    TestDao testDao;


    @GetMapping("/model")
    public TestModel getModel(){
        TestModel model = testDao.getData();
        return model;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> testLogin(){
        System.out.println("login");
    }
}
