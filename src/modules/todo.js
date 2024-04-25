import Create from './create';

class Todo extends Create {
  constructor(type, description, dueDate) {
    super();
    this.type = type;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }
}

const todo = new Todo();
console.log(todo);
