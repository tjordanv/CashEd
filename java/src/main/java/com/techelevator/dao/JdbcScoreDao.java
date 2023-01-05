package com.techelevator.dao;

import com.techelevator.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JdbcScoreDao implements ScoreDao<Score>{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Score> getScoresByGoalId(int goalId) {
        List<Score> scores = new ArrayList<>();
        String sql = "SELECT * FROM goal_scores JOIN goals ON goals.goal_id = " +
                "goal_scores.goal_id WHERE goals.goal_id = ? ORDER BY date";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, goalId);
        while (results.next()) {
            scores.add(mapRowToScore(results));
        }
        return scores;
    }

    @Override
    public void createScore(Score newScore) {
        int goalId = newScore.getGoalId();
        Date date = newScore.getDate();
        int score = newScore.getScore();
        String notes = newScore.getNotes();

        String sql = "INSERT INTO goal_scores (goal_id, date, score, notes) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, goalId, date, score, notes);
    }

    @Override
    public void updateScore(Score score) {

    }

    private Score mapRowToScore(SqlRowSet rowSet) {
        Score score = new Score();
        score.setScoreId(rowSet.getInt("score_id"));
        score.setGoalId(rowSet.getInt("goal_id"));
        score.setDate(rowSet.getDate("date"));
        score.setScore(rowSet.getInt("score"));
        score.setNotes(rowSet.getString("notes"));
        return score;
    }
}
