import {
  format,
  parseISO,
  getTime,
  differenceInCalendarDays,
  fromUnixTime,
  millisecondsToSeconds,
  differenceInDays,
  isToday,
  isThisWeek,
} from 'date-fns';

// document.addEventListener('click', (e) => {
//   console.dir(e.target);
// });

const mainEl = document.querySelector('main');
const inputProject = document.querySelector('#project');
const inputTodo = document.querySelector('#todo');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#content');
const inputDate = document.querySelector('#date');
const submitBtn = document.querySelector('button[type=submit]');
const form = document.querySelector('.modal-content > form');

const todoEl = document.querySelectorAll('.todo');

const dataArray = [
  // {
  //   type: 'project',
  //   title: 'manual project',
  //   projectCreatedDate: 1701626533536,
  //   todoes: [
  //     {
  //       createdDate: 1701616544536,
  //       todo: 'project todo1',
  //       dueDate: 1702162800000,
  //     },
  //     {
  //       createdDate: 1701616866536,
  //       todo: 'project todo2',
  //       dueDate: 1702192800000,
  //     },
  //   ],
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

  static filterByType(array, type) {
    const objects = array.filter((el) => el.type === type);
    return objects;
  }

  static getLocalData(array) {
    if (dataArray.length > 0) {
      const projects = Create.filterByType(array, 'project');

      for (const project of projects) {
        const [firstTodo, ...todoes] = project.todoes;
        Create.insertHtml(
          Project.projectHtml(
            project.projectCreatedDate,
            project.title,
            firstTodo.createdDate,
            firstTodo.todo,
            Create.showDate(firstTodo.dueDate),
            Create.addClassToDoneTodo(firstTodo),
            Create.isChecked(firstTodo)
          )
        );
        for (const todo of todoes) {
          Create.insertProjectTodoHtml(
            Project.projectTodoHtml(
              todo.createdDate,
              todo.todo,
              Create.showDate(todo.dueDate),
              Create.addClassToDoneTodo(todo),
              Create.isChecked(todo)
            )
          );
        }
      }

      const todoes = Create.filterByType(array, 'todo');
      for (const todo of todoes) {
        Create.insertHtml(
          Todo.todoHtml(
            todo.createdDate,
            todo.todo,
            Create.showDate(todo.dueDate),
            Create.addClassToDoneTodo(todo),
            Create.isChecked(todo)
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

  static getHtmlElementData(element, classNames) {
    for (const className of classNames) {
      const closestEl = element.closest(className);
      if (closestEl) {
        return {
          element: closestEl,
          createdDate: closestEl.dataset.createdDate,
          className: closestEl.className,
        };
      }
    }
    return null;
  }

  static getElementIndex(element) {
    const storedDataArray = JSON.parse(localStorage.getItem('dataArray'));

    const index = {
      project: undefined,
      todo: undefined,
    };

    if (element.className === 'todo') {
      index.todo = storedDataArray.findIndex(
        (obj) => obj.createdDate === +element.createdDate
      );
      return index;
    } else if (element.className === 'project-todo') {
      index.project = storedDataArray.findIndex(
        (project) =>
          project.projectCreatedDate ===
          +element.element.parentElement.dataset.createdDate
      );

      index.todo = storedDataArray[index.project].todoes.findIndex(
        (todo) => todo.createdDate === +element.createdDate
      );
      return index;
    } else if (element.className === 'project') {
      index.project = storedDataArray.findIndex(
        (project) => project.projectCreatedDate === +element.createdDate
      );

      index.todo = storedDataArray[index.project].todoes.findIndex(
        (todo) => todo.createdDate === +element.createdDate
      );
      return index;
    }

    // if (element.className === 'todo') {
    //   index.todo = storedDataArray.findIndex(
    //     (obj) => obj.createdDate === +element.createdDate
    //   );
    //   return index;
    // } else if (
    //   element.className === 'project-todo' ||
    //   element.className === 'project'
    // ) {
    //   // index.project = storedDataArray.findIndex(
    //   //   (obj) => obj.projectCreatedDate === +element.createdDate
    //   // );

    //   index.project = storedDataArray.findIndex(
    //     (project) =>
    //       project.projectCreatedDate ===
    //       +element.element.parentElement.dataset.createdDate
    //   );

    //   index.todo = storedDataArray[index.project].todoes.findIndex(
    //     (todo) => todo.createdDate === +element.createdDate
    //   );
    //   return index;
    // }
    // return null;
  }

  static saveLocalData() {
    localStorage.setItem('dataArray', JSON.stringify(dataArray));
  }

  static addTodoToProject(btn) {
    const index = Create.getElementIndex(
      Create.getHtmlElementData(btn, ['.project'])
    );
    console.log(index);

    const todo = new Todo(
      inputTodo.dataset.type,
      inputContent.value,
      Create.createDate(),
      getTime(new Date())
    );
    console.log(todo);

    dataArray[index.project].todoes.push(todo);

    // Create.insertHtml(
    // Todo.todoHtml(
    //     inputTodo.dataset.type,
    //     inputContent.value,
    //     Create.createDate(),
    //     getTime(new Date())
    //   )
    // );
  }

  static editTodo(btn) {
    const inputContent = document.querySelector('#content');

    const index = Create.getElementIndex(
      Create.getHtmlElementData(btn, ['.todo', '.project-todo'])
    );

    let todo;

    if (index.project != undefined) {
      todo = dataArray[index.project].todoes[index.todo];
    } else {
      todo = dataArray[index.todo];
    }

    todo.todo = inputContent.value;
    todo.dueDate = Create.createDate();
  }

  static todoEditingForm(btn) {
    const index = Create.getElementIndex(
      Create.getHtmlElementData(btn, ['.todo', '.project-todo'])
    );

    let el;

    if (index.project != undefined) {
      el = dataArray[index.project].todoes[index.todo];
    } else if (index.todo) {
      el = dataArray[index.todo];
    }

    const unixDueDate = fromUnixTime(millisecondsToSeconds(el.dueDate));
    const formattedDate = format(unixDueDate, 'yyyy-MM-dd');

    inputContent.value = el.todo;
    inputDate.value = formattedDate;
  }

  static deleteTodo(btn) {
    const index = Create.getElementIndex(
      Create.getHtmlElementData(btn, ['.todo', '.project-todo'])
    );

    const el = Create.getHtmlElementData(btn, ['.todo', '.project-todo']);

    if (el.className === 'todo') {
      el.element.remove();
      dataArray.splice(index.todo, 1);
    } else if (el.className === 'project-todo') {
      el.element.remove();
      dataArray[index.project].todoes.splice(index.todo, 1);
    }
    Create.saveLocalData();
  }

  static deleteProject(btn) {
    const index = Create.getElementIndex(
      Create.getHtmlElementData(btn, ['.project'])
    );
    console.log('projectDeleteBtns', index);

    const el = Create.getHtmlElementData(btn, ['.project']);

    el.element.remove();
    dataArray.splice(index.project, 1);
    Create.saveLocalData();
  }

  static insertHtml(html) {
    mainEl.insertAdjacentHTML('afterbegin', html);
  }

  static insertProjectTodoHtml(html) {
    const projectEl = mainEl.querySelector('.project');
    projectEl.insertAdjacentHTML('beforeend', html);
  }

  static removeHtmlElements() {
    const modalBtn = mainEl.querySelector('.btn-open-modal');

    while (mainEl.firstChild && mainEl.firstChild != modalBtn) {
      mainEl.removeChild(mainEl.firstChild);
    }
  }
  f;
  static addClassToDoneTodo(todo) {
    return todo.done ? 'todo-done' : '';
  }

  static isChecked(checkbox) {
    return checkbox.done ? checkbox.done : false;
  }

  static isDone() {
    const checkboxes = document.querySelectorAll('[data-checked]');

    checkboxes.forEach((checkbox) => {
      if (checkbox.getAttribute('data-checked') === 'true') {
        checkbox.checked = true;
      }
    });
  }

  static changeTodoClass(checkbox) {
    const index = Create.getElementIndex(
      Create.getHtmlElementData(btn, ['.todo', '.project-todo'])
    );

    // console.log(checkbox);

    let todo;

    if (index.project || index.project === 0) {
      todo = dataArray[index.project].todoes[index.todo];
    } else {
      todo = dataArray[index.todo];
    }

    if (todo.done) {
      todo.done = false;
    } else {
      todo.done = true;
    }

    const todoEl =
      checkbox.closest('.project-todo') || checkbox.closest('.todo');
    const todoText = todoEl.querySelector('.todo-text');
    todoText.classList.toggle('todo-done');

    Create.saveLocalData();
  }

  static filterByDay(array, day) {
    const arrayDeepCopy = structuredClone(array);
    const arr = [];

    arrayDeepCopy.forEach((project) => {
      if (project.todoes) {
        project.todoes = project.todoes.filter((todo) => {
          if (day === 1) {
            return isToday(todo.dueDate, Date.now());
          } else if (day === 7) {
            return isThisWeek(todo.dueDate, Date.now());
          } else;
        });

        if (project.todoes.length > 0) arr.push(project);
      }
    });

    arrayDeepCopy.forEach((el) => {
      if (el.type === 'todo') {
        let dayDiff;

        if (day === 1) {
          dayDiff = isToday(el.dueDate, Date.now());
        } else if (day === 7) {
          dayDiff = isThisWeek(el.dueDate, Date.now());
        }

        if (dayDiff) arr.push(el);
      }
    });

    return arr;
  }
}

class Project extends Create {
  constructor(type, title, projectCreatedDate, todo, createdDate, dueDate) {
    super();
    this.type = type;
    this.title = title;
    this.projectCreatedDate = projectCreatedDate;
    this.todoes = [{ createdDate, todo, dueDate, done: false }];
  }

  static projectHtml(
    projectCreatedDate,
    title,
    createdDate,
    todo,
    dueDate,
    done,
    checked
  ) {
    return `<div class="project" data-created-date="${projectCreatedDate}">
      <div class="project-heading">
        <h2>${title}</h2>
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
      <div class="project-todo" data-created-date="${createdDate}">
        <label contenteditable="false" class="todo-checkbox-container">
          <input
            type="checkbox"
            name="todo-checkbox"
            class="todo-checkbox"
            aria-label="todo checkbox"
            data-checked="${checked}"
          />
          <span class="checkmark"></span>
        </label>
        <div class="todo-text ${done}">
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
                  <button class="todo-btn-edit" data-id-btn>Edit</button>
                </li>
                <li>
                  <button class="todo-btn-delete" data-id-btn>Delete</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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

  static projectTodoHtml(createdDate, todo, dueDate, done, checked) {
    return `<div class="project-todo" data-created-date="${createdDate}">
    <label contenteditable="false" class="todo-checkbox-container">
      <input
        type="checkbox"
        name="todo-checkbox"
        class="todo-checkbox"
        aria-label="todo checkbox"
        data-checked="${checked}"
      />
      <span class="checkmark"></span>
    </label>
    <div class="todo-text ${done}">
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
              <button class="todo-btn-edit" data-id-btn>Edit</button>
            </li>
            <li>
              <button class="todo-btn-delete" data-id-btn>Delete</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    `;
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

  static todoHtml(createdDate, todo, dueDate, done, checked) {
    return `<div class="todo" data-created-date="${createdDate}">
  <div class="todo-content-container">
    <label class="todo-checkbox-container">
      <input
        type="checkbox"
        name="todo-checkbox"
        class="todo-checkbox"
        aria-label="todo checkbox"
        data-checked="${checked}"
      />
      <span class="checkmark"></span>
    </label>
    <div class="todo-text ${done}">
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
            <li><button class="todo-btn-edit" data-id-btn>Edit</button></li>
            <li><button class="todo-btn-delete" data-id-btn>Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  }
}

const home = document.querySelector('.nav-home').children[0];

home.addEventListener('click', () => {
  Create.removeHtmlElements();
});

window.addEventListener('load', (e) => {
  console.log('page is fully loaded');

  if (localStorage.dataArray) {
    const storedDataArray = JSON.parse(localStorage.getItem('dataArray'));
    dataArray.push(...storedDataArray);
  }
  Create.getLocalData(dataArray);
  console.log(dataArray);

  console.log('today', Create.filterByDay(dataArray, 1));
  console.log('this week', Create.filterByDay(dataArray, 7));

  Create.isDone();
});

let btn;

document.querySelector('main').addEventListener('click', (e) => {
  btn = e.target;
  //TODO change this to not use global variable if possible.
  // clickedBtn = e.target;

  if (btn.className === 'todo-btn-delete') {
    Create.deleteTodo(btn);
  } else if (btn.className === 'btn-close project-delete') {
    Create.deleteProject(btn);
  } else if (btn.className === 'todo-btn-edit') {
    Create.todoEditingForm(btn);
  } else if (btn.className === 'todo-checkbox') {
    Create.changeTodoClass(btn);
  }
});

form.addEventListener('submit', (e) => {
  // submitBtn.addEventListener('click', () => {
  e.preventDefault();

  if (form.parentElement.dataset.mode === 'create') {
    if (inputProject.checked) {
      const project = new Project(
        inputProject.dataset.type,
        inputTitle.value,
        getTime(new Date()),
        inputContent.value,
        getTime(new Date()),
        Create.createDate()
      );
      dataArray.push(project);
    } else if (inputTodo.checked) {
      const todo = new Todo(
        inputTodo.dataset.type,
        inputContent.value,
        Create.createDate(),
        getTime(new Date())
      );
      dataArray.push(todo);
    }
  } else if (form.parentElement.dataset.mode === 'edit') {
    Create.editTodo(btn);
  } else if (form.parentElement.dataset.mode === 'add-todo') {
    Project.addTodoToProject(btn);
  }

  Create.saveLocalData();
  Create.removeHtmlElements();
  Create.getLocalData(dataArray);
});

function log() {
  console.log('dataArray', dataArray);
  const storedDataArray = JSON.parse(localStorage.getItem('dataArray'));
  console.log('storedDataArray', storedDataArray);
  // console.dir(form);
  // document.addEventListener('click', (e) => {
  // });
  // console.log(projectInputContainer);
  // const testEl = mainEl.querySelector('.project');
  // console.dir(testEl);
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) log();
});
