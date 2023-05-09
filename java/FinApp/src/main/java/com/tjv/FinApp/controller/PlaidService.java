package com.tjv.FinApp.controller;


import com.plaid.client.ApiClient;
import com.plaid.client.model.ItemPublicTokenExchangeRequest;
import com.plaid.client.model.ItemPublicTokenExchangeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

//public class PlaidService {
//    @Service
//    public class PlaidService {
//
//        @Autowired
//        private ApiClient apiClient;
//
//        public String getAccessToken(String publicToken) throws IOException {
//            ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest(publicToken);
//            ItemPublicTokenExchangeResponse response = apiClient.service().itemPublicTokenExchange(request).execute().body();
//            return response.getAccessToken();
//        }
//    }
//}
