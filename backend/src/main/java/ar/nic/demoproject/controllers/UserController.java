package ar.nic.demoproject.controllers;

import ar.nic.demoproject.db.model.*;
import ar.nic.demoproject.entity.AuthorizeRequest;
import ar.nic.demoproject.services.CategoryService;
import ar.nic.demoproject.services.PrincipalMapperService;
import ar.nic.demoproject.services.TransactionService;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import jakarta.validation.Valid;
import java.security.Principal;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api")
public class UserController {

    private final TransactionService transactionService;

    private final CategoryService categoryService;

    private final PrincipalMapperService principalMapper;

    final Tracer tracer = GlobalOpenTelemetry.getTracer("hello-world-tracer");

    @Autowired
    public UserController(
            final TransactionService transactionService,
            CategoryService categoryService,
            PrincipalMapperService principalMapper) {
        this.transactionService = transactionService;
        this.categoryService = categoryService;
        this.principalMapper = principalMapper;
    }

    @GetMapping("/hi")
    Mono<String> hi() {
        Span span =
                tracer.spanBuilder("helloWorldSpan")
                        .setAttribute("BROWSER", "1234")
                        .setStartTimestamp(Instant.now())
                        .startSpan();
        span.end();
        return Mono.just("Hello world");
    }

    @PostMapping("/authenticate")
    Mono<String> authenticate(@RequestBody AuthorizeRequest authorizeRequest) {
        return principalMapper.authenticate(
                authorizeRequest.getAuthenticationType(), authorizeRequest.getToken());
    }

    @GetMapping("/getProfile")
    Mono<UserProfile> getProfile(Principal principal) {
        Span span =
                tracer.spanBuilder("get-profile-controller")
                        .setAttribute("User", "1234")
                        .startSpan();
        span.end();
        return Mono.just(principal).flatMap(principalMapper::getUserProfile);
    }

    @GetMapping("/categories")
    Flux<Category> getCategories(Principal principal) {
        return categoryService.getCategories();
    }

    @GetMapping("/transactions")
    Flux<Transaction> getTransactionsPage(
            Principal principal,
            @RequestParam("month") Integer month,
            @RequestParam("year") Integer year) {
        return principalMapper
                .getUserProfile(principal)
                .map(t -> transactionService.getTransactions(t, month, year))
                .flatMapMany(f -> f);
    }

    @GetMapping("/transactions/{transactionId}")
    Mono<Transaction> getTransaction(
            Principal principal, @PathVariable("transactionId") Long transactionId) {
        return principalMapper
                .getUserProfile(principal)
                .map(t -> transactionService.getTransactions(t, transactionId))
                .flatMap(f -> f);
    }

    @PostMapping("/transactions")
    Mono<Transaction> postTransactions(
            Principal principal, @Valid @RequestBody Mono<Transaction> transaction) {
        return principalMapper
                .getUserProfile(principal)
                .map(t -> transactionService.saveTransaction(transaction, t))
                .flatMap(f -> f);
    }

    @PutMapping("/transactions")
    Mono<Transaction> putTransactions(
            Principal principal, @Valid @RequestBody Mono<Transaction> transaction) {
        return principalMapper
                .getUserProfile(principal)
                .map(t -> transactionService.saveTransaction(transaction, t))
                .flatMap(f -> f);
    }

    @DeleteMapping("/transactions")
    Mono<Void> deleteTransactions(
            Principal principal, @Valid @RequestBody Mono<Transaction> transaction) {
        return principalMapper
                .getUserProfile(principal)
                .map(t -> transactionService.deleteTransaction(transaction, t))
                .flatMap(f -> f);
    }

    @GetMapping("/transactions/monthly-report/{year}/{month}")
    Flux<TotalDay> getTransactionsReport(
            Principal principal,
            @PathVariable("month") Integer month,
            @PathVariable("year") Integer year) {
        return principalMapper
                .getUserProfile(principal)
                .map(t -> transactionService.getTotalPerDay(t, month, year))
                .flatMapMany(f -> f);
    }
}
