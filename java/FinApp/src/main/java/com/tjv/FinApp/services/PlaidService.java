// Dev version

//package com.tjv.FinApp.services;
//
//import com.google.gson.Gson;
////import com.plaid.client.model;
//import com.plaid.client.model.*;
//import com.plaid.client.request.PlaidApi;
//
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import retrofit2.Response;
//
//import java.time.LocalDate;
//import java.util.Arrays;
//import java.util.Date;
//
//
//@Service
//public class PlaidService {
//    Logger log = LoggerFactory.getLogger(PlaidService.class);
//
//    @Autowired
//    private PlaidApi plaidClient;
//    String Acctkn = null;
//    public String pliadAccessToken(String ptkn) throws Exception {
//        String accessToken = "not got";
//
//        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(ptkn);
//        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();
//
//        if (response.isSuccessful()) {
//            this.Acctkn =  accessToken = response.body().getAccessToken();
//        }
//
//        try {
//            Gson gson = new Gson();
//            PlaidError error = gson.fromJson(response.errorBody().string(), PlaidError.class);
//            log.info(error.toString());
//        } catch (Exception e) {
//            log.info("exception: "+e);
//        }
//        return accessToken;
//    }
//
//    public String pliadToken() throws Exception {
//
//        String clientUserId = Long.toString((new Date()).getTime());
//
//        LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser()
//                .clientUserId(clientUserId);
//
//        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
//                .user(user)
//                .clientName("client name")
//                .products(Arrays.asList(Products.TRANSACTIONS))
//                .countryCodes(Arrays.asList(CountryCode.US))
//                .language("en");
//
//        Response<LinkTokenCreateResponse> response = plaidClient
//                .linkTokenCreate(request)
//                .execute();
//
//        System.out.println("token response " +response.body().getLinkToken());
//        return response.body().getLinkToken();
//
//    }
//
//    public TransactionsGetResponse transactions(String ptkn) throws Exception {
//        LocalDate startDate = LocalDate.ofEpochDay(02-02-2023);
//        LocalDate endDate = LocalDate.ofEpochDay(07-06-2023);
//        String accessToken = pliadAccessToken(ptkn);
//
//        AccountsGetRequest agRequest = new AccountsGetRequest()
//                .accessToken(accessToken);
//
//        Response<AccountsGetResponse> accountsGetResponse = plaidClient
//                .accountsGet(agRequest)
//                .execute();
//        log.info("account response "+accountsGetResponse);
//        String someAccountId = accountsGetResponse
//                .body()
//                .getAccounts()
//                .get(0)
//                .getAccountId();
//        log.info("account id: "+someAccountId );
//        int numTxns = 2;
//        TransactionsGetRequestOptions options = new TransactionsGetRequestOptions()
//                .accountIds(Arrays.asList(someAccountId))
//                .count(numTxns)
//                .offset(1);
//        TransactionsGetRequest request = new TransactionsGetRequest()
//                .accessToken(accessToken)
//                .startDate(startDate)
//                .endDate(endDate)
//                .options(options);
//        Response<TransactionsGetResponse> apiResponse = null;
//        for (int i = 0; i < 5; i++) {
//            apiResponse = plaidClient.transactionsGet(request).execute();
//            if (apiResponse.isSuccessful()) {
//                log.info("transaction response: "+apiResponse);
//                break;
//            }
//        }
//        return apiResponse.body();
//    }
//
//    public AccountBalance accountBalance(String ptkn) throws Exception {
//        String accessToken = pliadAccessToken(ptkn);
//
//        AccountsBalanceGetRequest request = new AccountsBalanceGetRequest()
//                .accessToken(accessToken);
//        Response<AccountsGetResponse> response = plaidClient
//                .accountsBalanceGet(request)
//                .execute();
//        log.info("account balance: "+response);
//        String accountId = response.body().getAccounts().get(0).getAccountId();
//        AccountsBalanceGetRequestOptions options = new AccountsBalanceGetRequestOptions()
//                .accountIds(Arrays.asList(accountId));
//        request.setOptions(options);
//        response = plaidClient.accountsBalanceGet(request).execute();
//
//        return response.body().getAccounts().get(0).getBalances();
//    }
//}
//

// Sandbox version

package com.tjv.FinApp.services;

import com.google.gson.Gson;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import com.tjv.FinApp.dao.UserDao;
import com.tjv.FinApp.model.Account;
import com.tjv.FinApp.model.PlaidToken;
import com.tjv.FinApp.model.Transaction;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.security.Principal;
import java.sql.*;
import java.time.LocalDate;
import java.util.*;

import static com.tjv.FinApp.utils.ArrayUtils.StringToIntArray;

@Service
public class PlaidService {
    Logger log = LoggerFactory.getLogger(PlaidService.class);
    private final UserDao userDao;
    private final JdbcTemplate jdbcTemplate;

//    @Autowired
    private PlaidApi plaidClient;

    public PlaidService(UserDao userDao, JdbcTemplate jdbcTemplate, PlaidApi plaidClient) {
        this.userDao = userDao;
        this.jdbcTemplate = jdbcTemplate;
        this.plaidClient = plaidClient;
    }

    /**
     * Creates a link token for initializing the Plaid Link flow. This represents a unique session for a user.
     *
     * @return The generated link token.
     * @throws Exception if an error occurs while creating the link token.
     */
    public String createLinkToken(Principal principal) throws Exception {
        int userId = userDao.getUserIdByUsername(principal);
        LinkTokenCreateRequestUser user =  new LinkTokenCreateRequestUser()
                .clientUserId(String.valueOf(userId));

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("CashEd Financial")
                .products(Arrays.asList(Products.TRANSACTIONS))
                .countryCodes(Arrays.asList(CountryCode.US))
                .language("en")
                .redirectUri("http://localhost:3000/");

        Response<LinkTokenCreateResponse> response = plaidClient
                .linkTokenCreate(request)
                .execute();

        return response.body().getLinkToken();
    }

    /**
     * Exchanges a public token (a short-lived token whose purpose is to securely transmit the user's selected financial
     * institution and their consent to access their financial data to our backend server.) for an access token (The access
     * token is a long-lived token that provides authorized access to the user's financial data.)
     *
     * @param token The public token to exchange.
     * @return The access token.
     * @throws Exception if an error occurs while exchanging the public token.
     */
    public List<Account> exchangePublicToken(Principal principal, String token) throws Exception {
        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(token);
        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();
        System.out.println(token);
        String accessToken = "not found";

        if (response.isSuccessful()) {
            accessToken = response.body().getAccessToken();
        }
        int userId = userDao.getUserIdByUsername(principal);
        System.out.println("token: " + accessToken + "\nuser id: " +  userId);

        String sql = "INSERT INTO access_tokens (token, user_id) VALUES (?, ?) RETURNING ID";

        Integer tokenId = jdbcTemplate.queryForObject(sql, Integer.class, accessToken, userId);

        AccountsGetRequest accReq = new AccountsGetRequest().accessToken(accessToken);
        Response<AccountsGetResponse> accResp = plaidClient.accountsGet(accReq).execute();

        List<AccountBase> accounts = accResp.body().getAccounts();
        List<Account> accts = new ArrayList<>();
        Item item = test(accessToken);
        Institution inst = test2(item.getInstitutionId());

        String insertAccountQuery = "INSERT INTO accounts (account_id, access_token_id, user_id, name, official_name, mask, subtype_id, logo_id) VALUES (?, ?, ?, ?, ?, ?,(SELECT id FROM account_subtypes WHERE name = ?), ?) RETURNING id";
        String accountCheckQuery = "SELECT id from accounts where account_id = ? and is_deleted = false";
        String getLogoQuery = "SELECT id from logos where logo = ?";
        String insertLogoQuery = "INSERT INTO logos (logo) VALUES (?) returning id";

        for (AccountBase account : accounts) {
            SqlRowSet isExistingAccount = jdbcTemplate.queryForRowSet(accountCheckQuery, account.getAccountId());

            if (!isExistingAccount.next()) {
                SqlRowSet isExistingLogo = jdbcTemplate.queryForRowSet(getLogoQuery, inst.getLogo());
                int logoId;
                if (isExistingLogo.next()) {
                    logoId = isExistingLogo.getInt("id");
                } else {
                    logoId = jdbcTemplate.queryForObject(insertLogoQuery, Integer.class, inst.getLogo());
                }

                int accountId = jdbcTemplate.queryForObject(insertAccountQuery, Integer.class, account.getAccountId(), tokenId, userId,
                        account.getName(), account.getOfficialName(), account.getMask(), account.getSubtype().getValue(), logoId);

                Account acc = new Account();
                acc.setId(accountId);
                acc.setAccountId(account.getAccountId());
                acc.setName(account.getName());
                acc.setOfficialName(account.getOfficialName());
                acc.setMask(account.getMask());
                acc.setSubtype(account.getSubtype().getValue());
                acc.setNickname("");
                acc.setLogo(inst.getLogo());

                accts.add(acc);
            }
        }

        try {
            Gson gson = new Gson();
            PlaidError error = gson.fromJson(response.errorBody().string(), PlaidError.class);
            log.info(error.toString());
        } catch (Exception ignored) {
        }
        return accts;
    }

    public List<Account> getAccounts(Principal principal) {
        String sql = "SELECT a.id as accountId, account_id, a.name as account_name, mask, official_name, nickname, logo, s.name as subtype_name FROM accounts a LEFT JOIN logos l ON a.logo_id = l.id LEFT JOIN account_subtypes s on a.subtype_id = s.id WHERE user_id = ? AND is_deleted = false";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userDao.getUserIdByUsername(principal));
        List<Account> accounts = new ArrayList<>();
        while(results.next()) {
            Account account = mapRowToAccount(results);
            accounts.add(account);
        }
        return accounts;
    }
    public List<Account> getAccounts(String accountIds, int accessTokenId) {
        int[] ids = StringToIntArray(accountIds);
        String sql = "SELECT a.id as accountId, account_id, a.name as account_name, mask, official_name, nickname, logo, s.name as subtype_name FROM accounts a LEFT JOIN logos l ON a.logo_id = l.id LEFT JOIN account_subtypes s on a.subtype_id = s.id WHERE a.id = ANY(:ids) AND access_token_id = (:accessTokenId) AND is_deleted = false";
        SqlParameterSource namedParameters = new MapSqlParameterSource().addValue("ids", ids, Types.ARRAY).addValue("accessTokenId", accessTokenId, Types.INTEGER);

        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate.getDataSource());

        SqlRowSet results = namedParameterJdbcTemplate.queryForRowSet(sql, namedParameters);
        List<Account> accounts = new ArrayList<>();
        while(results.next()) {
            Account account = mapRowToAccount(results);
            accounts.add(account);
        }
        return accounts;
    }
    public boolean deleteAccount(int id) {
        String sql = "UPDATE accounts SET is_deleted = true, deleted_date = now() where id = ?";
        try {
            jdbcTemplate.update(sql,id);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
    public boolean updateAccount(int id, String nickname) {
        String sql = "UPDATE accounts SET nickname = ? where id = ?";
        try {
            jdbcTemplate.update(sql, nickname, id);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
    public List<PlaidToken> getAccessTokens(Principal principal) {
        int userId = userDao.getUserIdByUsername(principal);
        String sql = "SELECT id, token FROM access_tokens WHERE user_id = ? AND is_deleted = false";
        List<PlaidToken> tokens = new ArrayList<>();

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                PlaidToken token = new PlaidToken();
                token.setId(results.getInt("id"));
                token.setToken(results.getString("token"));
                token.setTokenType("access token");
                token.setUserId(userId);

                tokens.add(token);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return tokens;
    }
    public List<PlaidToken> getAccessTokens(String accountIds, Principal principal) {
        int userId = userDao.getUserIdByUsername(principal);
        String sql = "SELECT at.id, token FROM access_tokens at JOIN accounts a on at.id = a.access_token_id WHERE at.user_id = :userId AND at.is_deleted = false AND a.id = ANY(:accountIds)";
        int[] ids = StringToIntArray(accountIds);
        SqlParameterSource namedParameters = new MapSqlParameterSource()
                .addValue("accountIds", ids, Types.ARRAY)
                .addValue("userId", userId, Types.INTEGER);
        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate.getDataSource());
        List<PlaidToken> tokens = new ArrayList<>();
        try {
            SqlRowSet results = namedParameterJdbcTemplate.queryForRowSet(sql, namedParameters);
            while (results.next()) {
                PlaidToken token = new PlaidToken();
                token.setId(results.getInt("id"));
                token.setToken(results.getString("token"));
                token.setTokenType("access token");
                token.setUserId(userId);

                tokens.add(token);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return tokens;
    }
    /**
     * Retrieves transactions for a given access token.
     *
     * @param accessToken The access token associated with a particular bank.
     * @return The transactions.
     * @throws Exception if an error occurs while retrieving the transactions.
     */
    public List<Transaction> getTransactions(String accountIds, @NotNull PlaidToken accessToken) throws Exception {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(1);

        //String accessToken = this.getAccessToken(principal);
//        AccountsGetRequest agRequest = new AccountsGetRequest()
//                .accessToken(accessToken.getToken());
//
//        Response<AccountsGetResponse> accountsGetResponse = plaidClient
//                .accountsGet(agRequest)
//                .execute();
//        log.info("account response "+accountsGetResponse);

        List<Account> accounts = this.getAccounts(accountIds, accessToken.getId());
        Map<String, Integer> accountsMap = new HashMap<>();
        for(Account account : accounts) {
            accountsMap.put(account.getAccountId(), account.getId());
        }
        List<String> ids = new ArrayList<>(accountsMap.keySet());

        TransactionsGetRequestOptions options = new TransactionsGetRequestOptions()
                .accountIds(ids);
                //.count(numTxns)
                //.offset(1);
        TransactionsGetRequest request = new TransactionsGetRequest()
                .accessToken(accessToken.getToken())
                .startDate(startDate)
                .endDate(endDate)
                .options(options);
        Response<TransactionsGetResponse> apiResponse = null;
        for (int i = 0; i < 5; i++) {
            apiResponse = plaidClient.transactionsGet(request).execute();
            if (apiResponse.isSuccessful()) {
                log.info("transaction response: "+apiResponse);
                break;
            } else {
                Gson gson = new Gson();
                PlaidError error = gson.fromJson(apiResponse.errorBody().string(), PlaidError.class);
                log.info(error.toString());
                //System.out.println(apiResponse.errorBody());
            }
        }
//        System.out.println("\nanother account trnas\n");
//        System.out.println(apiResponse.body().getTransactions());
        List<Transaction> transactions = new ArrayList<>();
        String[] transactionIds = new String[apiResponse.body().getTransactions().size()];
        int index = 0;
        for (com.plaid.client.model.Transaction transaction : apiResponse.body().getTransactions()) {
            Transaction newTransaction = mapRowToTransaction(transaction, accessToken.getUserId(), accountsMap.get(transaction.getAccountId()));
            transactions.add(newTransaction);
            transactionIds[index] = newTransaction.getTransactionId();
            index++;
        }

        String sql = "SELECT transaction_id FROM transactions WHERE transaction_id = ANY(:transactionIds)";
        SqlParameterSource namedParameters = new MapSqlParameterSource().addValue("transactionIds", transactionIds, Types.ARRAY);

        NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate.getDataSource());

        SqlRowSet results = namedParameterJdbcTemplate.queryForRowSet(sql, namedParameters);

        while (results.next()) {
            String transactionId = results.getString("transaction_id");
            for (int i = 0; i < transactions.size(); i++) {
                if (transactions.get(i).getTransactionId().equals(transactionId)) {
                    System.out.println("found  it");
                    transactions.remove(i);
                    break;
                }
            }
        }
        return transactions;
    }
    /**
     * Retrieves the account balance for a given access token.
     *
     * @param accessToken The access token associated with a particular bank.
     * @return The account balance.
     * @throws Exception if an error occurs while retrieving the account balance.
     */
    public AccountBalance accountBalance(String accessToken) throws Exception {
        AccountsBalanceGetRequest request = new AccountsBalanceGetRequest()
                .accessToken(accessToken);
        Response<AccountsGetResponse> response = plaidClient
                .accountsBalanceGet(request)
                .execute();
        log.info("account balance: "+response);
        String accountId = response.body().getAccounts().get(0).getAccountId();
        AccountsBalanceGetRequestOptions options = new AccountsBalanceGetRequestOptions()
                .accountIds(Arrays.asList(accountId));
        request.setOptions(options);
        response = plaidClient.accountsBalanceGet(request).execute();

        return response.body().getAccounts().get(0).getBalances();
    }

    public Item test(String accessToken) throws IOException {
        ItemGetRequest request = new ItemGetRequest()
                .accessToken(accessToken);
        Response<ItemGetResponse> response = plaidClient.itemGet(request).execute();
        return response.body().getItem();
    }

    public Institution test2(String institutionId) throws IOException {
        CountryCode countryCode = CountryCode.US;
        InstitutionsGetByIdRequestOptions options = new InstitutionsGetByIdRequestOptions()
                .includeOptionalMetadata(true);
    InstitutionsGetByIdRequest request = new InstitutionsGetByIdRequest()
            .institutionId(institutionId)
            .options(options)
            .addCountryCodesItem(countryCode);
    Response<InstitutionsGetByIdResponse> response = plaidClient
            .institutionsGetById(request)
            .execute();
    return  response.body().getInstitution();
    }
    public Account mapRowToAccount(SqlRowSet rs) {
        Account account = new Account();
        account.setId(rs.getInt("accountId"));
        account.setAccountId(rs.getString("account_id"));
        account.setName(rs.getString("account_name"));
        account.setMask(rs.getString("mask"));
        if (rs.findColumn("official_name") > 0) {
            account.setOfficialName(rs.getString("official_name"));
        }
        if (rs.findColumn("nickname") > 0) {
            String nickname = rs.getString("nickname");
            account.setNickname(nickname != null ? nickname : "");
        }
        account.setLogo(rs.getString("logo"));
        account.setSubtype(rs.getString("subtype_name"));

        return account;
    }

   public Transaction mapRowToTransaction(com.plaid.client.model.Transaction transaction, int userId, int accountId) {
       int paymentChannelId = 0;
       switch (transaction.getPaymentChannel().getValue()) {
           case "online" -> paymentChannelId = 1;
           case "in store" -> paymentChannelId = 2;
           case "other" -> paymentChannelId = 3;
           default -> {
           }
       }

        Transaction newTransaction = new Transaction();
        newTransaction.setTransactionId(transaction.getTransactionId());
       newTransaction.setAccountId(accountId);
       newTransaction.setUserId(userId);
       newTransaction.setName(transaction.getName());
       newTransaction.setDescription(transaction.getOriginalDescription());
       newTransaction.setMerchantLogoUrl(transaction.getLogoUrl());
       newTransaction.setMerchantWebsite(transaction.getWebsite());
       newTransaction.setDate(transaction.getDate());
       newTransaction.setAmount(transaction.getAmount());
       newTransaction.setPaymentChannelId(paymentChannelId);
       newTransaction.setCheckNumber(transaction.getCheckNumber());
       //newTransaction.setPaymentMeta()
//       newTransaction.setAddress();
//       newTransaction.setCity();
//       newTransaction.setRegion();
//       newTransaction.setPostalCode();
//       newTransaction.setCountry();

       return newTransaction;
   }
}