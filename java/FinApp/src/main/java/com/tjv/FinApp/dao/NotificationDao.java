package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Notification;

import java.util.List;
import java.util.Map;

public interface NotificationDao {
    public List<Notification> getUnreadNotificationsByUser(int id);
    public Map<Integer, Integer> getUnreadNotificationsByUserByCategory(int id);
}
