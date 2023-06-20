package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.SecurityQuestionDao;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestion;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestionAnswer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class SecurityQuestionController {
    private final SecurityQuestionDao securityQuestionDao;
    private final UserDao userDao;


    public SecurityQuestionController(SecurityQuestionDao securityQuestionDao, UserDao userDao) {
        this.securityQuestionDao = securityQuestionDao;
        this.userDao = userDao;
    }

    @GetMapping("/getSecurityQuestion")
    public SecurityQuestion getSecurityQuestion(@RequestBody SecurityQuestion securityQuestion) {
        try {
            securityQuestion = securityQuestionDao.getQuestion(securityQuestion.getId());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return securityQuestion;
    }

    @GetMapping("/getAllSecurityQuestions")
    public List<SecurityQuestion> getAllSecurityQuestions() {
        try {
            return securityQuestionDao.getAllQuestions();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @PostMapping("/saveSecurityQuestionAnswer")
    public boolean saveSecurityQuestionAnswer(@RequestBody SecurityQuestionAnswer securityQuestionAnswer, Principal principal) {
        try {
            return securityQuestionDao.saveAnswer(securityQuestionAnswer, userDao.getUserIdByUsername(principal));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}
