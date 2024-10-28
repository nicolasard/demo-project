package ar.nic.security.repository;

import ar.nic.security.model.User;
import ar.nic.security.model.UserStatusEnum;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Test to check that we are able to perform actions with the database.
 */
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RepositoryTest {

    final UserRepository userRepository;

    final static String DUMMY_EMAIL = "dummy@email.com";

    @Autowired
    public RepositoryTest(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Test
    @Order(1)
    void testDelete(){
        userRepository.deleteByEmail(DUMMY_EMAIL).block();
    }

    @Test
    @Order(2)
    void testSave() {
        final User user = new User();
        user.setEmail(DUMMY_EMAIL);
        user.setPassword("123");
        user.setUserStatus(UserStatusEnum.CREATED.getDatabaseStatusId());
        user.setIpLastLogin("192.168.1.1");
        user.setDateLastLogin(Instant.now());
        final User userSaved = userRepository.save(user).block();
        assertNotNull(userSaved);
        assertNotNull(userSaved.getId());
    }

    @Test
    @Order(3)
    void testGetByEmail() {
        final User user = userRepository.findByEmail(DUMMY_EMAIL).block();
        assertNotNull(user);
        assertNotNull(user.getId());
    }

}
