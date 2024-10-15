package ar.nic.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(proxyBeanMethods = false)
@EnableAutoConfiguration
public class NicSecurityMain {
    public static void main(String[] args) {
        SpringApplication.run(NicSecurityMain.class, args);
    }
}
