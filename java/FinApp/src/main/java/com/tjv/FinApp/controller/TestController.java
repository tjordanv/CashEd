package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TestDao;
import com.tjv.FinApp.model.TestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
