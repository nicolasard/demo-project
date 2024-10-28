package ar.nic.security.repository;

import ar.nic.security.model.User;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long> {

    @Query(
            "SELECT * FROM security_user WHERE email = :email")
    Mono<User> findByEmail(String email);

    @Query(
            "DELETE FROM security_user WHERE email = :email")
    Mono<User> deleteByEmail(String email);
}