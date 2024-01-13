package ar.nic.demoproject.utils;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import io.jsonwebtoken.Jwts;

import java.security.Key;
import java.security.PublicKey;
import java.text.ParseException;

/**
 * Util to validate JWT tokens from different providers like google.
 */
@Component
public class JwtValidator {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtValidator.class);

    final WebClient webClient;

    final String googleJWKKeysUri;

    final String googleJWTAudience;

    Key publicKey;

    public JwtValidator(@Value("${jwt-token.google.jwk-keys-uri}") final String googleJWKKeysUri,
                        @Value("${jwt-token.google.audience}") final String googleJWTAudience) {
        this.googleJWKKeysUri = googleJWKKeysUri;
        this.googleJWTAudience = googleJWTAudience;
        this.webClient = WebClient.create();
    }

    public void loadJWK(){
        final String jsonString = webClient.get().uri(googleJWKKeysUri).retrieve().bodyToMono(String.class).block();
        if(jsonString == null){
          throw new RuntimeException("No JWK (Java Web Key) from the uri: "+googleJWKKeysUri);
        }
        try {
            for (final JWK jwk : JWKSet.parse(jsonString).getKeys()){
                LOGGER.info(jwk.getKeyType() +  " - " + jwk.getAlgorithm() + " - " + jwk.getKeyID());
                publicKey = jwk.toRSAKey().toPublicKey();
            }
        } catch (ParseException | JOSEException e) {
            throw new RuntimeException("Unable to parse JWK (Java Web Key) from the uri: "+googleJWKKeysUri,e);
        }
    }

    /**
     * Validates a Google JWT token
     * @param jwtToken
     */
    public void validateGoogleToken(final String jwtToken){
        final Jws<Claims> claimsJws = Jwts.parser()
                .verifyWith((PublicKey) publicKey) // Set the public key for signature verification
                .requireAudience(this.googleJWTAudience)
                .build()
                .parseSignedClaims(jwtToken);
    }
}
