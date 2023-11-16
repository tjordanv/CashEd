package com.tjv.FinApp.controller;

import com.tjv.FinApp.dao.TransactionDao;
import com.tjv.FinApp.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

}
