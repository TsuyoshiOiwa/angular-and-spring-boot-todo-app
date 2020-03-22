package xyz.t.oiwa.todo.restful.web.services.helloworld;

public class HelloWorldBean {

    private String message;

    public HelloWorldBean(String message) {
        this.message = message;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String mesage) {
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format("HelloWorldBean[message=%s]", message);
    }

}