package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.SecurityQuestion;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public interface SecurityQuestionDao {
    public SecurityQuestion getQuestion(int id);

    public boolean create();

    public boolean validateAnswer();

}
