package com.techelevator.dao;

import com.techelevator.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class JdbcGoalDao implements GoalDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<Goal> getGoalsByUserId(Principal principal) {
        List<Goal> goals = new ArrayList<>();
        String sql = "SELECT * FROM goals JOIN users ON users.user_id = goals.user_id WHERE username = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, principal.getName());
        while (results.next()) {
            Goal goal = mapRowToGoal(results);
            goals.add(goal);
        }

        return goals;
    }

    @Override
    public int create(Goal goal) {
        String sql = "INSERT INTO goals (user_id, summary, description, goal, movement, units, " +
                "start_date, end_date, active, favorite, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING goal_id";
        int newGoalId = jdbcTemplate.queryForObject(sql, Integer.class, goal.getUserId(), goal.getSummary(), goal.getDescription(),
        goal.getGoal(), goal.getMovement(), goal.getUnits(), goal.getStartDate(), goal.getEndDate(), goal.isActive(), false, goal.getVisibility());

        return newGoalId;
    }

    @Override
    public void terminateGoal(int goalId) {
        String sql = "UPDATE goals set early_termination = true, active = false WHERE goal_id = ?";
        jdbcTemplate.update(sql, goalId);
    }

    @Override
    public void updateGoalActiveStatus(int goalId, boolean activeStatus) {
        String sql = "UPDATE goals SET active = ? WHERE goal_id = ?";
        jdbcTemplate.update(sql, activeStatus, goalId);
    }

    @Override
    public void updateGoalFavoriteStatus(int goalId, boolean favoriteStatus) {
        String sql = "UPDATE goals SET favorite = ? WHERE goal_id = ?";
        jdbcTemplate.update(sql, favoriteStatus, goalId);
    }

    // TODO create a custom exception to use rather than the generic exception
    @Override
    public Goal getGoalByGoalId(int goalId) throws Exception {
        String sql = "SELECT * FROM goals WHERE goal_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, goalId);
        if (results.next()) {
            return mapRowToGoal(results);
        } else {
            throw new Exception("goal not found");
        }
    }

    @Override
    public List<Goal> getAndCheckGoal(Principal principal) {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = formatter.format(date);
        dateStr = dateStr.replace("-", "");
        int dateInt = Integer.parseInt(dateStr);

        List<Goal> goals;
        List<Goal> filteredGoals = new ArrayList<>();
        goals = getGoalsByUserId(principal);
        for (Goal goal : goals) {
            String goalDate = formatter.format(goal.getEndDate());
            goalDate = goalDate.replace("-", "");
            int goalEndDateInt = Integer.parseInt(goalDate);

            String goalStartDate = formatter.format(goal.getStartDate());
            goalStartDate = goalStartDate.replace("-", "");
            int goalStartDateInt = Integer.parseInt(goalStartDate);

            if (goal.isActive() && goalEndDateInt < dateInt) {
                updateGoalActiveStatus(goal.getGoalId(), false);
            } else if ((!goal.isActive() && !goal.isEarlyTermination()) && (goalStartDateInt <= dateInt && dateInt <=goalEndDateInt)) {
                updateGoalActiveStatus(goal.getGoalId(), true);
                filteredGoals.add(goal);
            } else if (goal.isActive()) {
                filteredGoals.add(goal);
            }
        }

        return filteredGoals;
    }

    private Goal mapRowToGoal(SqlRowSet rowSet) {
        Goal goal = new Goal();
        goal.setGoalId(rowSet.getInt("goal_id"));
        goal.setUserId(rowSet.getInt("user_id"));
        goal.setSummary(rowSet.getString("summary"));
        goal.setDescription(rowSet.getString("description"));
        goal.setGoal(rowSet.getInt("goal"));
        goal.setMovement(rowSet.getString("movement"));
        goal.setUnits(rowSet.getString("units"));
        goal.setStartDate(rowSet.getDate("start_date"));
        goal.setEndDate(rowSet.getDate("end_date"));
        goal.setActive(rowSet.getBoolean("active"));
        goal.setEarlyTermination(rowSet.getBoolean("early_termination"));
        goal.setFavorite(rowSet.getBoolean("favorite"));
        goal.setVisibility(rowSet.getInt("visibility"));
        return goal;
    }
}
