package ar.nic.demoproject.utils;

import ar.nic.demoproject.db.model.Currency;
import ar.nic.demoproject.db.model.UserProfile;
import ar.nic.demoproject.db.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.security.Principal;

@Component
public class PrincipalMapper {

    final UserProfileRepository userProfileRepository;

    @Autowired
    public PrincipalMapper(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public Mono<UserProfile> getUserProfile(Principal principal){
        if (principal instanceof final JwtAuthenticationToken jwtAuthenticationToken){
            final String email = jwtAuthenticationToken.getTokenAttributes().get("email").toString();
            final String fullName = jwtAuthenticationToken.getTokenAttributes().get("name").toString();
            final UserProfile userProfile = new UserProfile(fullName, email);
            userProfile.setDefaultCurrency(new Currency("978"));
            return this.userProfileRepository.findByEmail(Mono.just(email)).switchIfEmpty(userProfileRepository.save(userProfile));
        }
        return Mono.just(new UserProfile("Unknown User", "unknown@email.com"));
    }
}
