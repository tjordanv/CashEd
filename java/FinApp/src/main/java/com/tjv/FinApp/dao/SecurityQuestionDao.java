package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.securityQuestions.SecurityQuestion;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestionAnswer;

import java.security.Principal;
import java.util.List;

public interface SecurityQuestionDao {
    public SecurityQuestion getQuestion(int id);
    public List<SecurityQuestion> getQuestions();
    public List<SecurityQuestion> getQuestions(List<Integer> ids);
    public boolean saveAnswer(SecurityQuestionAnswer securityQuestionAnswer, int userId);
    public List<SecurityQuestionAnswer> getActiveSecurityQuestionAnswersByUserId(int userId);
    public boolean validateAnswer(int id, String answerProvided);
}
