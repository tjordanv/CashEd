package com.tjv.FinApp.controller;

import com.tjv.FinApp.services.PlaidService;
import com.plaid.client.model.AccountBalance;
import com.plaid.client.model.TransactionsGetResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaidController {
    @Autowired
    private PlaidService plaidService;
    @GetMapping("/transactions")
    public TransactionsGetResponse transactions() throws Exception {
        return plaidService.transactions();
    }
    @GetMapping("/accountBalance")
    public AccountBalance accountBalance() throws Exception {
        return plaidService.accountBalance();
    }

}
