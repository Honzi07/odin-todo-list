import Create from './create';

export default class Project extends Create {
  constructor(title, tasks, id) {
    super();
    this.type = 'project';
    this.title = title;
    this.tasks = tasks || [];
    this.id = id || new Date().getTime();
  }

  storeTodoInTasks(todo) {
    this.tasks.push(todo);
  }

  get getTasks() {
    return this.tasks;
  }

  projectHTML(todo = '') {
    return `<div class="project masonry-item" data-id="${this.id}">
      <div class="project-heading">
        <h2>${this.title}</h2>
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
                <li><button class="btn-add-project-todo" data-btn-type="add-todo">Add Todo</button></li>
                <li><button class="project-delete">Delete</button></li>
              </ul>
            </div>
          </div>
      </div>
        ${todo}
    </div>`;
  }
}
