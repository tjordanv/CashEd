// Dev version

//package com.tjv.FinApp.config;
//
//import com.plaid.client.ApiClient;
//import com.plaid.client.request.PlaidApi;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.HashMap;
//
//@Configuration
//public class PlaidClientConfig {
//    @Value("${PLAID_CLIENT_ID}")
//    private String clientId;
//    @Value("${PLAID_SECRET}")
//    private String secret;
//
//    @Bean
//    public PlaidApi plaidClient() {
//        PlaidApi plaidClient = null;
//        HashMap<String, String> apiKeys = new HashMap<String, String>();
//        apiKeys.put("clientId", clientId);
//        apiKeys.put("secret", secret);
//        ApiClient apiClient = new ApiClient(apiKeys);
//        apiClient.setPlaidAdapter(ApiClient.Development); // or equivalent, depending on which environment you're calling into
//        plaidClient = apiClient.createService(PlaidApi.class);
//        return plaidClient;
//    }
//}

// Sandbox version
package com.tjv.FinApp.config;

import com.plaid.client.ApiClient;
import com.plaid.client.request.PlaidApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
public class PlaidClientConfig {
    @Value("${PLAID_CLIENT_ID}")
    private String clientId;
    @Value("${PLAID_SECRET}")
    private String secret;
    /**
     * create been for Plaid client
     * @return plaidClient
     */
    @Bean
    public PlaidApi plaidClient() {
        PlaidApi plaidClient = null;
        HashMap<String, String> apiKeys = new HashMap<String, String>();
        apiKeys.put("clientId", clientId);
        apiKeys.put("secret", secret);
        ApiClient apiClient = new ApiClient(apiKeys);
        apiClient.setPlaidAdapter(ApiClient.Development);
        plaidClient = apiClient.createService(PlaidApi.class);
        return plaidClient;
    }
}
