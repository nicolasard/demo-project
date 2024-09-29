package ar.nic.security.service;

import ar.nic.security.model.User;
import ar.nic.security.model.UserStatusEnum;
import ar.nic.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class LoginService {

    private final UserRepository userRepository;

    @Autowired
    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Sign in a new user to the system.
     */
    public Mono<User> signIn(final String email, final String password){
        return userRepository.findByEmail(email).map(p -> this.validatePassword(p,password));
    }

    /**
     * Sign up a new user to the system.
     */
    public Mono<User> signUp(User user){
        return userRepository.findByEmail(user.getEmail()).switchIfEmpty(userRepository.save(mapToUser(user)));
    }

    private User validatePassword(User user, final String password){
        PasswordEncoder passwordEncoder =
                PasswordEncoderFactories.createDelegatingPasswordEncoder();
        if (passwordEncoder.matches(password,user.getPassword())){
            return user;
        }
        throw new RuntimeException("Invalid user or password.");
    }

    private User mapToUser(final User user){
        //TODO: Validate password complexity
        User returnUser = new User();
        returnUser.setUserStatus(UserStatusEnum.CREATED.getDatabaseStatusId());
        returnUser.setEmail(user.getEmail());
        PasswordEncoder passwordEncoder =
                PasswordEncoderFactories.createDelegatingPasswordEncoder();
        returnUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return returnUser;
    }
}
