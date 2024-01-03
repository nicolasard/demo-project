package ar.nic.demoproject.controllers;

import ar.nic.demoproject.db.model.TotalDay;
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
@RequestMapping("api")
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
    Flux<Transaction> getTransactionsPage(Principal principal, @RequestParam("month") Integer month, @RequestParam("year") Integer year) {
        return principalMapper.getUserProfile(principal).map( t-> transactionService.getTransactions(t,month,year)).flatMapMany(f->f);
    }

    @GetMapping("/transactions/{transactionId}")
    Mono<Transaction> getTransaction(Principal principal, @PathVariable("transactionId") Long transactionId) {
        return principalMapper.getUserProfile(principal).map(t -> transactionService.getTransactions(t,transactionId)).flatMap(f->f);
    }

    @PostMapping("/transactions")
    Mono<Transaction> postTransactions(Principal principal,@Valid  @RequestBody Mono<Transaction> transaction) {
        return principalMapper.getUserProfile(principal).map(t->transactionService.saveTransaction(transaction,t)).flatMap(f->f);
    }

    @PutMapping("/transactions")
    Mono<Transaction> putTransactions(Principal principal,@Valid  @RequestBody Mono<Transaction> transaction) {
        return principalMapper.getUserProfile(principal).map(t->transactionService.saveTransaction(transaction,t)).flatMap(f->f);
    }

    @DeleteMapping("/transactions")
    Mono<Void> deleteTransactions(Principal principal,@Valid  @RequestBody Mono<Transaction> transaction) {
        return principalMapper.getUserProfile(principal).map(t->transactionService.deleteTransaction(transaction,t)).flatMap(f->f);
    }

    @GetMapping("/transactions/monthly-report/{year}/{month}")
    Flux<TotalDay> getTransactionsReport(Principal principal, @PathVariable("month") Integer month, @PathVariable("year") Integer year) {
        return principalMapper.getUserProfile(principal).map(t->transactionService.getTotalPerDay(t,month,year)).flatMapMany(f->f);
    }
}