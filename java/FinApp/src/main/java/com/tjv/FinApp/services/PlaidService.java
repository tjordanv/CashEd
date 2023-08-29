package com.tjv.FinApp.services;

import com.google.gson.Gson;
//import com.plaid.client.model;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.time.LocalDate;
import java.util.Arrays;

import java.util.Date;

@Service
public class PlaidService {
    Logger log = LoggerFactory.getLogger(PlaidService.class);

    @Autowired
    private PlaidApi plaidClient;
    String Acctkn = null;
    public String pliadAccessToken(String ptkn) throws Exception {
        String accessToken = "not got";

        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(ptkn);
        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();

        if (response.isSuccessful()) {
            this.Acctkn =  accessToken = response.body().getAccessToken();
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

    public String pliadToken() throws Exception {

        String clientUserId = Long.toString((new Date()).getTime());

        LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser()
                .clientUserId(clientUserId);

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("client name")
                .products(Arrays.asList(Products.AUTH))
                .countryCodes(Arrays.asList(CountryCode.US))
                .language("en");

        Response<LinkTokenCreateResponse> response = plaidClient
                .linkTokenCreate(request)
                .execute();
        System.out.println("token response " +response.body().getLinkToken());
        return response.body().getLinkToken();

    }

    public TransactionsGetResponse transactions(String ptkn) throws Exception {
        LocalDate startDate = LocalDate.ofEpochDay(02-02-2023);
        LocalDate endDate = LocalDate.ofEpochDay(07-06-2023);
        String accessToken = pliadAccessToken(ptkn);

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
        int numTxns = 2;
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

    public AccountBalance accountBalance(String ptkn) throws Exception {
        String accessToken = pliadAccessToken(ptkn);

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

