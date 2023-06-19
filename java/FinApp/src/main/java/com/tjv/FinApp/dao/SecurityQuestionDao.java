package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.SecurityQuestion;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.List;

public interface SecurityQuestionDao {
    public SecurityQuestion getQuestion(int id);

    public List<SecurityQuestion> getAllQuestions();

    public boolean create();

    public boolean validateAnswer();

}
