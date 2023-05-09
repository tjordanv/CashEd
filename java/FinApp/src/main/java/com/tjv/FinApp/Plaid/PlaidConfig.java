package com.tjv.FinApp.Plaid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PlaidConfig {
    @Value("${plaid.clientId}")
    private String clientId;

    @Value("${plaid.secret}")
    private String secret;

    @Value("${plaid.baseUrl}")
    private String environment;

//    @Bean
//    public PlaidClient plaidClient() {
//        return ApiClient.newBuilder()
//                .clientId(clientId)
//                .secret(secret)
//                .sandboxBaseUrl() // or .developmentBaseUrl() or .productionBaseUrl() based on your needs
//                .build();
//    }
}

