package ar.nic.demoproject.config;

import ar.nic.demoproject.utils.CustomJwtTokenUtils;
import java.security.*;
import java.security.interfaces.RSAPublicKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration(proxyBeanMethods = false)
@EnableWebFluxSecurity
public class SecurityConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);

    final CustomJwtTokenUtils jwtTokenUtils;

    @Autowired
    public SecurityConfig(CustomJwtTokenUtils jwtTokenUtils) {
        this.jwtTokenUtils = jwtTokenUtils;
    }

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        final PublicKey publicKey = (PublicKey) jwtTokenUtils.getPublicKey();

        http.csrf()
                .disable()
                .cors()
                .configurationSource(request -> createCorsConfigSource())
                .and()
                .authorizeExchange()
                .pathMatchers(
                        "/*",
                        "/static/**",
                        "/actuator/**",
                        "/webjars/swagger-ui/**",
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/api/authenticate/**",
                        "/swagger-ui.html")
                .permitAll()
                .anyExchange()
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt()
                .publicKey((RSAPublicKey) publicKey);
        return http.build();
    }

    /**
     * Enhance the default Cors config. With my custom config. Ex. by default spring don't allow
     * CORS in DELETE.
     */
    public CorsConfiguration createCorsConfigSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.addAllowedMethod(HttpMethod.DELETE);
        corsConfiguration.addAllowedMethod(HttpMethod.PUT);
        return corsConfiguration;
    }
}
