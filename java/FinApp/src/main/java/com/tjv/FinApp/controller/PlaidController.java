// Dev version

//package com.tjv.FinApp.controller;
//import com.plaid.client.model.*;
//
//import com.tjv.FinApp.model.LinkTkn;
//import com.tjv.FinApp.services.PlaidService;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import org.slf4j.Logger;
//
//@RestController
//public class PlaidController {
//    @Autowired
//    private PlaidService plaidService;
//
//    Logger log = LoggerFactory.getLogger(PlaidController.class);
//
//    @CrossOrigin
//    @GetMapping("/auth/transactions")
//    public TransactionsGetResponse transactions(@RequestParam String ptkn) throws Exception {
//        return plaidService.transactions(ptkn);
//    }
//    @CrossOrigin
//    @GetMapping("/accountBalance")
//    public AccountBalance accountBalance(@RequestParam String ptkn) throws Exception {
//        return plaidService.accountBalance(ptkn);
//    }
//    @CrossOrigin
//    @GetMapping("/auth/linktkn")
//    public LinkTkn linkTkn() throws Exception {
//        LinkTkn tkn = new LinkTkn();
//        tkn.setLinkTkn(plaidService.pliadToken());
//        return tkn;
//    }
//
//}
// Sandbox version
package com.tjv.FinApp.controller;

        import com.plaid.client.model.*;
        import com.tjv.FinApp.model.Account;
        import com.tjv.FinApp.model.PlaidToken;
        import com.tjv.FinApp.model.Transaction;
        import com.tjv.FinApp.services.PlaidService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

        import java.io.IOException;
        import java.security.Principal;
        import java.util.ArrayList;
        import java.util.List;

@RestController
@CrossOrigin
public class PlaidController {
    @Autowired
    private PlaidService plaidService;

    @GetMapping("/createLinkToken")
    public PlaidToken createLinkToken(Principal principal) throws Exception {
        PlaidToken linkToken = new PlaidToken();
        linkToken.setToken(plaidService.createLinkToken(principal));
        linkToken.setTokenType("Link Token");

        return linkToken;
    }
    @PostMapping("/exchangePublicToken")
    public List<Account> exchangePublicToken(Principal principal, @RequestBody PlaidToken publicToken) throws Exception {
        return plaidService.exchangePublicToken(principal, publicToken.getToken());
    }
    @GetMapping("/getAccounts")
    public List<Account> getAccounts(Principal principal) {
        List<Account> accounts = plaidService.getAccounts(principal);
        return accounts.size() > 0 ? accounts : null;
    }
    @PutMapping("/deleteAccount")
    public boolean deleteAccount(@RequestParam int id) throws Exception {
        return plaidService.deleteAccount(id);
    }
    @PutMapping("/updateAccount")
    public boolean updateAccount(@RequestParam int id, @RequestParam String nickname) throws Exception {
        return plaidService.updateAccount(id, nickname);
    }

    @GetMapping("/test")
    public Item test(@RequestBody PlaidToken accessToken) throws IOException {
        return plaidService.test(accessToken.getToken());
    }
    @GetMapping("/test2")
    public Institution test2(@RequestParam String institutionId) throws IOException {
        return plaidService.test2(institutionId);
    }
    @GetMapping("/transactions")
    public List<Transaction> transactions(@RequestParam String accountIds, @RequestParam String startDateOffset, Principal principal) throws Exception {
        List<PlaidToken> accessTokens = plaidService.getAccessTokens(accountIds, principal);
        List<Transaction> transactions = new ArrayList<>();

        for (PlaidToken accessToken : accessTokens) {
            transactions.addAll(plaidService.getTransactions(accountIds, accessToken, Integer.parseInt(startDateOffset)));
        }
        return transactions;
    }
    @GetMapping("/accountBalance")
    public AccountBalance accountBalance(@RequestParam String accessToken) throws Exception {
        return plaidService.accountBalance(accessToken);
    }
}

