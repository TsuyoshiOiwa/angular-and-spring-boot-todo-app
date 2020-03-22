import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos = [
    new Todo(1, 'Learn to Dance', false, new Date()),
    new Todo(2, 'Become an Expert at Angular', false, new Date()),
    new Todo(3, 'Visit India', false, new Date()),
    new Todo(4, 'Learn to Dance', false, new Date()),
    {id: 5, description: 'aiueo'},
  ]

  message: string

  constructor(
    private service: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos() {
    this.service.retrieveAllTodos('ooiwa').subscribe(
      response => {
        console.log(response)
        this.todos = response
      }
    )
  }

  updateTodo(id) {
    this.router.navigate(['todos', id])
    console.log(`update Todo ${id}`)
  }

  deleteTodo(id) {
    this.service.deleteTodo('ooiwa', id).subscribe(
      response => {
        this.message = `Delete of Todo ${id} successful`
        this.refreshTodos()
        console.log(response)
      }
    )
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }

}
