package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.securityQuestions.SecurityQuestion;
import com.tjv.FinApp.model.securityQuestions.SecurityQuestionAnswer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class JdbcSecurityQuestionDao implements SecurityQuestionDao{
    private final JdbcTemplate jdbcTemplate;

    public JdbcSecurityQuestionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public SecurityQuestion getQuestion(int id) {
        SecurityQuestion securityQuestion = new SecurityQuestion();
        String sql = "select * from security_questions where id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);

        if(results.next()) {
            securityQuestion = mapRowToSecurityQuestion(results);
        } else {
            return null;
        }
        return securityQuestion;
    }

    @Override
    public List<SecurityQuestion> getQuestions() {
        List<SecurityQuestion> securityQuestions = new ArrayList<>();
        String sql = "SELECT id, question FROM security_questions";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            SecurityQuestion securityQuestion = mapRowToSecurityQuestion(results);
            securityQuestions.add(securityQuestion);
        }
        return securityQuestions;
    }


    public List<SecurityQuestion> getQuestions(List<Integer> ids) {
        List<SecurityQuestion> securityQuestions = new ArrayList<>();
        // create the placeholder variable to ensure the sql string has the correct number or them.
        //jdbcTemplate.queryForRowSet is a varargs method
        String placeholders = String.join(",", Collections.nCopies(ids.size(), "?"));
        String sql = "SELECT id, question FROM security_questions WHERE id in (" + placeholders + ")";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, ids.toArray());
        while(results.next()) {
            SecurityQuestion securityQuestion = mapRowToSecurityQuestion(results);
            securityQuestions.add(securityQuestion);
        }
        return securityQuestions;
    }

    @Override
    public boolean saveAnswer(SecurityQuestionAnswer securityQuestionAnswer, int userId) {
        String sql = "INSERT INTO security_question_answers (answer) VALUES (?) RETURNING id";

        Integer answerId = jdbcTemplate.queryForObject(sql, Integer.class, securityQuestionAnswer.getAnswer());
        if (answerId != null) {
            securityQuestionAnswer.setAnswer_id(answerId);
        } else {
            System.out.println("no answer id returned, check if the answer was saved.");
            return false;
        }

        sql = "INSERT INTO user_security_question_answers_xref (user_id, question_id, answer_id) VALUES (?, ?, ?)";
        try {
            jdbcTemplate.update(sql, userId, securityQuestionAnswer.getQuestion_id(), securityQuestionAnswer.getAnswer_id());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }

        return true;
    }

    @Override
    public List<SecurityQuestionAnswer> getActiveSecurityQuestionAnswersByUserId(int userId) {
        List<SecurityQuestionAnswer> securityQuestionAnswers = new ArrayList<>();
        String sql = "SELECT answer_id, question_id, answer FROM security_question_answers a JOIN " +
                "user_security_question_answers_xref x on a.id = x.answer_id WHERE is_active = true and user_id = ?";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        while (results.next()) {
            SecurityQuestionAnswer securityQuestionAnswer = mapRowToSecurityQuestionAnswer(results);
            securityQuestionAnswers.add(securityQuestionAnswer);
        }

        return securityQuestionAnswers;
    }

    @Override
    public boolean validateAnswer() {
       // String sql = SE

        return true;
    }

    public SecurityQuestion mapRowToSecurityQuestion(SqlRowSet rs) {
        SecurityQuestion securityQuestion = new SecurityQuestion();
        securityQuestion.setId(rs.getInt("id"));
        securityQuestion.setQuestion(rs.getString("question"));

        return securityQuestion;
    }

    public SecurityQuestionAnswer mapRowToSecurityQuestionAnswer(SqlRowSet rs) {
        SecurityQuestionAnswer securityQuestionAnswer = new SecurityQuestionAnswer();
        securityQuestionAnswer.setAnswer(rs.getString("answer"));
        securityQuestionAnswer.setAnswer_id(rs.getInt("answer_id"));
        securityQuestionAnswer.setQuestion_id(rs.getInt("question_id"));

        return securityQuestionAnswer;
    }
}
