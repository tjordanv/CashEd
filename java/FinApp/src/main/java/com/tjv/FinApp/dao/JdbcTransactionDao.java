package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Transaction;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Service
public class JdbcTransactionDao implements TransactionDao{
    private final JdbcTemplate jdbcTemplate;

    public JdbcTransactionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Transaction> getTransactions() {
        return null;
    }

    @Override
    public boolean saveTransactions(List<Transaction> transactions) {
        String sql = "INSERT INTO transactions (transaction_id, account_id, user_id, subcategory_id, name, description, date, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Transaction transaction = transactions.get(i);
                ps.setString(1, transaction.getTransactionId());
                ps.setInt(2, transaction.getAccountId());
                ps.setInt(3, transaction.getUserId());
                ps.setInt(4, transaction.getSubcategoryId());
                ps.setString(5, transaction.getName());
                ps.setString(6, transaction.getDescription());
                ps.setDate(7, Date.valueOf(transaction.getDate()));
                ps.setDouble(8, transaction.getAmount());
            }

            @Override
            public int getBatchSize() {
                return transactions.size();
            }
        });
        return false;
    }
}
