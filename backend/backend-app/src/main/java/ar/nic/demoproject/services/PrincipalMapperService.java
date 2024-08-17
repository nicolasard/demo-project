package ar.nic.demoproject.services;

import ar.nic.demoproject.db.model.AuthenticationType;
import ar.nic.demoproject.db.model.Currency;
import ar.nic.demoproject.db.model.UserProfile;
import ar.nic.demoproject.db.repository.UserProfileRepository;
import ar.nic.demoproject.utils.CustomJwtTokenUtils;
import ar.nic.demoproject.utils.JwtValidator;
import io.jsonwebtoken.Jwts;
import java.security.*;
import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.apache.commons.lang3.NotImplementedException;
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

    final JwtValidator jwtValidator;

    @Autowired
    public PrincipalMapperService(
            final UserProfileRepository userProfileRepository,
            final CustomJwtTokenUtils jwtTokenUtils,
            JwtValidator jwtValidator) {
        this.userProfileRepository = userProfileRepository;
        this.jwtTokenUtils = jwtTokenUtils;
        this.jwtValidator = jwtValidator;
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

    /**
     * Create our own JWT token out of the GoogleAuth JWT token. In the future we can do this out of
     * the JWT token from Facebook, Apple auth, etc.
     */
    public Mono<String> authenticate(
            final AuthenticationType authenticationType, final String jwtToken) {
        final Key privateKey = jwtTokenUtils.getPrivateKey();
        if (AuthenticationType.GOOGLE_AUTH == authenticationType) {
            return jwtValidator
                    .validateGoogleToken(jwtToken)
                    .map(jwtUser -> new UserProfile(jwtUser.getFullName(), jwtUser.getEmail()))
                    .flatMap(this::getUserFromDB)
                    .map(
                            e ->
                                    Jwts.builder()
                                            .subject(String.valueOf(e.getInternalId()))
                                            .claim("email", e.getEmail())
                                            .claim("name", e.getFullName())
                                            .expiration(
                                                    Date.from(
                                                            Instant.now().plus(6, ChronoUnit.DAYS)))
                                            .signWith(privateKey)
                                            .compact());
        }
        if (AuthenticationType.DEMO_ACCOUNT == authenticationType) {
            return Mono.just(
                    Jwts.builder()
                            .subject("-1")
                            .claim("email", "demo-account@myexpenses.egallo.com.ar")
                            .claim("name", "John Doe")
                            .expiration(Date.from(Instant.now().plus(6, ChronoUnit.DAYS)))
                            .signWith(privateKey)
                            .compact());
        }
        throw new NotImplementedException("Authentication type not implemented.");
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
