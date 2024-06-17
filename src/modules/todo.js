import Create from './create';
import { format, isThisYear } from 'date-fns';

export default class Todo extends Create {
  constructor(description, dueDate, id, completed) {
    super();
    this.type = 'todo';
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed || false;
    this.id = id || new Date().getTime();
  }

  changeCompleted() {
    this.completed = this.completed ? false : true;
  }

  formattedDate() {
    return isThisYear(this.dueDate)
      ? format(this.dueDate, 'MMM. d, eee.')
      : format(this.dueDate, 'y. MMM. d, eee.');
  }

  todoHTML() {
    return `<div class="todo" data-id="${this.id}">
  <div class="todo-content-container">
    <label class="todo-checkbox-container">
      <input
        type="checkbox"
        name="todo-checkbox"
        class="todo-checkbox"
        aria-label="todo checkbox"
        ${this.completed ? 'checked' : ''}
      />
      <span class="checkmark"></span>
    </label>
    <div class="todo-text ${this.completed ? 'todo-done' : ''}">
      <p>
        ${this.description}
      </p>
    </div>
    <div class="todo-info-container">
      <span class="todo-date">${this.formattedDate()}</span>
      <div class="todo-dropdown-container">
        <button class="todo-btn-dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M156 128a28 28 0 1 1-28-28a28 28 0 0 1 28 28ZM48 100a28 28 0 1 0 28 28a28 28 0 0 0-28-28Zm160 0a28 28 0 1 0 28 28a28 28 0 0 0-28-28Z"
            />
          </svg>
        </button>
        <div class="todo-dropdown-content">
          <ul>
            <li><button class="todo-btn-edit"  data-btn-type="edit">Edit</button></li>
            <li><button class="todo-btn-delete"  data="delete">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  }

  updateDOMElement(el) {
    el.querySelector('.todo-text').textContent = this.description;
    el.querySelector('.todo-date').textContent = this.dueDate;
  }
}
