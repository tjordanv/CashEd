package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Transaction;
import com.tjv.FinApp.model.TransactionSubcategory;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import static com.tjv.FinApp.utils.ArrayUtils.StringToIntArray;

@Service
public class JdbcTransactionSubcategoryDao implements TransactionSubcategoryDao{
    private final JdbcTemplate jdbcTemplate;
    private final UserDao userDao;

    public JdbcTransactionSubcategoryDao(JdbcTemplate jdbcTemplate, UserDao userDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.userDao = userDao;
    }

    @Override
    public List<TransactionSubcategory> getActiveSubcategoriesByUser(Principal principal) {
        String sql = "SELECT id, name, category_id, detailed_name, description FROM transaction_subcategories s " +
                "JOIN transaction_subcategory_user_xref sx ON s.id = sx.subcategory_id AND user_id = ?";
        int userId = userDao.getUserIdByUsername(principal);

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        List<TransactionSubcategory> subcategories = new ArrayList<>();

        while (results.next()) {
            subcategories.add(mapRowToSubcategory(results));
        }
        return subcategories;
    }

    @Override
    public List<TransactionSubcategory> getSubcategoriesByUser(Principal principal) {
        String sql = "SELECT id, name, category_id, detailed_name, description, " +
                "CASE WHEN sx.subcategory_id IS NOT NULL THEN true ELSE false END AS isActive " +
                "FROM transaction_subcategories s " +
                "LEFT JOIN transaction_subcategory_user_xref sx ON s.id = sx.subcategory_id AND user_id = ? " +
                "ORDER BY isActive desc, name";
        int userId = userDao.getUserIdByUsername(principal);

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        List<TransactionSubcategory> subcategories = new ArrayList<>();

        while (results.next()) {
            subcategories.add(mapRowToSubcategory(results));
        }
        return subcategories;
    }
    @Override
    public List<TransactionSubcategory> getSubcategoriesByMonth(Principal principal, int month, int year) {
        String sql = "SELECT s.id, s.name, category_id, detailed_name, s.description, sum(t.amount) as total " +
        "FROM transactions t " +
        "JOIN transaction_subcategories s on t.subcategory_id = s.id " +
        "WHERE user_id = ? AND t.is_deleted = false AND date BETWEEN ? AND ? " +
        "GROUP BY s.id, s.name, category_id, detailed_name, s.description " +
        "ORDER BY s.name";
        int userId = userDao.getUserIdByUsername(principal);
        LocalDate startOfMonth = LocalDate.of(year, month, 1); //LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = startOfMonth.with(TemporalAdjusters.lastDayOfMonth());

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId, startOfMonth, endOfMonth);
        List<TransactionSubcategory> subcategories = new ArrayList<>();

        while (results.next()) {
            subcategories.add(mapRowToSubcategory(results));
        }
        return subcategories;
    }

    @Override
    public void updateUserSubcategories(Principal principal, String subcategoryIdsToSave, String subcategoryIdsToDelete) {
        int userId = userDao.getUserIdByUsername(principal);
        int[] subcategoryIdsToSaveArray = subcategoryIdsToSave.isEmpty() ? new int[0] : StringToIntArray(subcategoryIdsToSave);
        int[] subcategoryIdsToDeleteArray = subcategoryIdsToDelete.isEmpty() ? new int[0] : StringToIntArray(subcategoryIdsToDelete);
        SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("userId", userId)
                .addValue("subcategoryIdsToSave", subcategoryIdsToSaveArray, Types.ARRAY)
                .addValue("subcategoryIdsToDelete", subcategoryIdsToDeleteArray, Types.ARRAY);
        String sql = "DELETE FROM transaction_subcategory_user_xref WHERE user_id = :userId and subcategory_id = ANY(:subcategoryIdsToDelete)";

        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate.getDataSource());
        namedParameterJdbcTemplate.update(sql, parameters);

        sql = "INSERT INTO transaction_subcategory_user_xref (subcategory_id, user_id) VALUES (?, ?)";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setInt(1, subcategoryIdsToSaveArray[i]);
                ps.setInt(2, userId);
            }

            @Override
            public int getBatchSize() {
                return subcategoryIdsToSaveArray.length;
            }
        });
    }

    private TransactionSubcategory mapRowToSubcategory(SqlRowSet rs) {
        TransactionSubcategory subcategory = new TransactionSubcategory();
        subcategory.setId(rs.getInt("id"));
        subcategory.setName(rs.getString("name"));
        subcategory.setCategoryId(rs.getInt("category_id"));
        subcategory.setDetailedName(rs.getString("detailed_name"));
        subcategory.setDescription(rs.getString("description"));
        try {
            subcategory.setActive(rs.getBoolean("isActive"));
        } catch (Exception e) {
            // Handle exception or ignore if "isActive" column is optional
        }
        try {
            subcategory.setTotal(rs.getDouble("total"));
        } catch (Exception e) {
            // Handle exception or ignore if "total" column is optional
        }
        return subcategory;
    }
}
