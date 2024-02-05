package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Transaction;

import java.security.Principal;
import java.util.List;

public interface TransactionDao {
    List<Transaction> getTransactions();
    boolean saveTransactions(List<Transaction> transactions, Principal principal);
    List<Transaction> getCurrentMonthTransactions(Principal principal);
    List<Transaction> getCurrentMonthTransactions(String accountIds, Principal principal);
}
