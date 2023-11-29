package com.tjv.FinApp.dao;

import com.tjv.FinApp.model.Transaction;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import static com.tjv.FinApp.utils.ArrayUtils.StringToIntArray;

@Service
public class JdbcTransactionDao implements TransactionDao{
    private final JdbcTemplate jdbcTemplate;
    private final UserDao userDao;

    public JdbcTransactionDao(JdbcTemplate jdbcTemplate, UserDao userDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.userDao = userDao;
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

    @Override
    public List<Transaction> getCurrentMonthTransactions(Principal principal) {
        String sql = "SELECT id, transaction_id, account_id, user_id, subcategory_id, name, description, merchant_logo_url, merchant_website, date, amount," +
                "payment_channel_id, check_number, address, city, region, postal_code, country, created_date " +
                "FROM transactions WHERE user_id = ? AND is_deleted = false AND date BETWEEN ? AND NOW()";

        int userId = userDao.getUserIdByUsername(principal);
        LocalDate startOfMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId, startOfMonth);

        List<Transaction> transactions = new ArrayList<>();
        while (results.next()) {
            transactions.add(mapRowToTransaction(results));
        }

        return transactions;
    }

    @Override
    public List<Transaction> getCurrentMonthTransactions(String accountIds, Principal principal) {
       int[] accountIdsArray = StringToIntArray(accountIds);

        int userId = userDao.getUserIdByUsername(principal);
        LocalDate startOfMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());

        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("accountIds", accountIdsArray, Types.ARRAY)
                .addValue("userId", userId, Types.INTEGER)
                .addValue("startDate", startOfMonth, Types.DATE);

        String sql = "SELECT id, transaction_id, account_id, user_id, subcategory_id, name, description, merchant_logo_url, merchant_website, date, amount," +
                "payment_channel_id, check_number, address, city, region, postal_code, country, created_date " +
                "FROM transactions WHERE user_id = :userId AND is_deleted = false AND date BETWEEN :startDate AND NOW() AND account_id = ANY(:accountIds)";

        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate.getDataSource());
        SqlRowSet results = namedParameterJdbcTemplate.queryForRowSet(sql,namedParameters);

        List<Transaction> transactions = new ArrayList<>();
        while (results.next()) {
            transactions.add(mapRowToTransaction(results));
        }

        return transactions;
    }

    private Transaction mapRowToTransaction(SqlRowSet rs) {
        Transaction transaction = new Transaction();
        transaction.setId(rs.getInt("id"));
        transaction.setTransactionId(rs.getString("transaction_id"));
        transaction.setAccountId(rs.getInt("account_id"));
        transaction.setUserId(rs.getInt("user_id"));
        transaction.setSubcategoryId(rs.getInt("subcategory_id"));
        transaction.setPaymentChannelId(rs.getInt("payment_channel_id"));
        transaction.setName(rs.getString("name"));
        transaction.setDescription(rs.getString("description"));
        transaction.setMerchantLogoUrl(rs.getString("merchant_logo_url"));
        transaction.setMerchantWebsite(rs.getString("merchant_website"));
        transaction.setDate(rs.getDate("date").toLocalDate());
        transaction.setAmount(rs.getDouble("amount"));
        transaction.setCheckNumber(rs.getString("check_number"));
        transaction.setAddress(rs.getString("address"));
        transaction.setCity(rs.getString("city"));
        transaction.setRegion(rs.getString("region"));
        transaction.setPostalCode(rs.getString("postal_code"));
        transaction.setCountry(rs.getString("country"));
        transaction.setCreatedDate(rs.getDate("created_date"));
//        transaction.setDeletedDate(rs.getDate("deleted_date"));
//        transaction.setDeleted(rs.getBoolean("is_deleted"));
        return transaction;
    }
}
