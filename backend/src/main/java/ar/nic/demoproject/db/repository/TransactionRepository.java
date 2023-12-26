package ar.nic.demoproject.db.repository;

import ar.nic.demoproject.db.model.Transaction;
import ar.nic.demoproject.db.model.UserProfile;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface TransactionRepository extends ReactiveCrudRepository<Transaction, Long> {

    @Query("select * from transactions t where t.userInternalId = :userInternalId")
    Flux<Transaction> findAllByUserInternalId(Mono<Integer> userInternalId);

    @Query("select * from transactions t where t.userInternalId = :userInternalId and t.transactionId = :transactionId")
    Mono<Transaction> findByUserInternalIdAndTransactionId(Mono<Integer> userInternalId, Long transactionId);
}

