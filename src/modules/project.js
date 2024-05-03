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
    return `<div class="project" data-id="${this.id}">
      <div class="project-heading">
        <h2>${this.title}</h2>
        <button class="btn-close project-delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg>
        </button>
        <button class="btn-add-project-todo">ADD TODO</button>
      </div>
        ${todo}
      <div class="project-input-container">
        <button type="button" aria-label="add task" data-id-btn></button>
        <input
          type="text"
          name="project-input"
          placeholder="Add task"
          aria-label="enter task"
        />
      </div>
    </div>`;
  }
}
