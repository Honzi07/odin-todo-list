// document.addEventListener('click', (e) => console.dir(e.target));

const mainEl = document.querySelector('main');
const inputProject = document.querySelector('#project');
const inputTodo = document.querySelector('#todo');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#content');
const inputDate = document.querySelector('#date');
const submitBtn = document.querySelector('button[type=submit]');
const form = document.querySelector('.modal-content > form');

const dataArray = [
  {
    type: 'project',
    title: 'dataArrayTest',
    todoes: [{ todo: '2', date: '2023-11-21' }],
  },
];

// function test() {
//   const projects = todoesArray.filter((todo) => todo.type === 'project');
//   console.log(projects);
// }

class Create {
  static createDate() {
    if (!inputDate.value) {
      return new Date().toISOString().split('T')[0];
    } else {
      return inputDate.value;
    }
  }

  static getData() {
    if (localStorage.getItem('dataArray')) {
      const storedProjects = JSON.parse(localStorage.getItem('dataArray'));

      for (const project of storedProjects) {
        const todoes = project.todoes;
        for (const todo of todoes) {
          Create.insertHtml(
            Project.projectHtml(project.title, todo.todo, todo.date)
          );
        }
      }
    }
  }

  static insertHtml(html) {
    mainEl.insertAdjacentHTML('afterbegin', html);
  }
}

class Project extends Create {
  constructor(type, title, todo, date) {
    super();
    this.type = type;
    this.title = title;
    this.todoes = [{ todo, date }];
  }

  // pushData(todo, date) {
  //   this.todoes.push(todo, date);
  // }

  // static createDate() {
  //   if (!inputDate.value) {
  //     return new Date().toISOString().split('T')[0];
  //   } else {
  //     return inputDate.value;
  //   }
  // }

  // static insertHtml(html) {
  //   mainEl.insertAdjacentHTML('afterbegin', html);
  // }

  static projectHtml(title, todo, date) {
    return `<div class="project">
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
      <div class="project-todo">
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
          <span class="todo-date">${date}</span>
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
  constructor(type, todo, date) {
    super();
    this.type = type;
    this.todo = todo;
    this.date = date;
  }

  static todoHtml = `
  <div class="todo">
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
        TEST TODO TEXT
      </p>
    </div>
    <div class="todo-info-container">
      <span class="todo-date">Aug 20</span>
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

window.addEventListener('load', (e) => {
  console.log('page is fully loaded');
  const storedProjects = JSON.parse(localStorage.getItem('dataArray'));
  console.log('The stored object', storedProjects);

  // for (const project of storedProjects) {
  //   console.log(project);
  // }

  Create.getData();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputProject.checked) {
    const project = new Project(
      inputProject.dataset.type,
      inputTitle.value,
      inputContent.value,
      Create.createDate()
    );

    console.log(project);
    dataArray.push(project);
    localStorage.setItem('dataArray', JSON.stringify(dataArray));

    Create.insertHtml(
      Project.projectHtml(
        inputTitle.value,
        inputContent.value,
        Create.createDate()
      )
    );
  } else if (inputTodo.checked) {
    const todo = new Todo(
      inputTodo.dataset.type,
      inputContent.value,
      Create.createDate()
    );
    console.log(todo);
    dataArray.push(todo);
    localStorage.setItem('dataArray', JSON.stringify(dataArray));

    Create.insertHtml(Todo.todoHtml);
  }

  // const project = new Project(inputTitle.value, Project.createDate());
  // project.pushData(inputContent.value);

  // console.log(project);
});

const modalCloseBtn = document.querySelector('.modal-close');
function log() {
  console.log(dataArray);
  // const storedProjects = JSON.parse(localStorage.getItem('dataArray'));
  // console.log('The stored object', storedProjects);

  // console.log(Project.insertHtml);
  // console.log(Project.projectHtml);
}

modalCloseBtn.addEventListener('mouseenter', () => {
  log();
  // test();
});
