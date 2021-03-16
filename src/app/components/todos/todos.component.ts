import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  public todos: Todo[];
  public inputTodo: string = '';

  constructor() {}

  ngOnInit(): void {
    this.todos = [
      {
        content: 'First todo',
        completed: false,
      },
      {
        content: 'Second todo',
        completed: false,
      },
    ];
  }

  toggleDone(id: number) {
    this.todos.map((todo, i) => {
      if (i !== id) return todo;
      return (todo.completed = !todo.completed);
    });
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((_, i) => i !== id);
  }

  addTodo() {
    this.todos.push({
      content: this.inputTodo,
      completed: false,
    });
    this.inputTodo = '';
  }
}
