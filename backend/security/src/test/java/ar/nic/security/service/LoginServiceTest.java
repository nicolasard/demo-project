package ar.nic.security.service;

import ar.nic.security.model.User;
import ar.nic.security.model.UserStatusEnum;
import ar.nic.security.repository.UserRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class LoginServiceTest {

    final LoginService loginService;

    final UserRepository userRepository;

    @Autowired
    public LoginServiceTest(final LoginService loginService,final UserRepository userRepository) {
        this.loginService = loginService;
        this.userRepository = userRepository;
    }

    @Test
    @Order(1)
    void testSignupService(){
        userRepository.deleteByEmail("signup-test@email.com");
        final User user = new User();
        user.setEmail("signup-test@email.com");
        user.setPassword("1234");
        final User userSignedUp = loginService.signUp(user).block();
        assertNotNull(userSignedUp);
        assertNotNull(userSignedUp.getId());
        assertEquals(UserStatusEnum.CREATED.getDatabaseStatusId(),userSignedUp.getUserStatus());
    }

    @Test
    @Order(2)
    void testLogin(){
        final User userSignedUp = loginService.signIn("signup-test@email.com","1234").block();
        assertNotNull(userSignedUp);
    }
}
