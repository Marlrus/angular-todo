# AngularTodo

This is a project to learn how to do CRUD operations using Angular.

## Todo Component

We erase everything in the App component and then create a new component using `ng g c components/Todos` which is shorthand for **ng generate component xyz**.

We can see in the **app.module.ts** that the import for the file was created and the component was added into the **declarations** of our module.

Here we have 3 things, a div for the id, a div for the content, and a button to delete.

### Model

We need to create a model to structure how our Todo looks. For some reason I couldn't export an **interface** and had to use a class:

```typescript
export class Todo {
  content: string;
  completed: boolean;
}
```

We import it into our component and use it in the property that we create in the class. Then we create an array inside of our **ngOnInit** which is the **useEffect** equivalent:

```typescript
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor() {}

  ngOnInit(): void {
    this.todos = [
      {
        content: "First todo",
        completed: true,
      },
      {
        content: "Second todo",
        completed: true,
      },
    ];
  }
}
```

### Iteration

We want to iterate over these in our template. We can iterate over them with the **ngFor** directive:

```html
<div class="todo" *ngFor="let todo of todos; let i = index"></div>
```

As a note, you **cannot use const here**.

```html
<div class="todos">
  <div class="todo" *ngFor="let todo of todos; let i = index">
    <div class="id">{{ i }}</div>
    <div class="content">{{ todo.content }}</div>
    <button class="delete">Delete</button>
  </div>
</div>
```

Here we iterate over the todos we created in the init, and use the value in the template throught the {{}} syntax.

### Methods

For the completed styling we use logic inside of our class with the same template syntax:

```html
<div
  *ngFor="let todo of todos; let i = index"
  class="todo {{ todo.completed ? 'done' : '' }}"
></div>
```

We create a method to change the completed prop in our todos in order to apply the styling that we want. This we do via a toggle using map:

```typescript
  toggleDone(id: number) {
    this.todos.map((todo, i) => {
      if (i !== id) return todo;
      return (todo.completed = !todo.completed);
    });
  }
```

To remove the todo I had a crack at it but didn't get any results because you **have to be imperative**. Therefore we can use filter but we need to assign the return to the property in our class:

```typescript
  removeTodo(id: number) {
    this.todos = this.todos.filter((_, i) => i !== id);
  }
```

**Note** The strange thing is that **map** worked without having to do this.
