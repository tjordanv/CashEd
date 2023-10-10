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

// Sanbox version

package com.tjv.FinApp.services;

import com.google.gson.Gson;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.time.LocalDate;
import java.util.Arrays;

@Service
public class PlaidService {
    Logger log = LoggerFactory.getLogger(PlaidService.class);

    @Autowired
    private PlaidApi plaidClient;

    /**
     * get Plaid access token
     * @return accessToken
     * @throws Exception
     */
    public String pliadToken() throws Exception {
        String accessToken = "not found";
        SandboxPublicTokenCreateRequest requestt = new SandboxPublicTokenCreateRequest()
                .institutionId("ins_109509")
                .initialProducts(Arrays.asList(Products.TRANSACTIONS));

        Response<SandboxPublicTokenCreateResponse> createResponse = plaidClient
                .sandboxPublicTokenCreate(requestt)
                .execute();

        log.info("public token " +createResponse);

        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(createResponse.body().getPublicToken());
        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();

        if (response.isSuccessful()) {
            accessToken = response.body().getAccessToken();
            System.out.println("item id: " + response.body().getItemId());
        }

        try {
            Gson gson = new Gson();
            PlaidError error = gson.fromJson(response.errorBody().string(), PlaidError.class);
            log.info(error.toString());
        } catch (Exception e) {
            log.info("exception: "+e);
        }
        return accessToken;
    }

    public String createToken() throws Exception {
        String accessToken = "not found";
        LinkTokenCreateRequestUser user =  new LinkTokenCreateRequestUser()
                .clientUserId("user-id");

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("CashEd Financial")
                .products(Arrays.asList(Products.TRANSACTIONS))
                .countryCodes(Arrays.asList(CountryCode.US))
                .language("en");

        Response<LinkTokenCreateResponse> response = plaidClient
                .linkTokenCreate(request)
                .execute();

        String linkToken = response.body().getLinkToken();
//        SandboxPublicTokenCreateRequest requestt = new SandboxPublicTokenCreateRequest()
//                .institutionId("ins_109509")
//                .initialProducts(Arrays.asList(Products.TRANSACTIONS));
//
//        Response<SandboxPublicTokenCreateResponse> createResponse = plaidClient
//                .sandboxPublicTokenCreate(requestt)
//                .execute();
//
//        log.info("public token " +createResponse);
//
//        accessToken = createResponse.body().getPublicToken();
        return linkToken;
    }

    public String exchangeToken(String token) throws Exception {
        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(token);
        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();

        String accessToken = "not found";

        if (response.isSuccessful()) {
            accessToken = response.body().getAccessToken();
            System.out.println("item id: " + response.body().getItemId());
        }

        try {
            Gson gson = new Gson();
            PlaidError error = gson.fromJson(response.errorBody().string(), PlaidError.class);
            log.info(error.toString());
        } catch (Exception e) {
            log.info("exception: " + e);
        }
        return accessToken;
    }
    /**
     * Hit transactions/get api to get Transaction Information.
     * @return
     * @throws Exception
     */
    public TransactionsGetResponse transactions(String accessToken) throws Exception {
        LocalDate startDate = LocalDate.of(2020, 10, 1);
        LocalDate endDate = LocalDate.of(2023, 10, 1);
        //String accessToken = pliadToken();
        AccountsGetRequest agRequest = new AccountsGetRequest()
                .accessToken(accessToken);

        Response<AccountsGetResponse> accountsGetResponse = plaidClient
                .accountsGet(agRequest)
                .execute();
        log.info("account response "+accountsGetResponse);
        String someAccountId = accountsGetResponse
                .body()
                .getAccounts()
                .get(0)
                .getAccountId();
        log.info("account id: "+someAccountId );
        int numTxns = 10;
        TransactionsGetRequestOptions options = new TransactionsGetRequestOptions()
                .accountIds(Arrays.asList(someAccountId))
                .count(numTxns)
                .offset(1);
        TransactionsGetRequest request = new TransactionsGetRequest()
                .accessToken(accessToken)
                .startDate(startDate)
                .endDate(endDate)
                .options(options);
        Response<TransactionsGetResponse> apiResponse = null;
        for (int i = 0; i < 5; i++) {
            apiResponse = plaidClient.transactionsGet(request).execute();
            if (apiResponse.isSuccessful()) {
                log.info("transaction response: "+apiResponse);
                break;
            }
        }
        return apiResponse.body();
    }

     /**
     * Hit accounts/balance/get api
     * @return
     * @throws Exception
     */
    public AccountBalance accountBalance(String accessToken) throws Exception {
        //String accessToken = pliadToken();
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
}