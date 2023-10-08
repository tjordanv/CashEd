package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.ContactInfo;
import com.tjv.FinApp.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class JdbcContactInfoDao implements ContactInfoDao {
    private final JdbcTemplate jdbcTemplate;
    private UserDao userDao;

    public JdbcContactInfoDao(JdbcTemplate jdbcTemplate, UserDao userDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.userDao = userDao;
    }

    @Override
    public ContactInfo saveContactInfo(ContactInfo contactInfo) {
        boolean isActiveUser = contactInfo.isActiveUser();

        // Create contact info xref in the DB for users
        if (isActiveUser) {
            User user = userDao.findByUsername(contactInfo.getUsername());
            contactInfo.setFirstName(user.getFirstName());
            contactInfo.setLastName(user.getLastName());
            contactInfo.setEmailAddress(user.getEmail());

            String sql = "INSERT INTO contact_info (is_active_user, first_name, last_name, message) " +
                    "values (?, ?, ?, ?) returning id";

            Integer contactInfoId = jdbcTemplate.queryForObject(sql, Integer.class, true, contactInfo.getFirstName(), contactInfo.getLastName(), contactInfo.getMessage());

            sql = "INSERT INTO contact_info_user_xref (contact_info_id, user_id) " +
                    "values (?, ?)";

            jdbcTemplate.update(sql, contactInfoId, user.getId());
        }
        // Create contact info and a new email in the DB for non-users
        else  {
            String sql = "INSERT INTO contact_info (is_active_user, first_name, last_name, message) " +
                    "values (?, ?, ?, ?) returning id";

            Integer contactInfoId = jdbcTemplate.queryForObject(sql, Integer.class, false, contactInfo.getFirstName(), contactInfo.getLastName(), contactInfo.getMessage());

            Integer emailAddressId = userDao.createEmailAddress(contactInfo.getEmailAddress(), false);

            sql = "INSERT INTO contact_info_email_address_xref (contact_info_id, email_address_id) " +
                    "values (?, ?)";

            jdbcTemplate.update(sql,contactInfoId, emailAddressId);
        }

        return contactInfo;
    }

}
