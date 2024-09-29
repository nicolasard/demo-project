package ar.nic.security.service;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class HashingTest {

    @Test
    @Order(1)
    void testDelete(){
        PasswordEncoder passwordEncoder =
                PasswordEncoderFactories.createDelegatingPasswordEncoder();
        String hashedPassword = passwordEncoder.encode("123");
        assertEquals(true,passwordEncoder.matches("123",hashedPassword));
    }

}
