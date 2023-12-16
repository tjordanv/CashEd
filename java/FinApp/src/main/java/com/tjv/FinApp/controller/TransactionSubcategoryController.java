package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TransactionSubcategoryDao;
import com.tjv.FinApp.model.TransactionSubcategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
