import { Component, OnInit } from "@angular/core";
import { TodoDataService } from "../service/data/todo-data.service";
import { Todo } from "../list-todos/list-todos.component";
import { ActivatedRoute, Router } from "@angular/router";
import { BasicAuthenticationService } from "../service/basic-authentication.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  id: number;
  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private service: TodoDataService,
    private router: Router,
    private authService: BasicAuthenticationService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.todo = new Todo(this.id, "", false, new Date());

    if (this.id != -1) {
      this.service
        .retrieveTodo(this.authService.getAuthenticatedUser(), this.id)
        .subscribe(data => (this.todo = data));
    }
  }

  saveTodo() {
    console.log(this.todo)
    if(this.id == -1) {
      this.service.createTodo(this.authService.getAuthenticatedUser(), this.todo)
        .subscribe(
          data => {
            this.router.navigate(["todos"])
          }
        )
    } else {
      this.service.updateTodo(this.authService.getAuthenticatedUser(), this.id, this.todo).subscribe(data => { console.log(data);
        this.router.navigate(["todos"]);
        // this.todo = data
      });
    }
  }
}
