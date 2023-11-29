package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TransactionDao;
import com.tjv.FinApp.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class TransactionController {
    @Autowired
    private TransactionDao transactionDao;

    @PostMapping("/saveTransactions")
    public boolean saveTransactions(@RequestBody List<Transaction> transactions) {
        return transactionDao.saveTransactions(transactions);
    }
    @GetMapping("/getCurrentMonthTransactions")
    public List<Transaction> getCurrentMonthTransactions(@RequestParam(required = false) String accountIds, Principal principal) {
        if (accountIds != null) {
            return transactionDao.getCurrentMonthTransactions(accountIds, principal);
        }

        return transactionDao.getCurrentMonthTransactions(principal);
    }
}
