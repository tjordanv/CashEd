package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TransactionSubcategoryDao;
import com.tjv.FinApp.model.Transaction;
import com.tjv.FinApp.model.TransactionSubcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class TransactionSubcategoryController {
    @Autowired
    private TransactionSubcategoryDao subcategoryDao;

    @GetMapping("/getActiveSubcategoriesByUser")
    public List<TransactionSubcategory> getActiveSubcategoriesByUser(Principal principal) {
        return subcategoryDao.getActiveSubcategoriesByUser(principal);
    }
    @GetMapping("/getSubcategoriesByUser")
    public List<TransactionSubcategory> getSubcategoriesByUser(Principal principal) {
        return subcategoryDao.getSubcategoriesByUser(principal);
    }
    @PostMapping("/updateUserSubcategories")
    public void updateUserSubcategories(Principal principal, @RequestParam String subcategoryIdsToSave, @RequestParam String subcategoryIdsToDelete) {
        subcategoryDao.updateUserSubcategories(principal, subcategoryIdsToSave, subcategoryIdsToDelete);
    }
    @GetMapping("/getTest2")
    public List<TransactionSubcategory> getTest(Principal principal, @RequestParam int month, @RequestParam int year) {
        return subcategoryDao.getSubcategoriesByMonth(principal, month, year);
    }
}
