package com.techelevator.dao;

import com.techelevator.model.Score;

import java.util.List;

public interface ScoreDao <T>{
    List<T> getScoresByGoalId(int goalId);
    void createScore(T score);
    void updateScore(T score);
}
