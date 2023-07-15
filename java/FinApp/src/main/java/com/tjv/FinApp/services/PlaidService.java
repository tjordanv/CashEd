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
//    public String plaidToken() throws Exception {
//        String accessToken = "not found";
//        SandboxPublicTokenCreateRequest requestt = new SandboxPublicTokenCreateRequest()
//                .institutionId("ins_109508")
//                .initialProducts(Arrays.asList(Products.AUTH));
//
//        Response<SandboxPublicTokenCreateResponse> createResponse = plaidClient
//                .sandboxPublicTokenCreate(requestt)
//                .execute();
//
//        log.info("public token " +createResponse);
//
//        ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest().publicToken(createResponse.body().getPublicToken());
//        Response<ItemPublicTokenExchangeResponse> response = plaidClient.itemPublicTokenExchange(request).execute();
//
//        if (response.isSuccessful()) {
//            accessToken = response.body().getAccessToken();
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
    public String plaidToken() throws Exception {
        String clientUserId = "user-id";

        LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser()
                .clientUserId(clientUserId)
                .legalName("legal name")
                .phoneNumber("4155558888")
                .emailAddress("email@address.com");

        DepositoryFilter types = new DepositoryFilter()
                .accountSubtypes(Arrays.asList(DepositoryAccountSubtype.CHECKING));

        LinkTokenAccountFilters accountFilters = new LinkTokenAccountFilters()
                .depository(types);

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("FinApp")
                .products(Arrays.asList(Products.AUTH))
                .countryCodes(Arrays.asList(CountryCode.US))
                .language("en")
                .redirectUri("https://domainname.com/oauth-page.html")
//                .webhook("https://example.com/webhook")
                .linkCustomizationName("default")
                .accountFilters(accountFilters);

        Response<LinkTokenCreateResponse> response = plaidClient
                .linkTokenCreate(request)
                .execute();

        log.info("public token " +response);

        String linkToken = response.body().getLinkToken();

        return linkToken;
    }

    /**
     * Hit transactions/get api to get Transaction Information.
     * @return
     * @throws Exception
     */
    public TransactionsGetResponse transactions() throws Exception {
        LocalDate startDate = LocalDate.ofEpochDay(02-02-2023);
        LocalDate endDate = LocalDate.ofEpochDay(07-06-2023);
        String accessToken = plaidToken();
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

    /**
     * Hit accounts/balance/get api
     * @return
     * @throws Exception
     */
    public AccountBalance accountBalance() throws Exception {
        String accessToken = plaidToken();
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