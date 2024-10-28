package ar.nic.demoproject.services;

import ar.nic.demoproject.db.model.Currency;
import ar.nic.demoproject.db.model.UserProfile;
import ar.nic.demoproject.db.repository.UserProfileRepository;
import ar.nic.security.service.CustomJwtTokenUtils;
import java.security.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class PrincipalMapperService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PrincipalMapperService.class);

    final UserProfileRepository userProfileRepository;

    final CustomJwtTokenUtils jwtTokenUtils;

    @Autowired
    public PrincipalMapperService(
            final UserProfileRepository userProfileRepository,
            final CustomJwtTokenUtils jwtTokenUtils) {
        this.userProfileRepository = userProfileRepository;
        this.jwtTokenUtils = jwtTokenUtils;
    }

    public Mono<UserProfile> getUserProfile(Principal principal) {
        if (principal instanceof final JwtAuthenticationToken jwtAuthenticationToken) {
            final String email =
                    jwtAuthenticationToken.getTokenAttributes().get("email").toString();
            final String fullName =
                    jwtAuthenticationToken.getTokenAttributes().get("name").toString();
            final UserProfile userProfile = new UserProfile(fullName, email);
            userProfile.setDefaultCurrency(new Currency("978"));
            return this.userProfileRepository
                    .findByEmail(Mono.just(email))
                    .switchIfEmpty(userProfileRepository.save(userProfile));
        }
        return Mono.just(new UserProfile("Unknown User", "unknown@email.com"));
    }

    private Mono<UserProfile> getUserFromDB(UserProfile userProfile) {
        return userProfileRepository
                .findByEmail(Mono.just(userProfile.getEmail()))
                .switchIfEmpty(
                        userProfileRepository.save(
                                new UserProfile(
                                        userProfile.getFullName(), userProfile.getEmail())));
    }
}
