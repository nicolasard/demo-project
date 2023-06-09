package ar.nic.demoproject.controllers;

import ar.nic.demoproject.db.model.Transaction;
import ar.nic.demoproject.db.model.UserProfile;
import ar.nic.demoproject.services.TransactionService;
import ar.nic.demoproject.utils.PrincipalMapper;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.security.Principal;

@RestController
public class UserController {

    private final TransactionService transactionService;

    private final PrincipalMapper principalMapper;

    @Autowired
    public UserController(final TransactionService transactionService, PrincipalMapper principalMapper) {
        this.transactionService = transactionService;
        this.principalMapper = principalMapper;
    }

    @GetMapping("/getProfile")
    Mono<UserProfile> getProfile(Principal principal) {
        return Mono.just(principal).flatMap(principalMapper::getUserProfile);
    }

    @GetMapping("/transactions")
    Flux<Transaction> getTransactions(Principal principal) {
        return principalMapper.getUserProfile(principal).map(transactionService::getTransactions).flatMapMany(f->f);
    }

    @PostMapping("/transactions")
    Mono<Transaction> postTransactions(Principal principal,@Valid  @RequestBody Mono<Transaction> transaction) {
        return principalMapper.getUserProfile(principal).map(t->transactionService.saveTransaction(transaction,t)).flatMap(f->f);
    }

    @PutMapping("/transactions")
    Mono<Transaction> putTransactions(Principal principal,@Valid  @RequestBody Mono<Transaction> transaction) {
        return principalMapper.getUserProfile(principal).map(t->transactionService.saveTransaction(transaction,t)).flatMap(f->f);
    }

}