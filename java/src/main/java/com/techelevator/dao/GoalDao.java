package com.techelevator.dao;

import com.techelevator.model.Goal;

import java.security.Principal;
import java.util.Date;
import java.util.List;

public interface GoalDao {
    List<Goal> getGoalsByUserId(Principal principal);
    int create(Goal goal);
    void terminateGoal(int goalId);
    void updateGoalActiveStatus(int goalId, boolean activeStatus);
    void updateGoalFavoriteStatus(int goalId, boolean favoriteStatus);
    Goal getGoalByGoalId(int goalId) throws Exception;
    List<Goal> getAndCheckGoal(Principal principal);
}
