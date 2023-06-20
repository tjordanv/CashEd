package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.SecurityQuestionDao;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestion;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestionAnswer;
import org.springframework.web.bind.annotation.*;

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
    public SecurityQuestion getSecurityQuestion(@RequestParam int id) {
        SecurityQuestion securityQuestion = new SecurityQuestion();
        try {
            securityQuestion = securityQuestionDao.getQuestion(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return securityQuestion;
    }

    @GetMapping("/getSecurityQuestions")
    public List<SecurityQuestion> getSecurityQuestions(@RequestParam(required = false) List<Integer> ids) {
        if (ids.size() > 0)

        try {
            return securityQuestionDao.getQuestions();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

//    @GetMapping("/getSecurityQuestionsById")
//    public List<SecurityQuestion> getSecurityQuestionsById(@RequestBody SecurityQuestionsArray securityQuestionsArray) {
//        try {
//            return securityQuestionDao.getQuestionsById(securityQuestionsArray.getIds());
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return null;
//    }

    @PostMapping("/saveSecurityQuestionAnswer")
    public boolean saveSecurityQuestionAnswer(@RequestBody SecurityQuestionAnswer securityQuestionAnswer, Principal principal) {
        try {
            return securityQuestionDao.saveAnswer(securityQuestionAnswer, userDao.getUserIdByUsername(principal));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    @GetMapping("/getActiveSecurityQuestionAnswersByUserId")
    public List<SecurityQuestionAnswer> getActiveSecurityQuestionAnswersByUserId(Principal principal) {
        List<SecurityQuestionAnswer> securityQuestionAnswers = securityQuestionDao.getActiveSecurityQuestionAnswersByUserId(userDao.getUserIdByUsername(principal));

        if (securityQuestionAnswers.size() > 0) {
            return securityQuestionAnswers;
        } else {
            System.out.println("no active security question answers found for" + principal.getName());
            return null;
        }
    }
}
