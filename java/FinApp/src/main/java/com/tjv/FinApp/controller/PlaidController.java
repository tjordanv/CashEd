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

        import com.tjv.FinApp.model.LinkTkn;
        import com.tjv.FinApp.model.PublicToken;
        import com.tjv.FinApp.services.PlaidService;
        import com.plaid.client.model.AccountBalance;
        import com.plaid.client.model.TransactionsGetResponse;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

@RestController
public class PlaidController {
    @Autowired
    private PlaidService plaidService;

//    @CrossOrigin
//    @GetMapping("/auth/linktkn")
//    public LinkTkn linkTkn() throws Exception {
//        LinkTkn tkn = new LinkTkn();
//        tkn.setLinkTkn(plaidService.pliadToken());
//        System.out.println(tkn.getLinkTkn());
//        return tkn;
//    }
    @CrossOrigin
    @GetMapping("/auth/createToken")
    public LinkTkn linkTkn() throws Exception {
        LinkTkn tkn = new LinkTkn();
        tkn.setLinkTkn(plaidService.createToken());
        return tkn;
    }
    @CrossOrigin
    @PostMapping("/auth/exchangeToken")
    public LinkTkn accessToken(@RequestBody PublicToken publicToken) throws Exception {
        System.out.println("exchange");
        LinkTkn tkn = new LinkTkn();
        tkn.setLinkTkn(plaidService.exchangeToken(publicToken.getPublicToken()));
        System.out.println(tkn.getLinkTkn());
        return tkn;
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

