package ar.nic.demoproject.services;

import ar.nic.demoproject.model.Transaction;
import ar.nic.demoproject.repository.TransactionRepository;
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

    public Flux<Transaction> getTransactions(){
        return this.transactionRepository.findAll();
    }

    public Mono<Transaction> saveTransaction(final Mono<Transaction> transaction){
        return transaction.flatMap(transactionRepository::save);
    }
}
