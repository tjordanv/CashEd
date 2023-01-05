package com.techelevator.controller;


import com.techelevator.dao.GoalDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin

public class GoalController {

    @Autowired
    private GoalDao goalDao;

    @GetMapping(value = "/current-goals")
    public List<Goal> getCurrentGoals(Principal principal) {
        return goalDao.getGoalsByUserId(principal);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/new-goal")
    public @ResponseBody int create(@RequestBody Goal newGoal) {
        int goalId = goalDao.create(newGoal);

        return goalId;
    }

    @PutMapping("/update-active-status/{goalId}/{activeStatus}")
    public void updateActiveStatus(@PathVariable int goalId, @PathVariable boolean activeStatus) {
        goalDao.updateGoalActiveStatus(goalId, activeStatus);
    }

    @PutMapping("/update-favorite-status/{goalId}/{favoriteStatus}")
    public void updateFavoriteStatus(@PathVariable int goalId, @PathVariable boolean favoriteStatus) {
        goalDao.updateGoalFavoriteStatus(goalId, favoriteStatus);
    }

    @GetMapping(value = "/get-goal/{goalId}")
    public Goal getGoalByGoalId(@PathVariable int goalId) throws Exception {
        return goalDao.getGoalByGoalId(goalId);
    }

    @GetMapping(value = "/get-and-check-goals")
    public List<Goal> getAndCheckGoals(Principal principal) {
        return goalDao.getAndCheckGoal(principal);
    }

    @PutMapping("/goal-early-termination/{goalId}")
    public void terminateGoal(@PathVariable int goalId) {
        goalDao.terminateGoal(goalId);
    }
}
