package com.techelevator.dao;

import com.techelevator.model.Score;
import com.techelevator.model.TotalScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcTotalScoreDao implements ScoreDao<TotalScore>{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<TotalScore> getScoresByGoalId(int goalId) {
        List<TotalScore> totalScore = new ArrayList<>();
        String sql = "SELECT * from goal_total_score WHERE goal_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, goalId);
        if (results.next()) {
            totalScore.add(mapRowToTotalScore(results));
        }
        return totalScore;
    }

    @Override
    public void createScore(TotalScore score) {
        String sql = "INSERT INTO goal_total_score (goal_id, score_count, score) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, score.getGoalId(), score.getScoreCount(), score.getScore());
    }

    @Override
    public void updateScore(TotalScore score) {
        List<TotalScore> currentTotalList = getScoresByGoalId(score.getGoalId());
        TotalScore currentTotal = currentTotalList.get(0);
        String sql = "UPDATE goal_total_score SET score_count = ?, score = ? WHERE goal_id = ?";
        jdbcTemplate.update(sql, currentTotal.getScoreCount() + 1,
                score.getScore(), score.getGoalId());
    }

    private TotalScore mapRowToTotalScore(SqlRowSet rowSet) {
        TotalScore totalScore = new TotalScore();
        totalScore.setId(rowSet.getInt("total_id"));
        totalScore.setGoalId(rowSet.getInt("goal_id"));
        totalScore.setScoreCount(rowSet.getInt("score_count"));
        totalScore.setScore(rowSet.getInt("score"));
        return totalScore;
    }
}
