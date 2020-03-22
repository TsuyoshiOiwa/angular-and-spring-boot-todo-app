package xyz.t.oiwa.todo.restful.web.services.jwt;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class BCryptEncoderTest {

    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        String hash = encoder.encode("password");
        System.out.println(hash);
    }

}