package xyz.t.oiwa.todo.restful.web.services.jwt;

public class AuthenticationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}