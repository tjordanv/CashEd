package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.ContactInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class JdbcContactInfoDao implements ContactInfoDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcContactInfoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean saveContactInfo(ContactInfo contactInfo) {
        String sql = "INSERT INTO contact_info (is_active_user, first_name, last_name, message) " +
                "values (?, ?, ?, ?) returning id";

        Integer id = jdbcTemplate.queryForObject(sql, Integer.class, contactInfo.isActiveUser(), contactInfo.getFirstName(), contactInfo.getLastName(), contactInfo.getMessage());

        return id != null;
    }
}
