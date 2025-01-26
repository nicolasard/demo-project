package ar.nic.security.service;

import ar.nic.security.model.User;
import ar.nic.security.model.UserStatusEnum;
import ar.nic.security.openapi.model.UsersPost201Response;
import ar.nic.security.openapi.model.UsersPostRequest;
import ar.nic.security.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class UserService {

    private final MailSender mailSender;

    private final UserRepository userRepository;

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

     @Autowired
    public UserService(MailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    public Mono<UsersPost201Response> register(UsersPostRequest usersPostRequest){
        return Mono
                .just(usersPostRequest)
                .flatMap(this::preValidations)
                .map(this::mapNewUserRequest)
                .flatMap(userRepository::save)
                .doOnNext( data -> this.fireAndForget(data.getEmail(),data.getId()))
                .map(this::mapResponse);
    }

    public Mono<Void> fireAndForget(final String email, final Long id) {
        return Mono.fromRunnable(() -> this.sendActivationEmail(email,id))
                .subscribeOn(Schedulers.boundedElastic()) // Offload to a separate thread
                .then(); // Return a Mono<Void>
    }

    /**
     * Send activation email
     */
    private void sendActivationEmail(final String email, final Long id){
        try {
            final String activationCode = "123";
            final SimpleMailMessage simpleMailMensage = new SimpleMailMessage();
            simpleMailMensage.setText("Activate your user at myexpenses.com.ar");
            simpleMailMensage.setText("Thanks to register to myexpenses.com.ar.\n\n" +
                    "please follow the link <link> to activate your accounts.\n\n" +
                    "Thanks!,\n" +
                    "MyExpenses App.");
            simpleMailMensage.setTo(email);
            this.mailSender.send(simpleMailMensage);
        }catch (final RuntimeException e){
            LOG.error("Error trying to send email", e);
        }
    }

    /**
     * Pre validations to check if we want to proceed creating the user.
     */
    private Mono<UsersPostRequest> preValidations(UsersPostRequest usersPostRequest) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$";
        String password = usersPostRequest.getPassword();
        if (!password.matches(passwordRegex)) {
            throw new IllegalArgumentException("Password must be at least 10 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.");
        }
        return userRepository.findByEmail(usersPostRequest.getEmail())
                .flatMap(existingUser -> Mono.<UsersPostRequest>error(new IllegalArgumentException("A user with this email already exists."))) // Explicitly cast to Mono<UsersPostRequest>
                .switchIfEmpty(Mono.just(usersPostRequest));
    }

    private UsersPost201Response mapResponse(User user) {
        final UsersPost201Response usersPost201Response = new UsersPost201Response();
        usersPost201Response.setEmail(user.getEmail());
        usersPost201Response.setUsername(user.getName());
        return usersPost201Response;
    }

    private User mapNewUserRequest(UsersPostRequest usersPostRequest) {
        final User user = new User();
        user.setName(usersPostRequest.getUsername());
        user.setEmail(usersPostRequest.getEmail());
        user.setPassword(usersPostRequest.getPassword());
        user.setUserStatus(UserStatusEnum.CREATED.getDatabaseStatusId());
        return user;
    }
}
