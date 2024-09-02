package ar.nic.demoproject.db.repository;

import ar.nic.demoproject.db.model.CategorySummary;
import ar.nic.demoproject.db.model.TotalDay;
import ar.nic.demoproject.db.model.Transaction;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface TransactionRepository extends ReactiveCrudRepository<Transaction, Long> {

    @Query(
            "SELECT * FROM transactions t WHERE t.userInternalId = :userInternalId ORDER BY t.date"
                    + " DESC")
    Flux<Transaction> findAllByUserInternalId(Mono<Integer> userInternalId);

    @Query(
            "SELECT * FROM transactions t LEFT JOIN category c ON t.category_id = c.category_id"
                    + " WHERE t.userInternalId = :userInternalId AND MONTH(t.`date`)=:month AND"
                    + " YEAR(t.`date`)=:year ORDER BY t.`date` DESC")
    Flux<Transaction> findAllByUserInternalId(
            Mono<Integer> userInternalId, final int month, final int year);

    @Query(
            "SELECT * FROM transactions t LEFT JOIN category c ON t.category_id = c.category_id"
                + " WHERE t.userInternalId = :userInternalId AND t.transactionId = :transactionId")
    Mono<Transaction> findByUserInternalIdAndTransactionId(
            Mono<Integer> userInternalId, Long transactionId);

    @Query(
            "SELECT DAY(t.`date`) AS day ,ROUND(SUM(amount),2) AS total FROM transactions t WHERE"
                    + " userInternalId = :userInternalId AND MONTH(t.`date`)=:month AND"
                    + " YEAR(t.`date`)=:year GROUP BY DAY(t.`date`) ORDER BY DAY(t.`date`) asc ")
    Flux<TotalDay> findTotalPerDay(final Integer userInternalId, final int month, final int year);

    @Query(
            "select sum(t.amount) AS amount, t.category_id as category_id, c.category_name"
                    + " category_name from transactions t LEFT JOIN category c ON t.category_id ="
                    + " c.category_id where MONTH(t.`date`)=:month AND YEAR(t.`date`)=:year AND"
                    + " t.userInternalId = :userInternalId group by t.category_id ")
    Flux<CategorySummary> findTotalPerCategory(
            final Integer userInternalId, final int month, final int year);
}
