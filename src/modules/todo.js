import Create from './create';

export default class Todo extends Create {
  constructor(description, dueDate) {
    super();
    this.type = 'todo';
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
    this.id = new Date().getTime();
  }
}

// const todo = new Todo();
// console.log(todo);
