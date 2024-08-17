package ar.nic.demoproject.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.*;
import java.security.cert.CertificateException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/** Spring component to manipulate my custom JWT token */
@Component
public class CustomJwtTokenUtils {

    final String keyStorePath;

    final String keyStoreKey;

    final Key privateKey;

    final Key publicKey;

    public CustomJwtTokenUtils(
            @Value("${jwt-token.keystore-path}") final String keyStorePath,
            @Value("${jwt-token.keystore-password}") final String keyStoreKey) {
        this.keyStorePath = keyStorePath;
        this.keyStoreKey = keyStoreKey;

        try {
            final KeyStore keystore = KeyStore.getInstance("JKS");
            try (FileInputStream fis = new FileInputStream(this.keyStorePath)) {
                keystore.load(fis, this.keyStoreKey.toCharArray());
                final String alias = keystore.aliases().nextElement();
                privateKey = keystore.getKey(alias, this.keyStoreKey.toCharArray());
                publicKey = keystore.getCertificate(alias).getPublicKey();
            }
        } catch (KeyStoreException
                | IOException
                | NoSuchAlgorithmException
                | CertificateException
                | UnrecoverableKeyException e) {
            throw new RuntimeException(e);
        }
    }

    public Key getPrivateKey() {
        if (privateKey != null) {
            return privateKey;
        }
        throw new IllegalStateException("Private key is null");
    }

    public Key getPublicKey() {
        if (publicKey != null) {
            return publicKey;
        }
        throw new IllegalStateException("Public key is null");
    }
}
