package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.NotificationDao;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.Notification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class NotificationController {
    private final UserDao userDao;
    private final NotificationDao notificationsDao;


    public NotificationController(UserDao userDao, NotificationDao notificationsDao) {
        this.userDao = userDao;
        this.notificationsDao = notificationsDao;
    }

    @GetMapping("/getUnreadNotificationsByUser")
    @ResponseStatus(HttpStatus.OK)
    public List<Notification> getUnreadNotificationsByUser(Principal principal) {
        try {
            int userId = userDao.getUserIdByUsername(principal);
            return userId != 0 ? notificationsDao.getUnreadNotificationsByUser(userId) : null;
        } catch (Exception e) {
            System.out.println("getUnreadNotificationsByUser: error fetching notifications");
        }
        return null;
    }

    @GetMapping("/getUnreadNotificationsByUserByCategory")
    @ResponseStatus(HttpStatus.OK)
    public Map<Integer, Integer> getUnreadNotificationsByUserByCategory(Principal principal) {
        try {
            int userId = userDao.getUserIdByUsername(principal);
            return userId != 0 ? notificationsDao.getUnreadNotificationsByUserByCategory(userId) : null;
        } catch (Exception e) {
            System.out.println("getUnreadNotificationsByUserByCategory: error fetching notifications");
        }
        return null;
    }

    @GetMapping("/getNotificationsByUserByCategory")
    @ResponseStatus(HttpStatus.OK)
    public List<Notification> getNotificationsByUserByCategory(Principal principal, @RequestParam int categoryId) {
        try {
            int userId = userDao.getUserIdByUsername(principal);
            return userId != 0 ? notificationsDao.getNotificationsByUserByCategory(userId, categoryId) : null;
        } catch (Exception e) {
            System.out.println("getNotificationsByUserByCategory: error fetching notifications");
        }
        return null;
    }
}
