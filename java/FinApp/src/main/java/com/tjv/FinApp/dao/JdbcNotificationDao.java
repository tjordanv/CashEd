package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Notification;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JdbcNotificationDao implements NotificationDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcNotificationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Notification> getUnreadNotificationsByUser(int id) {
        List<Notification> notifications = new ArrayList<>();
        String sql = "SELECT id, category_id, urgency_level, message, is_read, is_protected " +
                "FROM notifications n " +
                "JOIN user_notifications_xref nx on n.id = nx.notification_id " +
                "WHERE nx.user_id = ? " +
                "AND is_read = false";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        while(results.next()) {
            Notification notification = mapRowToNotification(results);
            notifications.add(notification);
        }
        return notifications;
    }

    @Override
    public Map<Integer, Integer> getUnreadNotificationsByUserByCategory(int id) {
        Map<Integer, Integer> notifications = new HashMap<>();
        String sql = "SELECT id, count(id) as total " +
                "FROM notifications n " +
                "JOIN user_notifications_xref nx on n.id = nx.notification_id " +
                "WHERE nx.user_id = ? " +
                "AND is_read = false " +
                "GROUP BY n.category_id";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        while(results.next()) {
            int categoryId = results.getInt("category_id");
            int count = results.getInt("count");
            notifications.put(categoryId, count);
        }
        return notifications;
    }

    public Notification mapRowToNotification(SqlRowSet rs) {
        Notification notification = new Notification();
        notification.setId(rs.getInt("id"));
        notification.setCategoryId(rs.getInt("category_id"));
        notification.setUrgencyLevel(rs.getInt("urgency_level"));
        notification.setMessage(rs.getString("message"));
        notification.setRead(rs.getBoolean("is_read"));
        notification.setProtected(rs.getBoolean("is_protected"));

        return notification;
    }
}
