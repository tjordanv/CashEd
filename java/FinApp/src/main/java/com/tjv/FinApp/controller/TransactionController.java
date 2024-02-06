package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TransactionDao;
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
public class TransactionController {
    @Autowired
    private TransactionDao transactionDao;

    @PostMapping("/saveTransactions")
    public boolean saveTransactions(@RequestBody List<Transaction> transactions, Principal principal) {
        return transactionDao.saveTransactions(transactions, principal);
    }
    @GetMapping("/getCurrentMonthTransactions")
    public List<Transaction> getCurrentMonthTransactions(@RequestParam(required = false) String accountIds, Principal principal) {
//        if (accountIds != null) {
//            return transactionDao.getCurrentMonthTransactions(accountIds, principal);
//        }
//
//        return transactionDao.getCurrentMonthTransactions(principal);
        return transactionDao.getCurrentMonthTransactions(principal);
    }
    @GetMapping("/getTest")
    public List<TransactionSubcategory> getTest(Principal principal) {
        List<Transaction> transactions = transactionDao.getCurrentMonthTransactions(principal);
        Map<Integer, TransactionSubcategory> subcategoryMap = new HashMap<>();

        for (Transaction transaction : transactions) {
            int subcategoryId = transaction.getSubcategoryId();
            TransactionSubcategory subcategory = subcategoryMap.get(subcategoryId);

            if (subcategory == null) {
                subcategory = new TransactionSubcategory();
                subcategory.setId(subcategoryId);
                subcategory.setCategoryId(transaction.getCategoryId());
                subcategory.setName(transaction.getSubcategoryName());
                subcategory.setTransactions(new ArrayList<>());
                subcategoryMap.put(subcategoryId, subcategory);
            }

            subcategory.addTransaction(transaction);
        }

        List<TransactionSubcategory> subcategories = new ArrayList<>(subcategoryMap.values());
        for (TransactionSubcategory subcategory : subcategories) {
            subcategory.updateTotal();;
        }
        return subcategories;
    }
}
