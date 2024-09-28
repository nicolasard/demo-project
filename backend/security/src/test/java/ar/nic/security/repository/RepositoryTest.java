package ar.nic.security.repository;

import ar.nic.security.model.User;
import ar.nic.security.model.UserStatusEnum;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Test to check that we are able to perform actions with the database.
 */
@SpringBootTest
public class RepositoryTest {

    final UserRepository userRepository;

    @Autowired
    public RepositoryTest(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Test
    void testSave() {
        final User user = new User();
        user.setEmail("nicolas.ard@email.com");
        user.setPassword("123");
        user.setUserStatus(UserStatusEnum.CREATED.getDatabaseStatusId());
        user.setIpLastLogin("192.168.1.1");
        user.setDateLastLogin(Instant.now());
        final User userSaved = userRepository.save(user).block();
        assertNotNull(userSaved);
        assertNotNull(userSaved.getId());
    }
    
}
