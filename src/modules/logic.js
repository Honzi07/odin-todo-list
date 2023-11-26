import { format, parseISO, getTime, differenceInCalendarDays } from 'date-fns';

const mainEl = document.querySelector('main');
const inputProject = document.querySelector('#project');
const inputTodo = document.querySelector('#todo');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#content');
const inputDate = document.querySelector('#date');
const submitBtn = document.querySelector('button[type=submit]');
const form = document.querySelector('.modal-content > form');

const todoEl = document.querySelectorAll('.todo');
const todoDeleteBtn = document.querySelectorAll('.todo-btn-delete');

const dataArray = [
  // {
  //   type: 'project',
  //   title: 'dataArrayTest',
  //   todoes: [{ todo: 'dataArray', date: '2023-11-21' }],
  // },
];
class Create {
  static createDate() {
    if (!inputDate.value) {
      return Date.now();
    } else {
      return getTime(parseISO(inputDate.value));
    }
  }

  static filterStoredObjects(type) {
    const storedProjects = JSON.parse(localStorage.getItem('dataArray'));
    const objects = storedProjects.filter((el) => el.type === type);
    return objects;
  }

  static getLocalData() {
    if (localStorage.getItem('dataArray')) {
      const projects = Create.filterStoredObjects('project');

      for (const project of projects) {
        const todoes = project.todoes;
        for (const todo of todoes) {
          Create.insertHtml(
            Project.projectHtml(
              project.projectCreatedDate,
              project.title,
              todo.createdDate,
              todo.todo,
              Create.showDate(todo.dueDate)
            )
          );
        }
      }

      const todoes = Create.filterStoredObjects('todo');
      for (const todo of todoes) {
        Create.insertHtml(
          Todo.todoHtml(
            todo.createdDate,
            todo.todo,
            Create.showDate(todo.dueDate)
          )
        );
      }
    }
  }

  static showDate(date) {
    if (differenceInCalendarDays(date, new Date()) >= 365) {
      return format(date, 'RR MMM dd');
    } else {
      return format(date, 'MMM dd');
    }
  }

  static insertHtml(html) {
    mainEl.insertAdjacentHTML('afterbegin', html);
  }
}

class Project extends Create {
  constructor(type, title, projectCreatedDate, todo, createdDate, dueDate) {
    super();
    this.type = type;
    this.title = title;
    this.projectCreatedDate = projectCreatedDate;
    this.todoes = [{ createdDate, todo, dueDate }];
  }

  static projectHtml(projectCreatedDate, title, createdDate, todo, dueDate) {
    return `<div class="project" data-created-date="${projectCreatedDate}">
      <div class="project-heading">
        <h2>${title}</h2>
        <button class="btn-close project-close">
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
      </div>
      <div class="project-todo" data-created-date="${createdDate}">
        <label class="todo-checkbox-container">
          <input
            type="checkbox"
            name="todo-checkbox"
            class="todo-checkbox"
            aria-label="todo checkbox"
          />
          <span class="checkmark"></span>
        </label>
        <div class="todo-text">
          <p>
            ${todo}
          </p>
        </div>
        <div class="todo-info-container">
          <span class="todo-date">${dueDate}</span>
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
                <li>
                  <button class="todo-btn-edit">Edit</button>
                </li>
                <li>
                  <button class="todo-btn-delete">Delete</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="project-input-container">
        <button type="button" aria-label="add task"></button>
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

class Todo extends Create {
  constructor(type, todo, dueDate, createdDate) {
    super();
    this.type = type;
    this.todo = todo;
    this.dueDate = dueDate;
    this.createdDate = createdDate;
  }

  static todoHtml(createdDate, todo, dueDate) {
    return `<div class="todo" data-created-date="${createdDate}">
  <div class="todo-content-container">
    <label class="todo-checkbox-container">
      <input
        type="checkbox"
        name="todo-checkbox"
        class="todo-checkbox"
        aria-label="todo checkbox"
      />
      <span class="checkmark"></span>
    </label>
    <div class="todo-text">
      <p>
        ${todo}
      </p>
    </div>
    <div class="todo-info-container">
      <span class="todo-date">${dueDate}</span>
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
            <li><button class="todo-btn-edit">Edit</button></li>
            <li><button class="todo-btn-delete">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  }
}

window.addEventListener('load', (e) => {
  console.log('page is fully loaded');

  if (localStorage.dataArray) {
    const storedDataArray = JSON.parse(localStorage.getItem('dataArray'));
    dataArray.push(...storedDataArray);
  }
  Create.getLocalData();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputProject.checked) {
    const project = new Project(
      inputProject.dataset.type,
      inputTitle.value,
      getTime(new Date()),
      inputContent.value,
      getTime(new Date()),
      Create.createDate()
    );
    console.log(project);
    dataArray.push(project);
  } else if (inputTodo.checked) {
    const todo = new Todo(
      inputTodo.dataset.type,
      inputContent.value,
      Create.createDate(),
      getTime(new Date())
    );
    console.log(todo);
    dataArray.push(todo);
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
  Create.getLocalData();
});

function log() {
  console.log('dataArray', dataArray);
  const storedProjects = JSON.parse(localStorage.getItem('dataArray'));
  console.log('The stored object', storedProjects);
}
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) log();
});
