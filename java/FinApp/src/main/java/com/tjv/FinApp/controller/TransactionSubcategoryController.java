package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TransactionSubcategoryDao;
import com.tjv.FinApp.model.TransactionSubcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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
}
