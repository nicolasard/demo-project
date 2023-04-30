package ar.nic.demoproject.controllers;

import ar.nic.demoproject.model.Transaction;
import ar.nic.demoproject.model.UserProfile;
import ar.nic.demoproject.services.TransactionService;
import ar.nic.demoproject.utils.PrincipalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;

@RestController
public class UserController {

    private final TransactionService transactionService;

    @Autowired
    public UserController(final TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/getProfile")
    Mono<UserProfile> getProfile(Principal principal) {
        return Mono.just(principal).map(PrincipalMapper::getUserProfile);
    }

    @GetMapping("/transactions")
    Flux<Transaction> getTransactions(Principal principal) {
        return transactionService.getTransactions();
    }

    @PostMapping("/transactions")
    Mono<Transaction> postTransactions(Principal principal, @RequestBody Mono<Transaction> transaction) {
        return transactionService.saveTransaction(transaction);
    }

    @PutMapping("/transactions")
    Mono<Transaction> putTransactions(Principal principal, @RequestBody Mono<Transaction> transaction) {
        return transactionService.saveTransaction(transaction);
    }

}