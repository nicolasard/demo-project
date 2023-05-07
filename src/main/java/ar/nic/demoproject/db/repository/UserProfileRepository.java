package ar.nic.demoproject.db.repository;

import ar.nic.demoproject.db.model.UserProfile;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface UserProfileRepository  extends ReactiveCrudRepository<UserProfile, Long> {
}
