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

## Add Todo

For this part we need to create a **form** with an input:

```html
<form>
  <input
    type="text"
    name="inputTodo"
    placeholder="Enter todo..."
    class="todo-input"
  />
</form>
```

To use the input we first need to create the property in our class.

```typescript
  public inputTodo: string = ""
```

We need access to **ngModel**, but to do this we need to import a module in our app.module:

```typescript
import { FormsModule } from "@angular/forms";
```

And then add it to our imports:

```typescript
  imports: [BrowserModule, FormsModule],
```

This allows us to use **ngModel** in our template:

```html
<form>
  <input
    type="text"
    name="inputTodo"
    placeholder="Enter todo..."
    class="todo-input"
    [(ngModel)]="inputTodo"
  />
  <input type="submit" value="Add Todo" class="todo-submit" />
</form>
```

This pattern is bizzare because we use an input to submit instead of a button.

We create the method to add our todo using **push**:

```typescript
  addTodo() {
    this.todos.push({
      content: this.inputTodo,
      completed: false,
    });
    this.inputTodo = ""
  }
```

This won't work because we need to bind it to our form's submit handler:

```html
<form (submit)="addTodo()"></form>
```

Once this is done, our todo list works. This is strange because I'm missing out on what **ngModel** does exactly and I'm sure there are more ways to handle forms in Angular. However this was a very simple app and I can relate it well with what would have to be done in React.
