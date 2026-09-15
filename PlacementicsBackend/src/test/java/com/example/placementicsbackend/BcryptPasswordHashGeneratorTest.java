package com.example.placementicsbackend;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class BcryptPasswordHashGeneratorTest {

    @Test
    void generatePasswordHashForDefault123() {
        String plainPassword = "default123";
        String bcryptHash = new BCryptPasswordEncoder().encode(plainPassword);

        System.out.println("Password: " + plainPassword);
        System.out.println("Bcrypt hash: " + bcryptHash);
    }
}
