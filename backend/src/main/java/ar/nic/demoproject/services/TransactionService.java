package ar.nic.demoproject.services;

import ar.nic.demoproject.db.model.Transaction;
import ar.nic.demoproject.db.model.UserProfile;
import ar.nic.demoproject.db.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TransactionService
{
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Flux<Transaction> getTransactions(final UserProfile principal){
        return this.transactionRepository.findAllByUserInternalId(Mono.just(principal.getInternalId()));
    }

    public Mono<Transaction> getTransactions(final UserProfile principal, final Long transactionId){
        return this.transactionRepository.findByUserInternalIdAndTransactionId(Mono.just(principal.getInternalId()),transactionId);
    }

    public Mono<Transaction> saveTransaction(final Mono<Transaction> transaction, final UserProfile principal){
        return transaction.map(t->{t.setUserInternalId(principal.getInternalId()); return t;}).flatMap(transactionRepository::save);
    }

    public Mono<Void> deleteTransaction(final Mono<Transaction> transaction, final UserProfile principal){
        return transaction.map(t->{t.setUserInternalId(principal.getInternalId()); return t;}).flatMap(transactionRepository::delete);
    }
}
