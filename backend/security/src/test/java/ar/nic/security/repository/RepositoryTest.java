package ar.nic.security.repository;

import ar.nic.security.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

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
    void validateCanSave() {
        final User user = new User();
        user.setEmail("nicolas.ard@email.com");
        user.setPassword("123");
        userRepository.save(user);
    }
}
