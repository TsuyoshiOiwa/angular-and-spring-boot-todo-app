package xyz.t.oiwa.todo.restful.web.services.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoJpaResource {

    private TodoHardCodedService service;

    private TodoJpaRepository repository;

    public TodoJpaResource(@Autowired TodoJpaRepository repository){
        this.repository = repository;
    }

    @GetMapping("users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username){
        return repository.findByUsername(username);
    }

    @GetMapping("users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable long id){
        return repository.findById(id).get();
        // return service.findById(id);
    }

    @PutMapping("users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(
        @PathVariable String username, @PathVariable long id, @RequestBody Todo todo){
        Todo todoUpdated = repository.save(todo);
        return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
    }

    @PostMapping("users/{username}/todos")
    public ResponseEntity<Todo> insertTodo(
        @PathVariable String username,
        @RequestBody Todo todo
    ){
        todo.setUsername(username);
        Todo createdTodo = repository.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(createdTodo.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}