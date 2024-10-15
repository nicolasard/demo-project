package ar.nic.security.service;

import ar.nic.security.model.User;
import ar.nic.security.model.UserStatusEnum;
import ar.nic.security.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class LoginService {

    private final UserRepository userRepository;

    final CustomJwtTokenUtils jwtTokenUtils;

    @Autowired
    public LoginService(final UserRepository userRepository, final CustomJwtTokenUtils jwtTokenUtils) {
        this.userRepository = userRepository;
        this.jwtTokenUtils = jwtTokenUtils;
    }

    /**
     * Sign in a new user to the system.
     */
    public Mono<String> signIn(final String email, final String password){
        return userRepository.findByEmail(email)
                .map(p -> this.validatePassword(p,password))
                .map(this::createJwtToken)
                .switchIfEmpty(Mono.error(new RuntimeException("User doesn't exists")));
    }

    /**
     * Sign up a new user to the system.
     */
    public Mono<User> signUp(final User user){
        return userRepository.findByEmail(user.getEmail()).switchIfEmpty(userRepository.save(mapToUser(user)));
    }

    private User validatePassword(final User user, final String password){
        if (user==null){
            throw new RuntimeException("Can not find the user.");
        }
        PasswordEncoder passwordEncoder =
                PasswordEncoderFactories.createDelegatingPasswordEncoder();
        if (passwordEncoder.matches(password,user.getPassword())){
            return user;
        }
        throw new RuntimeException("Invalid user or password.");
    }

    private User mapToUser(final User user){
        String password = user.getPassword();
        //TODO: Do a precompilation of the regex
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        if (!password.matches(regex)){
            throw new RuntimeException("The password should have at least 8 character, and contains at least on lowercase, uppercase and number.");
        }
        User returnUser = new User();
        returnUser.setUserStatus(UserStatusEnum.CREATED.getDatabaseStatusId());
        returnUser.setEmail(user.getEmail());
        PasswordEncoder passwordEncoder =
                PasswordEncoderFactories.createDelegatingPasswordEncoder();
        returnUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return returnUser;
    }

    /**
     * Create our own JWT token, when we are here means that the user was already authenticated and we can proceed.
     */
    private String createJwtToken(final User user) {
            return Jwts.builder()
                            .subject(String.valueOf(user.getId()))
                            .claim("email", user.getEmail())
                            .claim("name", user.getName())
                            .expiration(Date.from(Instant.now().plus(6, ChronoUnit.DAYS)))
                            .signWith(this.jwtTokenUtils.getPrivateKey())
                            .compact();
    }
}
