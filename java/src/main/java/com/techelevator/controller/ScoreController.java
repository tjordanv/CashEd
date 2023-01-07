package com.techelevator.controller;

import com.techelevator.dao.ScoreDao;
import com.techelevator.model.Score;
import com.techelevator.model.TotalScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ScoreController {

    @Autowired
    private ScoreDao<Score> scoreDao;
    @Autowired
    private ScoreDao<TotalScore> totalScoreDao;

    @GetMapping(value="/goal-scores/{goalId}")
    public List<Score> getScoresByGoalId(@PathVariable int goalId) {
        return scoreDao.getScoresByGoalId(goalId);
    }

    @PostMapping(value="/add-score")
    public void addScore(@RequestBody Score score) {
        scoreDao.createScore(score);
    }

    @PostMapping(value = "/create-total-score")
    public void createTotalScore(@RequestBody TotalScore totalScore) {
        totalScoreDao.createScore(totalScore);
    }

    @PutMapping("/update-total-score")
    public void updateTotalScore(@RequestBody TotalScore totalScore) {
        totalScoreDao.updateScore(totalScore);
    }

    @GetMapping("/get-total-score/{goalId}")
    public List<TotalScore> getTotalScoreById(@PathVariable int goalId) {
        return totalScoreDao.getScoresByGoalId(goalId);
    }
}
