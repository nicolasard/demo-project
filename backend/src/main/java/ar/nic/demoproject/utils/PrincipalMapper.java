package ar.nic.demoproject.utils;

import ar.nic.demoproject.db.model.Currency;
import ar.nic.demoproject.db.model.UserProfile;
import ar.nic.demoproject.db.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;
import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class PrincipalMapper {

    final UserProfileRepository userProfileRepository;

    final String keyStorePath;

    final String keyStoreKey;

    @Autowired
    public PrincipalMapper(final UserProfileRepository userProfileRepository,
                           @Value("${jwt-token.keystore-path}") final String keyStorePath,
                           @Value("${jwt-token.keystore-password}") final String keyStoreKey) {
        this.userProfileRepository = userProfileRepository;
        this.keyStorePath = keyStorePath;
        this.keyStoreKey = keyStoreKey;
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

    /**
     * Create our own JWT token out of the GoogleAuth JWT token. In the future
     * we can do this out of the JWT token from Facebook, Apple auth, etc.
     */
    public Mono<String> authenticate(){
        //TODO: This is under construction.
        //TODO: Don't load the keystore for each transaction.
        Key key;
        try {
            final KeyStore keystore = KeyStore.getInstance("JKS");
            try (FileInputStream fis = new FileInputStream(this.keyStorePath)) {
                keystore.load(fis, this.keyStoreKey.toCharArray());
                key = keystore.getKey(keystore.aliases().nextElement(),this.keyStoreKey.toCharArray());
            }
        } catch (KeyStoreException | IOException | NoSuchAlgorithmException | CertificateException |
                 UnrecoverableKeyException e) {
            throw new RuntimeException(e);
        }
        final SecretKey key2 = Jwts.SIG.HS256.key().build(); // TODO: I need to generate a keypair and save in the configuration
                                                            // this is only for test
        return Mono.just(Jwts.builder()
                        .subject("Test") //TODO: In future use the id of user.
                        .claim("email","nicolas.ard@gmail.com")
                        .claim("name","Nicolas Ardison")
                        .expiration(Date.from(Instant.now().plus(6, ChronoUnit.DAYS)))
                        .signWith(key2)
                        .compact());
    }
}
