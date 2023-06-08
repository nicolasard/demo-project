package ar.nic.demoproject.db.repository;

import ar.nic.demoproject.db.model.UserProfile;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserProfileRepository  extends ReactiveCrudRepository<UserProfile, Long> {

    @Query("select * from users t where t.email = :email")
    Mono<UserProfile> findByEmail(Mono<String> email);
}
