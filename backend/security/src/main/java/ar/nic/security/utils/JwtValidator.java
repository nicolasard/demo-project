package ar.nic.security.utils;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.security.PublicKey;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

/**
 * Reactive services to validate JWT tokens from different providers like google.
 */
@Component
public class JwtValidator {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtValidator.class);

    private final WebClient webClient;

    private final String googleJWKKeysUri;

    private final String googleJWTAudience;

    public JwtValidator(
            @Value("${jwt-token.google.jwk-keys-uri}") final String googleJWKKeysUri,
            @Value("${jwt-token.google.audience}") final String googleJWTAudience) {
        this.googleJWKKeysUri = googleJWKKeysUri;
        this.googleJWTAudience = googleJWTAudience;
        this.webClient = WebClient.create();
    }

    public Mono<RsaKey> loadRSAfromJWK(final String keyId) {
        // TODO: Cache the key here, so we don't download the JWK from the internet everytime a user
        // logs in.
        final Mono<String> jsonString =
                webClient.get().uri(googleJWKKeysUri).retrieve().bodyToMono(String.class);
        return jsonString
                .map(JwtValidator::getParse)
                .map(JWKSet::getKeys)
                .flatMap(e -> this.getPublicKeys(e, keyId));
    }

    private static JWKSet getParse(String s) {
        try {
            return JWKSet.parse(s);
        } catch (ParseException e) {
            // TODO: Investigate how to handle in a better way exceptions in react
            throw new RuntimeException(e);
        }
    }

    private Mono<RsaKey> getPublicKeys(final List<JWK> keys, final String keyId) {
        final RsaKey rsaK = new RsaKey();
        try {
            for (final JWK jwk : keys) {
                LOGGER.info(jwk.getKeyType() + " - " + jwk.getAlgorithm() + " - " + jwk.getKeyID());
                rsaK.setPublicKey(jwk.toRSAKey().toPublicKey());
                rsaK.setExpirationTime(jwk.toRSAKey().getExpirationTime());
                if (keyId.equals(jwk.getKeyID())) {
                    return Mono.just(rsaK);
                }
            }
        } catch (final JOSEException e) {
            throw new RuntimeException(e);
        }
        throw new RuntimeException("Unable to find the keyId " + keyId);
    }

    /**
     * Validates a Google JWT token
     *
     * @param jwtToken
     */
    public Mono<JwtUser> validateGoogleToken(final String jwtToken) {
        final String publicKeyId = this.getKid(jwtToken);
        return loadRSAfromJWK(publicKeyId)
                .flatMap(
                        key -> {
                            Jws<Claims> claimsJws =
                                    Jwts.parser()
                                            .verifyWith((PublicKey) key.getPublicKey())
                                            .requireAudience(this.googleJWTAudience)
                                            .build()
                                            .parseSignedClaims(jwtToken.trim());
                            JwtUser jwtUser = new JwtUser();
                            jwtUser.setFullName(claimsJws.getPayload().get("name", String.class));
                            jwtUser.setEmail(claimsJws.getPayload().get("email", String.class));
                            return Mono.just(jwtUser);
                        });
    }

    public String getKid(final String jwtToken) {
        try {
            final JWSObject jwsObject = JWSObject.parse(jwtToken);
            return jwsObject.getHeader().getKeyID();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static class RsaKey {
        private Key publicKey;

        private Date expirationTime;

        private String id;

        public Key getPublicKey() {
            return publicKey;
        }

        public void setPublicKey(Key publicKey) {
            this.publicKey = publicKey;
        }

        public Date getExpirationTime() {
            return expirationTime;
        }

        public void setExpirationTime(Date expirationTime) {
            this.expirationTime = expirationTime;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }

    public static class JwtUser {

        private String fullName;

        private String email;

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}
