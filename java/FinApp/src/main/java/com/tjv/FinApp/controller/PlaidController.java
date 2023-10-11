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

        import com.tjv.FinApp.model.PlaidToken;
        import com.tjv.FinApp.services.PlaidService;
        import com.plaid.client.model.AccountBalance;
        import com.plaid.client.model.TransactionsGetResponse;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

@RestController
public class PlaidController {
    @Autowired
    private PlaidService plaidService;

    @CrossOrigin
    @GetMapping("/auth/createLinkToken")
    public PlaidToken createLinkToken() throws Exception {
        PlaidToken linkToken = new PlaidToken();
        linkToken.setToken(plaidService.createLinkToken());
        linkToken.setTokenType("Link Token");

        return linkToken;
    }
    @CrossOrigin
    @PostMapping("/auth/exchangePublicToken")
    public PlaidToken exchangePublicToken(@RequestBody PlaidToken publicToken) throws Exception {
        PlaidToken accessToken = new PlaidToken();
        accessToken.setToken(plaidService.exchangePublicToken(publicToken.getToken()));
        accessToken.setTokenType("Access Token");

        return accessToken;
    }
    @CrossOrigin
    @GetMapping("/transactions")
    public TransactionsGetResponse transactions(@RequestParam String accessToken) throws Exception {
        return plaidService.transactions(accessToken);
    }
    @CrossOrigin
    @GetMapping("/accountBalance")
    public AccountBalance accountBalance(@RequestParam String accessToken) throws Exception {
        return plaidService.accountBalance(accessToken);
    }
}

