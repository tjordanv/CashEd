package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.TransactionSubcategory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

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
                "JOIN transaction_subcategory_user_xref sx ON s.id = sx.subcategory_id AND user_id = ? AND is_deleted = false";
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
        String sql = "SELECT id, name, category_id, detailed_name, description, is_deleted, " +
                "CASE WHEN sx.subcategory_id IS NOT NULL AND is_deleted = false THEN true ELSE false END AS isActive " +
                "FROM transaction_subcategories s " +
                "LEFT JOIN transaction_subcategory_user_xref sx ON s.id = sx.subcategory_id AND user_id = ? AND is_deleted = false";
        int userId = userDao.getUserIdByUsername(principal);

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        List<TransactionSubcategory> subcategories = new ArrayList<>();

        while (results.next()) {
            subcategories.add(mapRowToSubcategory(results));
        }
        return subcategories;
    }

    private TransactionSubcategory mapRowToSubcategory(SqlRowSet rs) {
        TransactionSubcategory subcategory = new TransactionSubcategory();
        subcategory.setId(rs.getInt("id"));
        subcategory.setName(rs.getString("name"));
        subcategory.setCategoryId(rs.getInt("category_id"));
        subcategory.setDetailedName(rs.getString("detailed_name"));
        subcategory.setDescription(rs.getString("description"));
        if (rs.findColumn("is_deleted") > 0) {
            subcategory.setDeleted(rs.getBoolean("is_deleted"));
        }
        if (rs.findColumn("isActive") > 0) {
            subcategory.setActive(rs.getBoolean("isActive"));
        }
        return subcategory;
    }
}
