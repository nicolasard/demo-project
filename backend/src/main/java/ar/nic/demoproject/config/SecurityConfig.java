package ar.nic.demoproject.config;

import ar.nic.demoproject.utils.PrincipalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.interfaces.RSAPublicKey;

@Configuration(proxyBeanMethods = false)
@EnableWebFluxSecurity
public class SecurityConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);

    final String keyStorePath;

    final String keyStoreKey;

    public SecurityConfig(@Value("${jwt-token.keystore-path}") final String keyStorePath,
                          @Value("${jwt-token.keystore-password}") final String keyStoreKey) {
        this.keyStorePath = keyStorePath;
        this.keyStoreKey = keyStoreKey;
    }

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http){

        //TODO: Remove this from here
        final PublicKey publicKey;
        try {
            final KeyStore keystore = KeyStore.getInstance("JKS");
            try (FileInputStream fis = new FileInputStream(this.keyStorePath)) {
                keystore.load(fis, this.keyStoreKey.toCharArray());
                final String alias = keystore.aliases().nextElement();
                publicKey = keystore.getCertificate(alias).getPublicKey();
            }
        } catch (KeyStoreException | IOException | NoSuchAlgorithmException | CertificateException e) {
            throw new RuntimeException(e);
        }

        http.csrf().disable()
                .cors().configurationSource(request -> createCorsConfigSource())
                .and().authorizeExchange().pathMatchers("/*","/static/**","/actuator/**",
                        "/webjars/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/api/authenticate",
                        "/swagger-ui.html").permitAll()
                .anyExchange().authenticated().and().oauth2ResourceServer().jwt().publicKey((RSAPublicKey) publicKey);
        return http.build();
    }


    /**
     Enhance the default Cors config. With my custom config.
     Ex. by default spring don't allow CORS in DELETE.
     */
    public CorsConfiguration createCorsConfigSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.addAllowedMethod(HttpMethod.DELETE);
        corsConfiguration.addAllowedMethod(HttpMethod.PUT);
        return corsConfiguration;
    }

}