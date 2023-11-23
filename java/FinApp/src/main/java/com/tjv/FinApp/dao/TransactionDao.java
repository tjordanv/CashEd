package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Transaction;

import java.util.List;

public interface TransactionDao {
    List<Transaction> getTransactions();
    boolean saveTransactions(List<Transaction> transactions);
    List<Transaction> getCurrentMonthTransactions();
    List<Transaction> getCurrentMonthTransactions(String accountIds);
}
