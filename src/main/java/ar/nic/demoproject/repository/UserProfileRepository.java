package ar.nic.demoproject.repository;

import ar.nic.demoproject.model.UserProfile;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface UserProfileRepository  extends ReactiveCrudRepository<UserProfile, Long> {
}
