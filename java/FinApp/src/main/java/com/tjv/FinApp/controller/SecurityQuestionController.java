package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.SecurityQuestionDao;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestion;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestionAnswer;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class SecurityQuestionController {
    private final SecurityQuestionDao securityQuestionDao;
    private final UserDao userDao;


    public SecurityQuestionController(SecurityQuestionDao securityQuestionDao, UserDao userDao) {
        this.securityQuestionDao = securityQuestionDao;
        this.userDao = userDao;
    }

    @GetMapping("/auth/getSecurityQuestion")
    public SecurityQuestion getSecurityQuestion(@RequestParam int id) {
        SecurityQuestion securityQuestion = new SecurityQuestion();
        try {
            securityQuestion = securityQuestionDao.getQuestion(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return securityQuestion;
    }

    @GetMapping("/auth/getSecurityQuestions")
    public List<SecurityQuestion> getSecurityQuestions(@RequestParam(required = false) List<Integer> ids) {
        if (ids != null)
            return securityQuestionDao.getQuestions(ids);
        else {
            try {
                return securityQuestionDao.getQuestions();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
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

    @GetMapping("/auth/getActiveSecurityQuestionAnswersByUserId")
    public List<SecurityQuestionAnswer> getActiveSecurityQuestionAnswersByUserId(@RequestParam int id) {
        List<SecurityQuestionAnswer> securityQuestionAnswers = securityQuestionDao.getActiveSecurityQuestionAnswersByUserId(id);

        if (securityQuestionAnswers.size() > 0) {
            return securityQuestionAnswers;
        } else {
            System.out.println("no active security question answers found for this user");
            return null;
        }
    }

    @GetMapping("/auth/validateAnswer")
    public boolean validateAnswer(@RequestParam String id, @RequestParam String answerProvided) {
        int idInt = Integer.parseInt(id);
        return securityQuestionDao.validateAnswer(idInt, answerProvided);
    }
}
