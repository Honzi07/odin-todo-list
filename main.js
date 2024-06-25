/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/create.js":
/*!*******************************!*\
  !*** ./src/modules/create.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Create)
/* harmony export */ });
class Create {
  static tasksArr = [];
  constructor() {
    this.getLocalData();
  }
  storeElement(el) {
    Create.tasksArr.push(el);
  }
  saveTasksInLocal() {
    localStorage.setItem('tasks', JSON.stringify(Create.tasksArr));
  }
  getLocalData() {
    const localData = localStorage.getItem('tasks');
    if (localData) {
      Create.tasksArr = JSON.parse(localData);
    }
  }
  get getTasks() {
    return Create.tasksArr;
  }
  isNumber(variable) {
    return typeof variable === 'number';
  }
  filterTasksByType(type) {
    return Create.tasksArr.filter(obj => obj.type === type);
  }
  getClickedElement(ev, arr) {
    const closestTodo = ev.target.closest('.todo');
    const closestProject = ev.target.closest('.project');
    let todo;
    let project;
    if (closestTodo && closestProject) {
      const projectData = arr.find(el => el.id === +closestProject.dataset.id);
      if (projectData) {
        project = projectData;
        todo = project.tasks.find(el => el.id === +closestTodo.dataset.id);
      }
    } else if (closestTodo) {
      todo = arr.find(el => el.id === +closestTodo.dataset.id);
    } else if (closestProject) {
      project = arr.find(el => el.id === +closestProject.dataset.id);
    }
    return {
      todo,
      project,
      element: {
        todoEl: closestTodo,
        projectEl: closestProject
      }
    };
  }
  getClickedElementIndex(ev, arr) {
    const clickedEL = this.getClickedElement(ev, arr);
    let todo, project;
    const todoInProjectIndex = () => {
      return clickedEL.project.tasks.findIndex(el => el.id === clickedEL.todo.id);
    };
    const todoOrProjectIndex = type => {
      return arr.findIndex(el => el.id === clickedEL[type].id);
    };
    if (clickedEL.todo && clickedEL.project) {
      project = todoOrProjectIndex('project');
      todo = todoInProjectIndex();
    } else if (clickedEL.todo) {
      todo = todoOrProjectIndex('todo');
    } else if (clickedEL.project) {
      project = todoOrProjectIndex('project');
    }
    return {
      project,
      todo
    };
  }
  updateElementInArray(newTask, arr, tIndex, pIndex) {
    if (this.isNumber(tIndex) && this.isNumber(pIndex)) {
      arr[pIndex].tasks[tIndex] = newTask;
      return;
    }
    if (this.isNumber(tIndex)) {
      arr[tIndex] = newTask;
      return;
    }
  }
  removeElementFromArray(arr, tIndex, pIndex) {
    if (this.isNumber(tIndex) && this.isNumber(pIndex)) {
      arr[pIndex].tasks.splice(tIndex, 1);
      return;
    }
    if (this.isNumber(tIndex)) {
      arr.splice(tIndex, 1);
      return;
    }
    if (this.isNumber(pIndex)) {
      arr.splice(pIndex, 1);
      return;
    }
  }
  filterProjectsByDueDate(dateInterval) {
    return this.filterTasksByType('project').map(project => {
      const newTasks = project.tasks.filter(el => dateInterval(el.dueDate));
      return {
        ...project,
        tasks: newTasks
      };
    }).filter(project => project.tasks.length > 0);
  }
  filterTodosByDueDate(dateInterval) {
    return this.filterTasksByType('todo').filter(todo => dateInterval(todo.dueDate));
  }
  insertHtml(parentEl, html) {
    parentEl.insertAdjacentHTML('afterbegin', html);
  }
}

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DOM)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isToday/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisWeek/index.js");
/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManager */ "./src/modules/domManager.js");
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! masonry-layout */ "./node_modules/masonry-layout/masonry.js");
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(masonry_layout__WEBPACK_IMPORTED_MODULE_1__);



class DOM {
  clickedElData;
  masonry;
  constructor() {
    this.domManager = new _domManager__WEBPACK_IMPORTED_MODULE_0__["default"](this.allElements);
    this.handleMasonryLayout();
  }
  get elementSelector() {
    return {
      mainEl: document.querySelector('main'),
      form: document.querySelector('#modal-form'),
      modal: document.querySelector('.modal'),
      asideEl: document.querySelector('aside'),
      fieldsetRadio: document.querySelector('.input-radio'),
      todoEl: document.querySelector('.todo'),
      projectEL: document.querySelector('.project')
    };
  }
  get inputSelector() {
    return {
      inputProject: document.querySelector('#project'),
      inputTodo: document.querySelector('#todo'),
      inputTitle: document.querySelector('#title'),
      inputContent: document.querySelector('#content'),
      inputDate: document.querySelector('#date')
    };
  }
  get buttonSelector() {
    return {
      btnShowAll: document.querySelector('.btn-show-all'),
      btnToday: document.querySelector('.btn-today'),
      btnProjectToday: document.querySelector('.btn-project-today'),
      btnTodoToday: document.querySelector('.btn-todo-today'),
      btnWeek: document.querySelector('.btn-week'),
      btnProjectWeek: document.querySelector('.btn-project-week'),
      btnTodoWeek: document.querySelector('.btn-todo-week'),
      btnOpenModal: document.querySelector('.btn-open-modal'),
      btnCloseModal: document.querySelector('.modal-close'),
      btnSubmit: document.querySelector('button[type=submit]'),
      btnMobileMenu: document.querySelector('.btn-menu')
    };
  }
  get allElements() {
    return {
      ...this.elementSelector,
      ...this.inputSelector,
      ...this.buttonSelector
    };
  }
  handleMasonryLayout() {
    const mainEl = this.allElements.mainEl;
    this.masonry = new (masonry_layout__WEBPACK_IMPORTED_MODULE_1___default())(mainEl, {
      itemSelector: 'main > .masonry-item',
      columnWidth: '.masonry-item',
      percentPosition: true,
      gutter: 20,
      transitionDuration: '0.3s'
    });
  }
  handleFormCreateMode(createClass, projectClass, todoClass) {
    const {
      mainEl,
      inputProject,
      inputTodo
    } = this.allElements;
    const input = this.getModalInputValues();
    if (inputProject.checked) {
      const project = new projectClass(input.title);
      const todo = new todoClass(input.description, input.date);
      project.insertHtml(mainEl, project.projectHTML(todo.todoHTML()));
      project.storeTodoInTasks(todo);
      createClass.storeElement(project);
      this.masonry.prepended(this.allElements.projectEL);
    }
    if (inputTodo.checked) {
      const todo = new todoClass(input.description, input.date);
      todo.insertHtml(mainEl, todo.todoHTML());
      createClass.storeElement(todo);
      this.masonry.prepended(this.allElements.todoEl);
    }
  }
  handleFormAddTodoMode(createClass, projectClass, todoClass) {
    const input = this.getModalInputValues();
    const pData = this.clickedElData.elData.project;
    const pIndex = this.clickedElData.index.project;
    const project = new projectClass(pData.title, pData.tasks, pData.id);
    const todo = new todoClass(input.description, input.date);
    this.clickedElData.htmlEl.projectEl.insertAdjacentHTML('beforeend', todo.todoHTML());
    project.storeTodoInTasks(todo);
    createClass.updateElementInArray(project, createClass.getTasks, pIndex);
  }
  clearMainContent() {
    const mainEl = this.allElements.mainEl;
    const btn = this.allElements.btnOpenModal;
    mainEl.innerHTML = '';
    mainEl.appendChild(btn);
  }
  handleFormEditMode(createClass, todoClass) {
    const input = this.getModalInputValues();
    const todoId = this.clickedElData.elData.todo.id;
    const todoIndex = this.clickedElData.index.todo;
    const projectIndex = this.clickedElData.index.project;
    const targetEl = this.clickedElData.htmlEl.todoEl;
    const todo = new todoClass(input.description, input.date, todoId);
    const arr = createClass.getTasks;
    todo.updateDOMElement(targetEl);
    targetEl.insertAdjacentHTML('beforebegin', todo.todoHTML());
    targetEl.remove();
    createClass.updateElementInArray(todo, arr, todoIndex, projectIndex);
  }
  updateModalForAddTodoMode() {
    const el = this.allElements;
    el.mainEl.addEventListener('click', ev => {
      if (ev.target.dataset.btnType === 'add-todo') {
        const pData = this.clickedElData.elData.project;
        el.inputTitle.labels[0].classList.add('float-label');
        el.inputTitle.value = pData.title;
        el.inputContent.setAttribute('required', '');
        el.inputDate.setAttribute('required', '');
      }
    });
  }
  updateModalForEditMode() {
    const el = this.allElements;
    el.mainEl.addEventListener('click', ev => {
      if (ev.target.classList.contains('todo-btn-edit')) {
        const elData = this.clickedElData.elData;
        if (elData.project) {
          el.inputTitle.value = elData.project.title;
        }
        el.inputContent.value = elData.todo.description;
        el.inputDate.valueAsNumber = elData.todo.dueDate;
        el.inputContent.setAttribute('required', '');
        el.inputDate.setAttribute('required', '');
      }
    });
  }
  saveClickedHtmlElData(createClass) {
    const mainEl = this.allElements.mainEl;
    const classListArray = ['todo-btn-edit', 'btn-add-project-todo', 'todo-btn-delete', 'project-delete', 'todo-checkbox'];
    const hasClassInArray = event => classListArray.some(name => event.target.classList.contains(name));
    mainEl.addEventListener('click', ev => {
      if (hasClassInArray(ev)) {
        const elIndex = createClass.getClickedElementIndex(ev, createClass.getTasks);
        const {
          element,
          ...projectAndTodo
        } = createClass.getClickedElement(ev, createClass.getTasks);
        const getDefinedEntries = variable => {
          return Object.fromEntries(Object.entries(variable).filter(_ref => {
            let [, value] = _ref;
            return value !== undefined && value !== null;
          }));
        };
        this.clickedElData = {
          index: getDefinedEntries(elIndex),
          elData: getDefinedEntries(projectAndTodo),
          htmlEl: getDefinedEntries(element)
        };
        console.log(this.clickedElData);
      }
    });
  }
  handleFormModes(createClass, projectClass, todoClass) {
    const form = this.allElements.form;
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      if (form.dataset.mode === 'create') {
        this.handleFormCreateMode(createClass, projectClass, todoClass);
      } else if (form.dataset.mode === 'add-todo') {
        this.handleFormAddTodoMode(createClass, projectClass, todoClass);
      } else if (form.dataset.mode === 'edit') {
        this.handleFormEditMode(createClass, todoClass);
      }
      createClass.saveTasksInLocal();
      this.masonry.layout();
    });
  }
  removeClickedElement(createClass, arr) {
    const mainEl = this.allElements.mainEl;
    mainEl.addEventListener('click', ev => {
      if (ev.target.classList.contains('todo-btn-delete') || ev.target.classList.contains('project-delete')) {
        const evTargetEl = ev.target.closest('.todo') || ev.target.closest('.project');
        this.masonry.remove(evTargetEl);
        evTargetEl.remove();
        const index = this.clickedElData.index;
        createClass.removeElementFromArray(arr, index.todo, index.project);
        this.masonry.layout();
        createClass.saveTasksInLocal();
      }
    });
  }
  setMinDate() {
    function currentDate() {
      return new Date().toISOString().split('T')[0];
    }
    this.allElements.inputDate.setAttribute('min', currentDate());
  }
  getModalInputValues() {
    const inputTitle = document.querySelector('#title');
    const inputContent = document.querySelector('#content');
    const inputDate = document.querySelector('#date');
    return {
      title: inputTitle.value,
      description: inputContent.value,
      date: inputDate.valueAsNumber
    };
  }
  displayTodo(todoArr, todoClass) {
    const mainEl = this.allElements.mainEl;
    todoArr.forEach(el => {
      const todo = new todoClass(el.description, el.dueDate, el.id, el.completed);
      todo.insertHtml(mainEl, todo.todoHTML());
      this.masonry.appended(this.allElements.todoEl);
      this.masonry.layout();
    });
  }
  displayProject(projectArr, projectClass, todoClass) {
    const mainEl = this.allElements.mainEl;
    projectArr.forEach(el => {
      const project = new projectClass(el.title, el.tasks, el.id);
      project.insertHtml(mainEl, project.projectHTML());
      const projectEl = this.allElements.projectEL;
      project.tasks.forEach(task => {
        const todo = new todoClass(task.description, task.dueDate, task.id, task.completed);
        projectEl.insertAdjacentHTML('beforeend', todo.todoHTML());
      });
      this.masonry.appended(projectEl);
    });
    this.masonry.layout();
  }
  checkboxEventHandler(createClass, todoClass) {
    const mainEL = this.allElements.mainEl;
    mainEL.addEventListener('click', ev => {
      if (ev.target.classList.contains('todo-checkbox')) {
        const data = this.clickedElData.elData.todo;
        const index = this.clickedElData.index;
        const todoEl = this.clickedElData.htmlEl.todoEl;
        const todo = new todoClass(data.description, data.dueDate, data.id, data.completed);
        todo.changeCompleted();
        todo.updateDOMElement(todoEl);
        todoEl.insertAdjacentHTML('beforebegin', todo.todoHTML());
        todoEl.remove();
        createClass.updateElementInArray(todo, createClass.getTasks, index.todo, index.project);
        createClass.saveTasksInLocal();
      }
    });
  }
  displayFilteredByType(createClass, projectClass, todoClass) {
    const filterTodo = [{
      button: this.allElements.btnTodoToday,
      filter: date_fns__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, {
      button: this.allElements.btnTodoWeek,
      filter: date_fns__WEBPACK_IMPORTED_MODULE_3__["default"]
    }];
    const filterProject = [{
      button: this.allElements.btnProjectToday,
      filter: date_fns__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, {
      button: this.allElements.btnProjectWeek,
      filter: date_fns__WEBPACK_IMPORTED_MODULE_3__["default"]
    }];
    filterTodo.forEach(_ref2 => {
      let {
        button,
        filter
      } = _ref2;
      button.addEventListener('click', () => {
        this.clearMainContent();
        const filteredTodos = createClass.filterTodosByDueDate(filter);
        this.displayTodo(filteredTodos, todoClass);
      });
    });
    filterProject.forEach(_ref3 => {
      let {
        button,
        filter
      } = _ref3;
      button.addEventListener('click', () => {
        this.clearMainContent();
        const filteredProjects = createClass.filterProjectsByDueDate(filter);
        this.displayProject(filteredProjects, projectClass, todoClass);
      });
    });
  }
  displayFilterByTime(createClass, projectClass, todoClass) {
    const filterByTime = [{
      button: this.allElements.btnToday,
      filter: date_fns__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, {
      button: this.allElements.btnWeek,
      filter: date_fns__WEBPACK_IMPORTED_MODULE_3__["default"]
    }];
    filterByTime.forEach(_ref4 => {
      let {
        button,
        filter
      } = _ref4;
      button.addEventListener('click', () => {
        this.clearMainContent();
        const filteredProjects = createClass.filterProjectsByDueDate(filter);
        const filteredTodos = createClass.filterTodosByDueDate(filter);
        this.displayProject(filteredProjects, projectClass, todoClass);
        this.displayTodo(filteredTodos, todoClass);
      });
    });
  }
  displayAll(createClass, projectClass, todoClass) {
    this.allElements.btnShowAll.addEventListener('click', () => {
      this.clearMainContent();
      const arrTodos = createClass.filterTasksByType('todo');
      const arrProjects = createClass.filterTasksByType('project');
      this.displayProject(arrProjects, projectClass, todoClass);
      this.displayTodo(arrTodos, todoClass);
    });
  }
  initializeMethods(_ref5) {
    let {
      createClass,
      projectClass,
      todoClass,
      todoArr,
      projectArr
    } = _ref5;
    this.handleFormModes(createClass, projectClass, todoClass);
    this.displayProject(projectArr, projectClass, todoClass);
    this.displayTodo(todoArr, todoClass);
    this.saveClickedHtmlElData(createClass);
    this.updateModalForEditMode();
    this.removeClickedElement(createClass, createClass.getTasks);
    this.checkboxEventHandler(createClass, todoClass);
    this.displayFilteredByType(createClass, projectClass, todoClass);
    this.displayAll(createClass, projectClass, todoClass);
    this.displayFilterByTime(createClass, projectClass, todoClass);
    this.updateModalForAddTodoMode();
    this.setMinDate();
  }
}

/***/ }),

/***/ "./src/modules/domManager.js":
/*!***********************************!*\
  !*** ./src/modules/domManager.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DOMManager)
/* harmony export */ });
class DOMManager {
  constructor(elements) {
    this.allElements = elements;
    this.initMethods();
  }
  initMethods() {
    this.modalEventsListeners();
    this.toggleMobileMenu();
    this.inputStateEventListener();
    this.floatLabels();
    this.toggleAddEditTodoProperties();
    this.checkRadioValidity();
  }
  resetModal() {
    const el = this.allElements;
    el.form.reset();
    el.form.dataset.mode = 'create';
    el.fieldsetRadio.style.removeProperty('pointer-events');
    el.inputTitle.removeAttribute('disabled');
    el.inputTitle.labels[0].classList.remove('float-label');
    el.inputContent.labels[0].classList.remove('float-label');
    el.inputTitle.classList.remove('disabled');
    el.btnSubmit.textContent = 'Create';
    el.inputTitle.removeAttribute('required');
    el.inputContent.removeAttribute('required');
    el.inputDate.removeAttribute('required');
  }
  modalEventsListeners() {
    const modal = this.allElements.modal;
    window.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
        this.resetModal();
      }
    });
    this.allElements.btnCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
      this.resetModal();
    });
    this.allElements.btnOpenModal.addEventListener('click', () => {
      modal.style.display = 'flex';
      this.resetModal();
    });
  }
  toggleMobileMenu() {
    const {
      btnMobileMenu,
      asideEl,
      mainEl
    } = this.allElements;
    btnMobileMenu.addEventListener('click', () => {
      btnMobileMenu.classList.toggle('active');
      asideEl.classList.toggle('active');
      mainEl.classList.toggle('active');
    });
  }
  inputStateEventListener() {
    const {
      inputTodo,
      inputProject
    } = this.allElements;
    [inputTodo, inputProject].forEach(el => {
      el.addEventListener('click', this.updateInputState.bind(this));
    });
  }
  updateInputState() {
    const {
      inputTodo,
      inputTitle,
      inputContent,
      inputDate
    } = this.allElements;
    if (inputTodo.checked) {
      inputTitle.removeAttribute('disabled');
      inputTitle.setAttribute('disabled', '');
      inputTitle.classList.add('disabled');
      inputTitle.labels[0].classList.add('disabled');
      inputContent.setAttribute('required', '');
    } else {
      inputTitle.removeAttribute('disabled');
      inputTitle.setAttribute('required', '');
      inputTitle.classList.remove('disabled');
      inputTitle.labels[0].classList.remove('disabled');
      inputContent.removeAttribute('required');
      inputContent.setAttribute('required', '');
    }
    inputDate.setAttribute('required', '');
  }
  floatLabels() {
    const {
      inputTitle,
      inputContent
    } = this.allElements;
    const updateLabel = function () {
      if (this.value && this.value !== ' ') {
        this.labels[0].classList.add('float-label');
      } else {
        this.labels[0].classList.remove('float-label');
      }
    };
    [inputTitle, inputContent].forEach(el => {
      el.addEventListener('input', updateLabel);
    });
  }
  toggleAddEditTodoProperties() {
    const el = this.allElements;
    const changeProperties = (mode, btnText) => {
      el.form.dataset.mode = mode;
      el.btnSubmit.textContent = btnText;
      el.modal.style.display = 'flex';
      el.fieldsetRadio.style.pointerEvents = 'none';
      el.inputTodo.checked = true;
      el.inputTitle.setAttribute('disabled', '');
    };
    el.mainEl.addEventListener('click', e => {
      const btn = e.target;
      if (btn.dataset.btnType === 'edit') {
        changeProperties('edit', 'Save');
        el.inputContent.labels[0].classList.add('float-label');
        el.inputTitle.labels[0].classList.add('float-label');
      } else if (btn.dataset.btnType === 'add-todo') {
        changeProperties('add-todo', 'Add');
      }
    });
  }
  checkRadioValidity() {
    const el = this.allElements;
    const radios = [el.inputProject, el.inputTodo];
    const changeRadioValidity = () => {
      const isTrue = radios.some(radio => radio.checked);
      isTrue ? el.fieldsetRadio.classList.remove('invalid') : el.fieldsetRadio.classList.add('invalid');
    };
    changeRadioValidity();
    radios.forEach(radio => radio.addEventListener('change', changeRadioValidity));
    el.mainEl.addEventListener('click', ev => {
      const evDataSet = ev.target.dataset.btnType;
      if (evDataSet === 'add-todo' || evDataSet === 'open-modal' || evDataSet === 'edit') {
        changeRadioValidity();
      }
    });
  }
}

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create */ "./src/modules/create.js");

class Project extends _create__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
  projectHTML() {
    let todo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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

/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create */ "./src/modules/create.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisYear/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");


class Todo extends _create__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    return (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(this.dueDate) ? (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(this.dueDate, 'MMM. d, eee.') : (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(this.dueDate, 'y. MMM. d, eee.');
  }
  todoHTML() {
    return `<div class="todo masonry-item" data-id="${this.id}">
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
    el.querySelector('.todo-date').textContent = this.formattedDate();
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#root,
#__next {
  isolation: isolate;
}

.modal {
  position: fixed;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  height: 100%;
  width: 100%;
  z-index: 9999;
}
.modal .modal-content {
  background-color: #ffffff;
  border: 2px solid #bbbbbb;
  border-radius: 10px;
  box-shadow: 0px 0px 13px 5px rgba(0, 0, 0, 0.2);
  color: #000000;
  padding: 3rem 2rem 2rem;
  position: relative;
  width: 500px;
}
.modal .modal-content .btn-close.modal-close {
  color: #bbbbbb;
  position: absolute;
  top: 1rem;
  right: 2rem;
  transition-duration: 0.2s;
}
.modal .modal-content .btn-close.modal-close:hover {
  color: #8e8e8e;
  scale: 1.2;
}
.modal .modal-content form {
  font-family: "AR One Sans", sans-serif;
}
.modal .modal-content form fieldset {
  border: none;
}
.modal .modal-content form fieldset.input-radio {
  display: flex;
  position: relative;
}
.modal .modal-content form fieldset.input-radio::after {
  content: "Please select type!";
  display: none;
  position: absolute;
  top: -20px;
  right: calc((100% - 138px) / 2);
  color: #d30000;
}
.modal .modal-content form fieldset.input-radio.invalid::after {
  display: block;
}
.modal .modal-content form fieldset.input-radio div {
  width: 50%;
}
.modal .modal-content form fieldset.input-radio div label {
  display: block;
  background-color: #068fff;
  border: solid 2px #bbbbbb;
  cursor: pointer;
  color: #eeeeee;
  font-family: "Roboto", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 1rem 2rem;
  text-align: center;
  transition-duration: 0.2s;
}
.modal .modal-content form fieldset.input-radio div label:hover {
  background-color: #42aaff;
}
.modal .modal-content form fieldset.input-radio div label[for=project] {
  border-radius: 10px 0 0 10px;
  border-right-width: 1px;
}
.modal .modal-content form fieldset.input-radio div label[for=todo] {
  border-radius: 0 10px 10px 0;
  border-left-width: 1px;
}
.modal .modal-content form fieldset.input-radio div input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.modal .modal-content form fieldset.input-radio div input:checked ~ label {
  background-color: #35a4ff;
  border-color: #8e8e8e;
  border-radius: 10px;
  scale: 1.05;
  transition-duration: 0.2s;
}
.modal .modal-content form fieldset.input-radio div input:invalid + label {
  border-color: #d30000;
}
.modal .modal-content form fieldset.input-content div {
  position: relative;
}
.modal .modal-content form fieldset.input-content div input,
.modal .modal-content form fieldset.input-content button {
  border-radius: 10px;
  box-shadow: none;
  border: 2px solid #bbbbbb;
  padding: 1rem 1rem 0.3rem;
  outline: none;
  width: 100%;
}
.modal .modal-content form fieldset.input-content div label {
  position: absolute;
  cursor: text;
  top: 13px;
  left: 10px;
  transition-duration: 0.2s;
}
.modal .modal-content form fieldset.input-content div input:focus {
  border-color: #068fff;
}
.modal .modal-content form fieldset.input-content div input:focus + label,
.modal .modal-content form fieldset.input-content .float-label {
  top: 2px;
  left: 18px;
  font-size: 0.8rem;
  opacity: 60%;
  transition-duration: 0.2s;
}
.modal .modal-content form fieldset.input-content > *:not(:first-child) {
  margin-top: 1rem;
}
.modal .modal-content form fieldset.input-content div input:invalid,
.modal .modal-content form fieldset.input-content div input:focus:invalid {
  border-color: #d30000;
}
.modal .modal-content form fieldset.input-content div input:invalid + label {
  color: #d30000;
}
.modal .modal-content form fieldset.input-content div input:invalid + label::after {
  content: " required!";
}
.modal .modal-content form fieldset.input-content div input:focus {
  border-color: #068fff;
}
.modal .modal-content form fieldset.input-content button {
  background-color: #068fff;
  color: #eeeeee;
  font-family: "Roboto", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 0.7rem;
}
.modal .modal-content form fieldset.input-content button:hover {
  background-color: rgba(6, 143, 255, 0.8196078431);
  cursor: pointer;
}

aside {
  display: flex;
  flex-direction: column;
  background-color: #068fff;
  box-shadow: rgba(0, 0, 0, 0.2) 8px 8px 12px 6px;
  color: #eeeeee;
  padding: 2rem;
  min-width: fit-content;
  z-index: 999;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
}
aside header {
  margin-bottom: 4rem;
}
aside header h1 {
  font-size: 2rem;
}
aside .container-sticky {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 1rem;
  bottom: 2rem;
  height: calc(100vh - 4rem);
}
aside .container-sticky .btn-menu {
  background-color: transparent;
  border: none;
  display: none;
  padding: 0;
  height: 50px;
  transition: all 1s ease;
  width: 50px;
}
aside .container-sticky .btn-menu:hover {
  cursor: pointer;
}
aside .container-sticky .btn-menu span {
  display: block;
  background-color: #eeeeee;
  border-radius: 10px;
  height: 6px;
  margin: 10px 0;
  transition: all 0.5s ease;
  width: 100%;
}
aside .container-sticky .btn-menu.active span:nth-child(1) {
  transform: rotate(45deg);
  position: absolute;
  bottom: 25%;
}
aside .container-sticky .btn-menu.active span:nth-child(2) {
  opacity: 0;
  transition: 0ms;
}
aside .container-sticky .btn-menu.active span:nth-child(3) {
  transform: rotate(-45deg);
  position: absolute;
  top: 25%;
}
aside .container-sticky ul {
  list-style: none;
  padding: 0;
}
aside .container-sticky ul li button:hover {
  cursor: pointer;
  text-decoration: underline;
}
aside .container-sticky ul .nav-show-all {
  margin-bottom: 40px;
  font-size: 1.5rem;
}
aside .container-sticky ul .nav-show-all .btn-show-all {
  color: #eeeeee;
}
aside .container-sticky ul .nav-today,
aside .container-sticky ul .nav-week {
  margin-bottom: 15px;
  color: inherit;
}
aside .container-sticky ul .nav-today *,
aside .container-sticky ul .nav-week * {
  color: inherit;
}
aside .container-sticky ul .nav-today > button,
aside .container-sticky ul .nav-week > button {
  font-size: 1.5rem;
  letter-spacing: 1px;
}
aside .container-sticky ul .nav-today li > button,
aside .container-sticky ul .nav-week li > button {
  font-size: 1.25rem;
  letter-spacing: 1px;
}
aside .container-sticky footer {
  display: flex;
  align-items: center;
  font-family: "AR One Sans", sans-serif;
  font-weight: 400;
}
aside .container-sticky footer p {
  margin-right: 10px;
}
aside .container-sticky footer svg {
  color: #eeeeee;
}
aside .container-sticky footer svg:hover {
  scale: 1.1;
}

main {
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  width: 100%;
}
main main > .masonry-item {
  float: left;
  height: min-content;
}
main .project > .masonry-item.todo {
  width: 100%;
}
main .btn-open-modal {
  background-color: #068fff;
  border: none;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px 4px;
  cursor: pointer;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  height: 60px;
  width: 60px;
  transition: all 0.2s ease;
}
main .btn-open-modal::before, main .btn-open-modal::after {
  content: "";
  position: absolute;
  background-color: #eeeeee;
  border-radius: 10px;
  display: block;
  height: 60%;
  width: 6px;
  right: calc(50% - 3px);
  bottom: 20%;
}
main .btn-open-modal::after {
  rotate: 90deg;
}
main .btn-open-modal:hover {
  scale: 1.1;
}
main .project,
main .todo {
  background-color: rgb(255, 255, 255);
  border: #bbbbbb 2px solid;
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;
  height: min-content;
}
main .project:hover,
main .todo:hover {
  box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 9px 3px;
}
main .project .project-heading,
main .todo .project-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
main .project .project-heading h2,
main .todo .project-heading h2 {
  font-family: "Roboto", sans-serif;
}
main .project .todo-dropdown-container,
main .todo .todo-dropdown-container {
  position: relative;
}
main .project .todo-dropdown-container .todo-btn-dropdown,
main .todo .todo-dropdown-container .todo-btn-dropdown {
  background-color: transparent;
  border: none;
}
main .project .todo-dropdown-container .todo-btn-dropdown svg,
main .todo .todo-dropdown-container .todo-btn-dropdown svg {
  color: #bbbbbb;
}
main .project .todo-dropdown-container .todo-btn-dropdown svg:hover,
main .todo .todo-dropdown-container .todo-btn-dropdown svg:hover {
  color: #8e8e8e;
  cursor: pointer;
}
main .project .todo-dropdown-container .todo-dropdown-content,
main .todo .todo-dropdown-container .todo-dropdown-content {
  display: none;
  background-color: white;
  border: #bbbbbb 2px solid;
  border-radius: 10px;
  color: #000000;
  position: absolute;
  right: 36px;
  top: 10px;
  font-family: "AR One Sans", sans-serif;
  width: max-content;
}
main .project .todo-dropdown-container .todo-dropdown-content ul,
main .todo .todo-dropdown-container .todo-dropdown-content ul {
  list-style: none;
  padding: 0.5rem;
}
main .project .todo-dropdown-container .todo-dropdown-content ul button:hover,
main .todo .todo-dropdown-container .todo-dropdown-content ul button:hover {
  text-decoration: underline;
}
main .project .todo-dropdown-container .todo-dropdown-content ul .todo-btn-edit,
main .project .todo-dropdown-container .todo-dropdown-content ul .btn-add-project-todo,
main .todo .todo-dropdown-container .todo-dropdown-content ul .todo-btn-edit,
main .todo .todo-dropdown-container .todo-dropdown-content ul .btn-add-project-todo {
  color: #000000;
}
main .project .todo-dropdown-container .todo-dropdown-content ul .todo-btn-delete,
main .project .todo-dropdown-container .todo-dropdown-content ul .project-delete,
main .todo .todo-dropdown-container .todo-dropdown-content ul .todo-btn-delete,
main .todo .todo-dropdown-container .todo-dropdown-content ul .project-delete {
  color: #d30000;
}
main .project .todo-dropdown-container:hover .todo-dropdown-content,
main .todo .todo-dropdown-container:hover .todo-dropdown-content {
  display: block;
}
main .project .project-todo,
main .project .todo-content-container,
main .todo .project-todo,
main .todo .todo-content-container {
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: auto 50px;
  grid-template-areas: "checkbox todo" "checkbox todo-info";
  border: #bbbbbb 1px solid;
  border-radius: 10px;
  font-family: "AR One Sans", sans-serif;
}
main .project .project-todo:not(:last-child),
main .project .todo-content-container:not(:last-child),
main .todo .project-todo:not(:last-child),
main .todo .todo-content-container:not(:last-child) {
  margin-bottom: 1rem;
}
main .project .todo-checkbox-container,
main .todo .todo-checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  grid-area: checkbox;
}
main .project .todo-checkbox-container:hover .checkmark,
main .todo .todo-checkbox-container:hover .checkmark {
  outline: 2px solid #8e8e8e;
}
main .project .todo-checkbox-container input:checked ~ .checkmark,
main .todo .todo-checkbox-container input:checked ~ .checkmark {
  background-color: #068fff;
}
main .project .todo-checkbox-container input:checked ~ .checkmark:after,
main .todo .todo-checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
main .project .todo-checkbox-container input,
main .todo .todo-checkbox-container input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}
main .project .todo-checkbox-container input:checked .checkmark:after,
main .todo .todo-checkbox-container input:checked .checkmark:after {
  display: block;
}
main .project .todo-checkbox-container .checkmark,
main .todo .todo-checkbox-container .checkmark {
  border-radius: 5px;
  position: absolute;
  outline: 1px solid #bbbbbb;
  height: 35px;
  width: 35px;
}
main .project .todo-checkbox-container .checkmark:after,
main .todo .todo-checkbox-container .checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 12px;
  top: 0px;
  width: 13px;
  height: 30px;
  border: solid #eeeeee;
  border-width: 0 5px 5px 0;
  border-radius: 0 0 5px 0;
  transform: rotate(40deg);
}
@keyframes line {
  from {
    text-decoration-color: transparent;
  }
  to {
    text-decoration-color: #d30000;
  }
}
main .project .todo-text,
main .todo .todo-text {
  border-left: solid 1px #bbbbbb;
  border-bottom: solid 1px #bbbbbb;
  padding: 1rem;
  max-height: 200px;
  overflow: auto;
  grid-area: todo;
}
main .project .todo-done,
main .todo .todo-done {
  text-decoration: line-through;
  text-decoration-thickness: 3px;
  text-decoration-color: #d30000;
  animation: line 1s linear;
}
main .project .todo-info-container,
main .todo .todo-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: solid 1px #bbbbbb;
  padding: 0 1rem;
  grid-area: todo-info;
}
main .project .todo-info-container .todo-date,
main .todo .todo-info-container .todo-date {
  opacity: 60%;
}
main .project > .todo {
  padding: 0;
}
main .project > .todo:not(:last-child) {
  margin-bottom: 1rem;
}
main .project > .todo .todo-content-container {
  border: none;
}

button {
  background-color: transparent;
  border: none;
  color: #bbbbbb;
}
button:hover {
  cursor: pointer;
  color: #8e8e8e;
}

.visually-hidden {
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  white-space: nowrap;
}

.disabled {
  opacity: 50%;
}

@media only screen and (max-width: 768px) {
  body {
    flex-direction: column;
  }
  aside {
    overflow: hidden;
    padding-top: 0;
    position: fixed;
    height: 90px;
    width: 100%;
    transition: all 0.5s ease;
  }
  aside .container-sticky {
    position: relative;
  }
  aside .container-sticky .btn-menu,
  aside .container-sticky .btn-menu.active {
    display: initial;
    position: absolute;
    top: 0;
    right: 0;
  }
  aside .container-sticky footer {
    margin-bottom: 1rem;
  }
  aside.active {
    height: 530px;
  }
  main {
    margin-top: 90px;
    transition: all 0.5s ease;
  }
  main.active {
    margin-top: 410px;
    transition: all 0.5s ease;
  }
}
@media only screen and (min-width: 600px) {
  .masonry-item.todo,
  .masonry-item.project {
    width: calc(100% - 2rem);
  }
}
@media only screen and (min-width: 1024px) {
  .masonry-item.todo,
  .masonry-item.project {
    width: 45%;
  }
}
@media only screen and (min-width: 1440px) {
  .masonry-item.todo,
  .masonry-item.project {
    width: 30%;
  }
}
body {
  display: flex;
}

header,
nav {
  flex: 0;
}

footer {
  margin-top: auto;
}`, "",{"version":3,"sources":["webpack://./src/scss/_reset.scss","webpack://./src/scss/style.scss","webpack://./src/scss/_modal.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_aside.scss","webpack://./src/scss/_main.scss","webpack://./src/scss/_buttons.scss","webpack://./src/scss/_utilities.scss","webpack://./src/scss/_breakpoints.scss"],"names":[],"mappings":"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","sourcesContent":["/*\r\n  Josh's Custom CSS Reset\r\n  https://www.joshwcomeau.com/css/custom-css-reset/\r\n*/\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n* {\r\n  margin: 0;\r\n}\r\nbody {\r\n  line-height: 1.5;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\nimg,\r\npicture,\r\nvideo,\r\ncanvas,\r\nsvg {\r\n  display: block;\r\n  max-width: 100%;\r\n}\r\ninput,\r\nbutton,\r\ntextarea,\r\nselect {\r\n  font: inherit;\r\n}\r\np,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n  overflow-wrap: break-word;\r\n}\r\n#root,\r\n#__next {\r\n  isolation: isolate;\r\n}\r\n","@import 'reset';\r\n@import 'variables';\r\n@import 'modal';\r\n@import 'aside';\r\n@import 'main';\r\n@import 'buttons';\r\n@import 'utilities';\r\n@import 'breakpoints';\r\n\r\nbody {\r\n  display: flex;\r\n}\r\n\r\nheader,\r\nnav {\r\n  flex: 0;\r\n}\r\n\r\nfooter {\r\n  margin-top: auto;\r\n}\r\n",".modal {\r\n  position: fixed;\r\n  display: none;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: rgba(0, 0, 0, 0.3);\r\n  backdrop-filter: blur(5px);\r\n  height: 100%;\r\n  width: 100%;\r\n  z-index: 9999;\r\n\r\n  .modal-content {\r\n    background-color: #ffffff;\r\n    border: 2px solid $clr-secondary;\r\n    border-radius: 10px;\r\n    box-shadow: 0px 0px 13px 5px $shadow;\r\n    color: $clr-text-dark;\r\n    padding: 3rem 2rem 2rem;\r\n    position: relative;\r\n    width: 500px;\r\n\r\n    .btn-close.modal-close {\r\n      color: $clr-secondary;\r\n      position: absolute;\r\n      top: 1rem;\r\n      right: 2rem;\r\n      transition-duration: 0.2s;\r\n\r\n      &:hover {\r\n        color: $clr-hover-dark;\r\n        scale: 1.2;\r\n      }\r\n    }\r\n\r\n    form {\r\n      font-family: $normal-font;\r\n\r\n      fieldset {\r\n        border: none;\r\n      }\r\n\r\n      fieldset.input-radio {\r\n        display: flex;\r\n        position: relative;\r\n\r\n        &::after {\r\n          content: 'Please select type!';\r\n          display: none;\r\n          position: absolute;\r\n          top: -20px;\r\n          right: calc((100% - 138px) / 2);\r\n          color: $clr-warning;\r\n        }\r\n\r\n        &.invalid::after {\r\n          display: block;\r\n        }\r\n\r\n        div {\r\n          width: 50%;\r\n\r\n          label {\r\n            display: block;\r\n            background-color: $clr-primary;\r\n            border: solid 2px $clr-secondary;\r\n            cursor: pointer;\r\n            color: $clr-text-light;\r\n            font: {\r\n              family: $heading-font;\r\n              size: 1.3rem;\r\n              weight: 700;\r\n            }\r\n            letter-spacing: 1px;\r\n            padding: 1rem 2rem;\r\n            text-align: center;\r\n            transition-duration: 0.2s;\r\n\r\n            &:hover {\r\n              background-color: #42aaff;\r\n            }\r\n          }\r\n\r\n          label[for='project'] {\r\n            border-radius: 10px 0 0 10px;\r\n            border-right-width: 1px;\r\n          }\r\n\r\n          label[for='todo'] {\r\n            border-radius: 0 10px 10px 0;\r\n            border-left-width: 1px;\r\n          }\r\n\r\n          input {\r\n            position: absolute;\r\n            opacity: 0;\r\n            cursor: pointer;\r\n            height: 0;\r\n            width: 0;\r\n\r\n            &:checked ~ label {\r\n              background-color: #35a4ff;\r\n              border-color: $clr-hover-dark;\r\n              border-radius: 10px;\r\n              scale: 1.05;\r\n              transition-duration: 0.2s;\r\n            }\r\n          }\r\n\r\n          & input:invalid + label {\r\n            border-color: $clr-warning;\r\n          }\r\n        }\r\n      }\r\n\r\n      fieldset.input-content {\r\n        div {\r\n          position: relative;\r\n        }\r\n\r\n        div input,\r\n        button {\r\n          border-radius: 10px;\r\n          box-shadow: none;\r\n          border: 2px solid $clr-secondary;\r\n          padding: 1rem 1rem 0.3rem;\r\n          outline: none;\r\n          width: 100%;\r\n        }\r\n\r\n        div label {\r\n          position: absolute;\r\n          cursor: text;\r\n          top: 13px;\r\n          left: 10px;\r\n          transition-duration: 0.2s;\r\n        }\r\n\r\n        div input:focus {\r\n          border-color: $clr-primary;\r\n        }\r\n\r\n        div input:focus + label,\r\n        .float-label {\r\n          top: 2px;\r\n          left: 18px;\r\n          font-size: 0.8rem;\r\n          opacity: 60%;\r\n          transition-duration: 0.2s;\r\n        }\r\n\r\n        & > *:not(:first-child) {\r\n          margin-top: 1rem;\r\n        }\r\n\r\n        div input:invalid,\r\n        div input:focus:invalid {\r\n          border-color: $clr-warning;\r\n        }\r\n\r\n        div input:invalid + label {\r\n          color: $clr-warning;\r\n        }\r\n\r\n        div input:invalid + label::after {\r\n          content: ' required!';\r\n        }\r\n\r\n        div input:focus {\r\n          border-color: $clr-primary;\r\n        }\r\n\r\n        button {\r\n          background-color: $clr-primary;\r\n          color: $clr-text-light;\r\n          font: {\r\n            family: $heading-font;\r\n            size: 1.3rem;\r\n            weight: 700;\r\n          }\r\n          letter-spacing: 1px;\r\n          padding: 0.7rem;\r\n\r\n          &:hover {\r\n            background-color: #068fffd1;\r\n            cursor: pointer;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n","// CUSTOM COLORS\r\n$clr-text-light: #eeeeee;\r\n$clr-text-dark: #000000;\r\n$clr-primary: #068fff;\r\n$clr-secondary: #bbbbbb;\r\n$clr-warning: #d30000;\r\n$clr-hover-dark: #8e8e8e;\r\n$shadow: rgba(0, 0, 0, 0.2);\r\n\r\n// CUSTOM FONTS\r\n$heading-font: 'Roboto', sans-serif;\r\n$normal-font: 'AR One Sans', sans-serif;\r\n","aside {\r\n  display: flex;\r\n  flex-direction: column;\r\n  background-color: $clr-primary;\r\n  box-shadow: $shadow 8px 8px 12px 6px;\r\n  color: $clr-text-light;\r\n  padding: 2rem;\r\n  min-width: fit-content;\r\n  z-index: 999;\r\n\r\n  font: {\r\n    family: $heading-font;\r\n    weight: 600;\r\n  }\r\n\r\n  header {\r\n    margin-bottom: 4rem;\r\n\r\n    h1 {\r\n      font-size: 2rem;\r\n    }\r\n  }\r\n\r\n  .container-sticky {\r\n    display: flex;\r\n    flex-direction: column;\r\n    position: sticky;\r\n    top: 1rem;\r\n    bottom: 2rem;\r\n    height: calc(100vh - 4rem);\r\n\r\n    .btn-menu {\r\n      background-color: transparent;\r\n      border: none;\r\n      display: none;\r\n      padding: 0;\r\n      height: 50px;\r\n      transition: all 1s ease;\r\n      width: 50px;\r\n\r\n      &:hover {\r\n        cursor: pointer;\r\n      }\r\n\r\n      span {\r\n        display: block;\r\n        background-color: $clr-text-light;\r\n        border-radius: 10px;\r\n        height: 6px;\r\n        margin: 10px 0;\r\n        transition: all 0.5s ease;\r\n        width: 100%;\r\n      }\r\n    }\r\n\r\n    .btn-menu.active {\r\n      span:nth-child(1) {\r\n        transform: rotate(45deg);\r\n        position: absolute;\r\n        bottom: 25%;\r\n      }\r\n\r\n      span:nth-child(2) {\r\n        opacity: 0;\r\n        transition: 0ms;\r\n      }\r\n\r\n      span:nth-child(3) {\r\n        transform: rotate(-45deg);\r\n        position: absolute;\r\n        top: 25%;\r\n      }\r\n    }\r\n\r\n    ul {\r\n      list-style: none;\r\n      padding: 0;\r\n\r\n      & li button:hover {\r\n        cursor: pointer;\r\n        text-decoration: underline;\r\n      }\r\n\r\n      .nav-show-all {\r\n        margin-bottom: 40px;\r\n        font-size: 1.5rem;\r\n\r\n        .btn-show-all {\r\n          color: $clr-text-light;\r\n        }\r\n      }\r\n\r\n      .nav-today,\r\n      .nav-week {\r\n        margin-bottom: 15px;\r\n        color: inherit;\r\n\r\n        & * {\r\n          color: inherit;\r\n        }\r\n\r\n        & > button {\r\n          font-size: 1.5rem;\r\n          letter-spacing: 1px;\r\n        }\r\n\r\n        & li > button {\r\n          font-size: 1.25rem;\r\n          letter-spacing: 1px;\r\n        }\r\n      }\r\n    }\r\n\r\n    footer {\r\n      display: flex;\r\n      align-items: center;\r\n      font: {\r\n        family: $normal-font;\r\n        weight: 400;\r\n      }\r\n\r\n      p {\r\n        margin-right: 10px;\r\n      }\r\n\r\n      svg {\r\n        color: $clr-text-light;\r\n\r\n        &:hover {\r\n          scale: 1.1;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n","main {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  padding: 2rem;\r\n  width: 100%;\r\n\r\n  main > .masonry-item {\r\n    float: left;\r\n    height: min-content;\r\n  }\r\n\r\n  .project > .masonry-item.todo {\r\n    width: 100%;\r\n  }\r\n\r\n  .btn-open-modal {\r\n    background-color: $clr-primary;\r\n    border: none;\r\n    border-radius: 50%;\r\n    box-shadow: $shadow 0 0 10px 4px;\r\n    cursor: pointer;\r\n    position: fixed;\r\n    right: 1rem;\r\n    bottom: 1rem;\r\n    height: 60px;\r\n    width: 60px;\r\n    transition: all 0.2s ease;\r\n\r\n    &::before,\r\n    &::after {\r\n      content: '';\r\n      position: absolute;\r\n      background-color: $clr-text-light;\r\n      border-radius: 10px;\r\n      display: block;\r\n      height: 60%;\r\n      width: 6px;\r\n      right: calc(50% - 3px);\r\n      bottom: 20%;\r\n    }\r\n\r\n    &::after {\r\n      rotate: 90deg;\r\n    }\r\n\r\n    &:hover {\r\n      scale: 1.1;\r\n    }\r\n  }\r\n\r\n  .project,\r\n  .todo {\r\n    background-color: rgb(255, 255, 255);\r\n    border: $clr-secondary 2px solid;\r\n    border-radius: 10px;\r\n    padding: 1rem;\r\n    transition: all 0.3s ease;\r\n    height: min-content;\r\n    &:hover {\r\n      box-shadow: $shadow 4px 4px 9px 3px;\r\n    }\r\n\r\n    .project-heading {\r\n      display: flex;\r\n      flex-direction: row;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      margin-bottom: 2rem;\r\n\r\n      h2 {\r\n        font-family: $heading-font;\r\n      }\r\n    }\r\n\r\n    .todo-dropdown-container {\r\n      position: relative;\r\n\r\n      .todo-btn-dropdown {\r\n        background-color: transparent;\r\n        border: none;\r\n        svg {\r\n          color: $clr-secondary;\r\n\r\n          &:hover {\r\n            color: $clr-hover-dark;\r\n            cursor: pointer;\r\n          }\r\n        }\r\n      }\r\n\r\n      .todo-dropdown-content {\r\n        display: none;\r\n        background-color: white;\r\n        border: $clr-secondary 2px solid;\r\n        border-radius: 10px;\r\n        color: $clr-text-dark;\r\n        position: absolute;\r\n        right: 36px;\r\n        top: 10px;\r\n        font-family: $normal-font;\r\n        width: max-content;\r\n\r\n        ul {\r\n          list-style: none;\r\n          padding: 0.5rem;\r\n\r\n          button:hover {\r\n            text-decoration: underline;\r\n          }\r\n\r\n          .todo-btn-edit,\r\n          .btn-add-project-todo {\r\n            color: $clr-text-dark;\r\n          }\r\n\r\n          .todo-btn-delete,\r\n          .project-delete {\r\n            color: $clr-warning;\r\n          }\r\n        }\r\n      }\r\n\r\n      &:hover .todo-dropdown-content {\r\n        display: block;\r\n      }\r\n    }\r\n\r\n    .project-todo,\r\n    .todo-content-container {\r\n      display: grid;\r\n      grid-template-columns: 50px auto;\r\n      grid-template-rows: auto 50px;\r\n      grid-template-areas:\r\n        'checkbox todo'\r\n        'checkbox todo-info';\r\n      border: $clr-secondary 1px solid;\r\n      border-radius: 10px;\r\n      font-family: $normal-font;\r\n\r\n      &:not(:last-child) {\r\n        margin-bottom: 1rem;\r\n      }\r\n    }\r\n\r\n    .todo-checkbox-container {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      position: relative;\r\n      grid-area: checkbox;\r\n\r\n      &:hover .checkmark {\r\n        outline: 2px solid $clr-hover-dark;\r\n      }\r\n\r\n      & input:checked ~ .checkmark {\r\n        background-color: $clr-primary;\r\n      }\r\n\r\n      & input:checked ~ .checkmark:after {\r\n        display: block;\r\n      }\r\n\r\n      input {\r\n        position: absolute;\r\n        opacity: 0;\r\n        height: 0;\r\n        width: 0;\r\n\r\n        &:checked .checkmark:after {\r\n          display: block;\r\n        }\r\n      }\r\n\r\n      .checkmark {\r\n        border-radius: 5px;\r\n        position: absolute;\r\n        outline: 1px solid $clr-secondary;\r\n        height: 35px;\r\n        width: 35px;\r\n\r\n        &:after {\r\n          content: '';\r\n          position: absolute;\r\n          display: none;\r\n          left: 12px;\r\n          top: 0px;\r\n          width: 13px;\r\n          height: 30px;\r\n          border: solid $clr-text-light;\r\n          border-width: 0 5px 5px 0;\r\n          border-radius: 0 0 5px 0;\r\n          transform: rotate(40deg);\r\n        }\r\n      }\r\n    }\r\n\r\n    @keyframes line {\r\n      from {\r\n        text-decoration-color: transparent;\r\n      }\r\n      to {\r\n        text-decoration-color: $clr-warning;\r\n      }\r\n    }\r\n\r\n    .todo-text {\r\n      border-left: solid 1px $clr-secondary;\r\n      border-bottom: solid 1px $clr-secondary;\r\n      padding: 1rem;\r\n      max-height: 200px;\r\n      overflow: auto;\r\n      grid-area: todo;\r\n    }\r\n\r\n    .todo-done {\r\n      text-decoration: line-through;\r\n      text-decoration-thickness: 3px;\r\n      text-decoration-color: $clr-warning;\r\n      animation: line 1s linear;\r\n    }\r\n\r\n    .todo-info-container {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      border-left: solid 1px $clr-secondary;\r\n      padding: 0 1rem;\r\n      grid-area: todo-info;\r\n\r\n      .todo-date {\r\n        opacity: 60%;\r\n      }\r\n    }\r\n  }\r\n\r\n  .project > .todo {\r\n    padding: 0;\r\n\r\n    &:not(:last-child) {\r\n      margin-bottom: 1rem;\r\n    }\r\n\r\n    .todo-content-container {\r\n      border: none;\r\n    }\r\n  }\r\n}\r\n","button {\r\n  background-color: transparent;\r\n  border: none;\r\n  color: $clr-secondary;\r\n\r\n  &:hover {\r\n    cursor: pointer;\r\n    color: $clr-hover-dark;\r\n  }\r\n}\r\n",".visually-hidden {\r\n  border: 0;\r\n  padding: 0;\r\n  margin: 0;\r\n  position: absolute !important;\r\n  height: 1px;\r\n  width: 1px;\r\n  overflow: hidden;\r\n  clip: rect(1px 1px 1px 1px);\r\n  clip: rect(1px, 1px, 1px, 1px);\r\n  clip-path: inset(50%);\r\n  white-space: nowrap;\r\n}\r\n\r\n.disabled {\r\n  opacity: 50%;\r\n}\r\n","@media only screen and (max-width: 768px) {\r\n  body {\r\n    flex-direction: column;\r\n  }\r\n\r\n  aside {\r\n    overflow: hidden;\r\n    padding-top: 0;\r\n    position: fixed;\r\n    height: 90px;\r\n    width: 100%;\r\n    transition: all 0.5s ease;\r\n\r\n    .container-sticky {\r\n      position: relative;\r\n\r\n      .btn-menu,\r\n      .btn-menu.active {\r\n        display: initial;\r\n        position: absolute;\r\n        top: 0;\r\n        right: 0;\r\n      }\r\n\r\n      footer {\r\n        margin-bottom: 1rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  aside.active {\r\n    height: 530px;\r\n  }\r\n\r\n  main {\r\n    margin-top: 90px;\r\n    transition: all 0.5s ease;\r\n  }\r\n\r\n  main.active {\r\n    margin-top: 410px;\r\n    transition: all 0.5s ease;\r\n  }\r\n}\r\n\r\n@media only screen and (min-width: 600px) {\r\n  .masonry-item.todo,\r\n  .masonry-item.project {\r\n    width: calc(100% - 2rem);\r\n  }\r\n}\r\n\r\n@media only screen and (min-width: 1024px) {\r\n  .masonry-item.todo,\r\n  .masonry-item.project {\r\n    width: 45%;\r\n  }\r\n}\r\n\r\n@media only screen and (min-width: 1440px) {\r\n  .masonry-item.todo,\r\n  .masonry-item.project {\r\n    width: 30%;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addLeadingZeros)
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return sign + output;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultLocale/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/formatters/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/formatters/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_lib/getUTCDayOfYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js");
/* harmony import */ var _lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js");
/* harmony import */ var _lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_lib/getUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js");
/* harmony import */ var _lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");
/* harmony import */ var _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lightFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js");







var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
};
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

var formatters = {
  // Era
  G: function G(date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B
      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ
      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function y(date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize, options) {
    var signedWeekYear = (0,_lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    }

    // Padding
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = (0,_lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date);

    // Padding
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04
      case 'QQ':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...
      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04
      case 'qq':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...
      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function M(date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      case 'M':
      case 'MM':
        return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].M(date, token);
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D
      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December
      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12
      case 'LL':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D
      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December
      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize, options) {
    var week = (0,_lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(date, options);
    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize) {
    var isoWeek = (0,_lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(date);
    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(isoWeek, token.length);
  },
  // Day of the month
  d: function d(date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].d(date, token);
  },
  // Day of year
  D: function D(date, token, localize) {
    var dayOfYear = (0,_lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(date);
    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value
      case 'ee':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value
      case 'cc':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday
      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02
      case 'ii':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(isoDayOfWeek, token.length);
      // 2nd
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function a(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }
    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function h(date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].h(date, token);
  },
  // Hour [0-23]
  H: function H(date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize) {
    var hours = date.getUTCHours() % 12;
    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;
    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(hours, token.length);
  },
  // Minute
  m: function m(date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].m(date, token);
  },
  // Second
  s: function s(date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].s(date, token);
  },
  // Fraction of second
  S: function S(date, token) {
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return 'Z';
    }
    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.floor(absOffset / 60), 2);
  var minutes = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */
var formatters = {
  // Year
  y: function y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    var signedYear = date.getUTCFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();
      case 'aaa':
        return dayPeriodEnumValue;
      case 'aaaaa':
        return dayPeriodEnumValue[0];
      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fractionalSeconds, token.length);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });
    case 'PP':
      return formatLong.date({
        width: 'medium'
      });
    case 'PPP':
      return formatLong.date({
        width: 'long'
      });
    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
};
var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });
    case 'pp':
      return formatLong.time({
        width: 'medium'
      });
    case 'ppp':
      return formatLong.time({
        width: 'long'
      });
    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;
    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;
    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }
  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (longFormatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCDayOfYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


var MILLISECONDS_IN_DAY = 86400000;
function getUTCDayOfYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCISOWeekYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");



function getUTCISOWeekYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCISOWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000;
function getUTCISOWeek(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var diff = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date).getTime() - (0,_startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCWeekYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");





function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions = (0,_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultOptions)();
  var firstWeekContainsDate = (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000;
function getUTCWeek(dirtyDate, options) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var diff = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, options).getTime() - (0,_startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, options).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/protectedTokens/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isProtectedDayOfYearToken: () => (/* binding */ isProtectedDayOfYearToken),
/* harmony export */   isProtectedWeekYearToken: () => (/* binding */ isProtectedWeekYearToken),
/* harmony export */   throwProtectedError: () => (/* binding */ throwProtectedError)
/* harmony export */ });
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCISOWeekYear)
/* harmony export */ });
/* harmony import */ var _getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



function startOfUTCISOWeekYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var year = (0,_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fourthOfJanuary);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCISOWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


function startOfUTCISOWeek(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var weekStartsOn = 1;
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCWeekYear)
/* harmony export */ });
/* harmony import */ var _getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");





function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var firstWeekContainsDate = (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = (0,_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(firstWeek, options);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/addMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/addMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addMilliseconds)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var timestamp = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate).getTime();
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyAmount);
  return new Date(timestamp + amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/format/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/format/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
/* harmony import */ var _isValid_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../isValid/index.js */ "./node_modules/date-fns/esm/isValid/index.js");
/* harmony import */ var _subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../subMilliseconds/index.js */ "./node_modules/date-fns/esm/subMilliseconds/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_lib/format/formatters/index.js */ "./node_modules/date-fns/esm/_lib/format/formatters/index.js");
/* harmony import */ var _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_lib/format/longFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_lib/protectedTokens/index.js */ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");
/* harmony import */ var _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/defaultLocale/index.js */ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js");










 // This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  var firstWeekContainsDate = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }
  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }
  var originalDate = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(dirtyDate);
  if (!(0,_isValid_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(originalDate);
  var utcDate = (0,_subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__["default"])(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_8__["default"][firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_9__["default"][firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.isProtectedWeekYearToken)(substring)) {
        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.isProtectedDayOfYearToken)(substring)) {
        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }
    return substring;
  }).join('');
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/isDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  return value instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week (and month and year)
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft, options);
  var dateRightStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameYear/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameYear/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameWeek/index.js */ "./node_modules/date-fns/esm/isSameWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */

function isThisWeek(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), options);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisYear/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisYear/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisYear)
/* harmony export */ });
/* harmony import */ var _isSameYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameYear/index.js */ "./node_modules/date-fns/esm/isSameYear/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isThisYear
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now());
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isToday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isToday/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameDay/index.js */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is today
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now());
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _isDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isDate/index.js */ "./node_modules/date-fns/esm/isDate/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  if (!(0,_isDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate);
  return !isNaN(Number(date));
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
function buildLocalizeFn(args) {
  return function (dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
    var valuesArray;
    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistance);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js");

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatRelative);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js");

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};
var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
};
var localize = {
  ordinalNumber: ordinalNumber,
  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js");
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js");


var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js");
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js");
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js");
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js");
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js");





/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/subMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/subMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subMilliseconds)
/* harmony export */ });
/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addMilliseconds/index.js */ "./node_modules/date-fns/esm/addMilliseconds/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyAmount);
  return (0,_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate, -amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

/***/ }),

/***/ "./node_modules/desandro-matches-selector/matches-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/desandro-matches-selector/matches-selector.js ***!
  \********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));


/***/ }),

/***/ "./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),

/***/ "./node_modules/fizzy-ui-utils/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/fizzy-ui-utils/utils.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(/*! desandro-matches-selector/matches-selector */ "./node_modules/desandro-matches-selector/matches-selector.js")
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( matchesSelector ) {
      return factory( window, matchesSelector );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));


/***/ }),

/***/ "./node_modules/get-size/get-size.js":
/*!*******************************************!*\
  !*** ./node_modules/get-size/get-size.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});


/***/ }),

/***/ "./node_modules/masonry-layout/masonry.js":
/*!************************************************!*\
  !*** ./node_modules/masonry-layout/masonry.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(/*! outlayer/outlayer */ "./node_modules/outlayer/outlayer.js"),
        __webpack_require__(/*! get-size/get-size */ "./node_modules/get-size/get-size.js")
      ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( window, function factory( Outlayer, getSize ) {

'use strict';

// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  var proto = Masonry.prototype;

  proto._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for ( var i=0; i < this.cols; i++ ) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  proto.getContainerWidth = function() {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );
    // use horizontal or top column position
    var colPosMethod = this.options.horizontalOrder ?
      '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[ colPosMethod ]( colSpan, item );
    // position the brick
    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    };
    // apply setHeight to necessary columns
    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;
    for ( var i = colPosition.col; i < setMax; i++ ) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function( colSpan ) {
    var colGroup = this._getTopColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );

    return {
      col: colGroup.indexOf( minimumY ),
      y: minimumY,
    };
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  proto._getTopColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      colGroup[i] = this._getColGroupY( i, colSpan );
    }
    return colGroup;
  };

  proto._getColGroupY = function( col, colSpan ) {
    if ( colSpan < 2 ) {
      return this.colYs[ col ];
    }
    // make an array of colY values for that one group
    var groupColYs = this.colYs.slice( col, col + colSpan );
    // and get the max value of the array
    return Math.max.apply( Math, groupColYs );
  };

  // get column position based on horizontal index. #873
  proto._getHorizontalColPosition = function( colSpan, item ) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols;
    // shift to next row if item can't fit on current row
    col = isOver ? 0 : col;
    // don't let zero-size items take up space
    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

    return {
      col: col,
      y: this._getColGroupY( col, colSpan ),
    };
  };

  proto._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  proto._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this._getOption('fitWidth') ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));


/***/ }),

/***/ "./node_modules/outlayer/item.js":
/*!***************************************!*\
  !*** ./node_modules/outlayer/item.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(/*! ev-emitter/ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"),
        __webpack_require__(/*! get-size/get-size */ "./node_modules/get-size/get-size.js")
      ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));


/***/ }),

/***/ "./node_modules/outlayer/outlayer.js":
/*!*******************************************!*\
  !*** ./node_modules/outlayer/outlayer.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(/*! ev-emitter/ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"),
        __webpack_require__(/*! get-size/get-size */ "./node_modules/get-size/get-size.js"),
        __webpack_require__(/*! fizzy-ui-utils/utils */ "./node_modules/fizzy-ui-utils/utils.js"),
        __webpack_require__(/*! ./item */ "./node_modules/outlayer/item.js")
      ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _modules_create_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/create.js */ "./src/modules/create.js");
/* harmony import */ var _modules_project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/project.js */ "./src/modules/project.js");
/* harmony import */ var _modules_todo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/todo.js */ "./src/modules/todo.js");
/* harmony import */ var _modules_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/dom.js */ "./src/modules/dom.js");





const domCl = new _modules_dom_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
const createCl = new _modules_create_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
const args = {
  createClass: createCl,
  projectClass: _modules_project_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  todoClass: _modules_todo_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  todoArr: createCl.filterTasksByType('todo'),
  projectArr: createCl.filterTasksByType('project')
};
domCl.initializeMethods(args);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7OztBQzFFQTtBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sK1hBQStYLEtBQUssT0FBTyxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxXQUFXLFdBQVcsTUFBTSxTQUFTLFVBQVUsVUFBVSxNQUFNLFFBQVEsVUFBVSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxZQUFZLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsWUFBWSxZQUFZLFVBQVUsV0FBVyxhQUFhLFlBQVksV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFlBQVksWUFBWSxVQUFVLFdBQVcsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxPQUFPLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFlBQVksTUFBTSxPQUFPLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE9BQU8sWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sWUFBWSxNQUFNLE1BQU0sWUFBWSxZQUFZLGFBQWEsWUFBWSxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxZQUFZLFlBQVksVUFBVSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxPQUFPLFdBQVcsVUFBVSxNQUFNLE9BQU8sVUFBVSxNQUFNLE9BQU8sV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxZQUFZLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsWUFBWSxZQUFZLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE9BQU8sV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsTUFBTSxPQUFPLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE9BQU8sWUFBWSxNQUFNLE9BQU8sV0FBVyxNQUFNLE9BQU8sV0FBVyxVQUFVLE1BQU0sT0FBTyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsTUFBTSxPQUFPLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxZQUFZLFVBQVUsVUFBVSxZQUFZLFlBQVksTUFBTSxPQUFPLFdBQVcsVUFBVSxNQUFNLE9BQU8sV0FBVyxNQUFNLFNBQVMsV0FBVyxPQUFPLFNBQVMsV0FBVyxNQUFNLE9BQU8sVUFBVSxNQUFNLFNBQVMsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsWUFBWSxNQUFNLFNBQVMsV0FBVyxNQUFNLE9BQU8sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLE1BQU0sT0FBTyxZQUFZLE1BQU0sT0FBTyxVQUFVLE1BQU0sT0FBTyxX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LDJFQUFpQjs7QUFFdkM7QUFDQSxXQUFXLHFFQUFlO0FBQzFCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxRUFBZTtBQUMxQixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZUFBZSxvRUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxXQUFXLHFFQUFlO0FBQzFCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esa0JBQWtCLHVFQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLFdBQVcscUVBQWU7QUFDMUIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxXQUFXLGlFQUFlO0FBQzFCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW9CLHlFQUFlO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLFdBQVcscUVBQWU7QUFDMUIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFD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QUNRO0FBQzJCO0FBQzZCO0FBQ3pFO0FBQ007QUFDVztBQUNULENBQUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxXQUFXO0FBQzVEO0FBQ0EsaURBQWlELFdBQVc7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsd0JBQXdCLDRDQUE0QztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRLGlFQUFpRTtBQUNwRixXQUFXLGVBQWU7QUFDMUIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWEsUUFBUTtBQUNyQixZQUFZLFdBQVc7QUFDdkIsWUFBWSxZQUFZO0FBQ3hCLFlBQVksWUFBWTtBQUN4QixZQUFZLFlBQVk7QUFDeEIsWUFBWSxZQUFZO0FBQ3hCLFlBQVksWUFBWTtBQUN4QixZQUFZLFlBQVkseUdBQXlHO0FBQ2pJLFlBQVksWUFBWSxxR0FBcUc7QUFDN0gsWUFBWSxZQUFZLCtHQUErRztBQUN2SSxZQUFZLFlBQVksaUhBQWlIO0FBQ3pJLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBLEVBQUUsc0VBQVk7QUFDZDtBQUNBLHVCQUF1QiwrRUFBaUI7QUFDeEMsbU9BQW1PLG1FQUFhO0FBQ2hQLDhCQUE4QixtRUFBUzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUVBQVM7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDREQUFNO0FBQzNCLE9BQU8sNkRBQU87QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5RkFBK0I7QUFDdEQsZ0JBQWdCLHFFQUFlO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwyRUFBYztBQUN4QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1RUFBVTtBQUM5QjtBQUNBLDhGQUE4Rix3RkFBd0I7QUFDdEgsUUFBUSxtRkFBbUI7QUFDM0I7QUFDQSwrRkFBK0YseUZBQXlCO0FBQ3hILFFBQVEsbUZBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqWndEO0FBQ0M7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxrQ0FBa0MsNkVBQU87QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNnRDtBQUNTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsU0FBUztBQUN0QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCwyQkFBMkIsZ0VBQVU7QUFDckMsNEJBQTRCLGdFQUFVO0FBQ3RDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNrRDtBQUNPO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVEsaUVBQWlFO0FBQ3BGLFdBQVcsZUFBZTtBQUMxQixhQUFhLFNBQVM7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZixFQUFFLHNFQUFZO0FBQ2QsNEJBQTRCLGlFQUFXO0FBQ3ZDLDZCQUE2QixpRUFBVztBQUN4QztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFDd0M7QUFDaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYSxTQUFTO0FBQ3RCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxpQkFBaUIsNERBQU07QUFDdkIsa0JBQWtCLDREQUFNO0FBQ3hCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJnRDtBQUNTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRLGlFQUFpRTtBQUNwRixXQUFXLGVBQWU7QUFDMUIsYUFBYSxTQUFTO0FBQ3RCLFlBQVksV0FBVztBQUN2QixZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELGlCQUFpQjtBQUN2RTtBQUNBOztBQUVlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLFNBQVMsZ0VBQVU7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNnRDtBQUNTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLFNBQVM7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLFNBQVMsZ0VBQVU7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUI4QztBQUNXO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLFNBQVM7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLFNBQVMsK0RBQVM7QUFDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCd0M7QUFDQTtBQUNpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxPQUFPLDREQUFNO0FBQ2I7QUFDQTtBQUNBLGFBQWEsNERBQU07QUFDbkI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pCZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN6Q2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyxHQUFHO0FBQ0g7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixHQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixHQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0IsR0FBRztBQUNIO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSix5Q0FBeUMsT0FBTztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsY0FBYzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGNEM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU8sT0FBTyxNQUFNO0FBQy9CLFdBQVcsT0FBTyxPQUFPLE1BQU07QUFDL0IsYUFBYSxNQUFNLElBQUksTUFBTTtBQUM3QixZQUFZLE1BQU0sSUFBSSxNQUFNO0FBQzVCO0FBQ0E7QUFDQSxRQUFRLDJFQUFpQjtBQUN6QjtBQUNBO0FBQ0EsR0FBRztBQUNILFFBQVEsMkVBQWlCO0FBQ3pCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsWUFBWSwyRUFBaUI7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlFQUFlLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ2pDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYd0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8seUVBQWU7QUFDdEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxXQUFXLHlFQUFlO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsU0FBUyx5RUFBZTtBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNILE9BQU8seUVBQWU7QUFDdEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxhQUFhLHlFQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5SXdDO0FBQ2M7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZFQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILE9BQU8sc0VBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsV0FBVyxzRUFBWTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxTQUFTLHNFQUFZO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILE9BQU8sc0VBQVk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsYUFBYSxzRUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlFQUFlLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakd3QztBQUNSO0FBQ1E7QUFDWjtBQUNOO0FBQzFDO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isb0VBQWM7QUFDaEMsY0FBYyxnRUFBVTtBQUN4QixrQkFBa0Isb0VBQWM7QUFDaEMsWUFBWSw4REFBUTtBQUNwQixTQUFTLDJEQUFLO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJtQjtBQUNpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsYUFBYSxNQUFNO0FBQ25CLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxhQUFhLDREQUFNO0FBQ25CO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCd0M7QUFDVztBQUNNO0FBQ1c7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVEsaUVBQWlFO0FBQ3BGLFdBQVcsZUFBZTtBQUMxQixhQUFhLE1BQU07QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGlCQUFpQjtBQUNsRjtBQUNBO0FBQ2U7QUFDZjtBQUNBLEVBQUUsc0VBQVk7QUFDZCx1QkFBdUIsK0VBQWlCO0FBQ3hDLHFCQUFxQixtRUFBUzs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDREQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0MwRDtBQUNEO0FBQ047QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsYUFBYSxNQUFNO0FBQ25CLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCxlQUFlLG1FQUFTO0FBQ3hCLFNBQVMscUVBQWU7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJ3RDtBQUNDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsTUFBTTtBQUNuQixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkOztBQUVBO0FBQ0Esa0NBQWtDLDZFQUFPO0FBQ3pDO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLElBQXlDO0FBQ2hEO0FBQ0EsSUFBSSxvQ0FBUSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0dBQUU7QUFDckIsSUFBSSxLQUFLLEVBTU47O0FBRUgsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7O0FDcEREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxJQUF5QztBQUNoRDtBQUNBLElBQUksb0NBQVEsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLGtHQUFFO0FBQ3JCLElBQUksS0FBSyxFQU1OOztBQUVILENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7O0FDL0dEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLElBQXlDO0FBQ2hEO0FBQ0EsSUFBSSxpQ0FBUTtBQUNaLE1BQU0scUlBQTRDO0FBQ2xELEtBQUssbUNBQUU7QUFDUDtBQUNBLEtBQUs7QUFBQSxrR0FBQztBQUNOLElBQUksS0FBSyxFQVlOOztBQUVILENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7QUNoUEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPLElBQXlDO0FBQ2hEO0FBQ0EsSUFBSSxvQ0FBUSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0dBQUU7QUFDckIsSUFBSSxLQUFLLEVBTU47O0FBRUgsQ0FBQztBQUNEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7O0FDOU1EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sSUFBeUM7QUFDaEQ7QUFDQSxJQUFJLGlDQUFRO0FBQ1osUUFBUSxtRkFBbUI7QUFDM0IsUUFBUSxtRkFBbUI7QUFDM0IsT0FBTyxvQ0FDRCxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFFO0FBQ2YsSUFBSSxLQUFLLEVBWU47O0FBRUgsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFlBQVk7QUFDL0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7OztBQzlPRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxJQUF5QztBQUNoRDtBQUNBLElBQUksaUNBQVE7QUFDWixRQUFRLDJGQUF1QjtBQUMvQixRQUFRLG1GQUFtQjtBQUMzQixPQUFPLG9DQUNELE9BQU87QUFBQTtBQUFBO0FBQUEsa0dBQ1I7QUFDTCxJQUFJLEtBQUssRUFhTjs7QUFFSCxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LFlBQVksRUFBRTRILDJEQUFPO0VBQ3JCM0gsU0FBUyxFQUFFZ0ksd0RBQUk7RUFDZjlELE9BQU8sRUFBRWlFLFFBQVEsQ0FBQzFOLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztFQUMzQzhKLFVBQVUsRUFBRTRELFFBQVEsQ0FBQzFOLGlCQUFpQixDQUFDLFNBQVM7QUFDbEQsQ0FBQztBQUVEeU4sS0FBSyxDQUFDdkMsaUJBQWlCLENBQUN5QyxJQUFJLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90b2RvLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL3Njc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9mb3JtYXQvZm9ybWF0dGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9mb3JtYXQvbGlnaHRGb3JtYXR0ZXJzL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ0RheU9mWWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENJU09XZWVrL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ1dlZWtZZWFyL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFVUQ1dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcHJvdGVjdGVkVG9rZW5zL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9zdGFydE9mVVRDSVNPV2Vla1llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ1dlZWtZZWFyL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3RvSW50ZWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vYWRkTWlsbGlzZWNvbmRzL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNTYW1lRGF5L2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1NhbWVXZWVrL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1NhbWVZZWFyL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1RoaXNXZWVrL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1RoaXNZZWFyL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1RvZGF5L2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1ZhbGlkL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRMb25nL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL21hdGNoL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3N0YXJ0T2ZEYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3N0YXJ0T2ZXZWVrL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zdWJNaWxsaXNlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZXYtZW1pdHRlci9ldi1lbWl0dGVyLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2dldC1zaXplL2dldC1zaXplLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL21hc29ucnktbGF5b3V0L21hc29ucnkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvb3V0bGF5ZXIvaXRlbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9vdXRsYXllci9vdXRsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9zY3NzL3N0eWxlLnNjc3M/MmU0ZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGUge1xyXG4gIHN0YXRpYyB0YXNrc0FyciA9IFtdO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5nZXRMb2NhbERhdGEoKTtcclxuICB9XHJcblxyXG4gIHN0b3JlRWxlbWVudChlbCkge1xyXG4gICAgQ3JlYXRlLnRhc2tzQXJyLnB1c2goZWwpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZVRhc2tzSW5Mb2NhbCgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KENyZWF0ZS50YXNrc0FycikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG9jYWxEYXRhKCkge1xyXG4gICAgY29uc3QgbG9jYWxEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJyk7XHJcblxyXG4gICAgaWYgKGxvY2FsRGF0YSkge1xyXG4gICAgICBDcmVhdGUudGFza3NBcnIgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgZ2V0VGFza3MoKSB7XHJcbiAgICByZXR1cm4gQ3JlYXRlLnRhc2tzQXJyO1xyXG4gIH1cclxuXHJcbiAgaXNOdW1iZXIodmFyaWFibGUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT09ICdudW1iZXInO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyVGFza3NCeVR5cGUodHlwZSkge1xyXG4gICAgcmV0dXJuIENyZWF0ZS50YXNrc0Fyci5maWx0ZXIoKG9iaikgPT4gb2JqLnR5cGUgPT09IHR5cGUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xpY2tlZEVsZW1lbnQoZXYsIGFycikge1xyXG4gICAgY29uc3QgY2xvc2VzdFRvZG8gPSBldi50YXJnZXQuY2xvc2VzdCgnLnRvZG8nKTtcclxuICAgIGNvbnN0IGNsb3Nlc3RQcm9qZWN0ID0gZXYudGFyZ2V0LmNsb3Nlc3QoJy5wcm9qZWN0Jyk7XHJcblxyXG4gICAgbGV0IHRvZG87XHJcbiAgICBsZXQgcHJvamVjdDtcclxuXHJcbiAgICBpZiAoY2xvc2VzdFRvZG8gJiYgY2xvc2VzdFByb2plY3QpIHtcclxuICAgICAgY29uc3QgcHJvamVjdERhdGEgPSBhcnIuZmluZChcclxuICAgICAgICAoZWwpID0+IGVsLmlkID09PSArY2xvc2VzdFByb2plY3QuZGF0YXNldC5pZFxyXG4gICAgICApO1xyXG4gICAgICBpZiAocHJvamVjdERhdGEpIHtcclxuICAgICAgICBwcm9qZWN0ID0gcHJvamVjdERhdGE7XHJcbiAgICAgICAgdG9kbyA9IHByb2plY3QudGFza3MuZmluZCgoZWwpID0+IGVsLmlkID09PSArY2xvc2VzdFRvZG8uZGF0YXNldC5pZCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY2xvc2VzdFRvZG8pIHtcclxuICAgICAgdG9kbyA9IGFyci5maW5kKChlbCkgPT4gZWwuaWQgPT09ICtjbG9zZXN0VG9kby5kYXRhc2V0LmlkKTtcclxuICAgIH0gZWxzZSBpZiAoY2xvc2VzdFByb2plY3QpIHtcclxuICAgICAgcHJvamVjdCA9IGFyci5maW5kKChlbCkgPT4gZWwuaWQgPT09ICtjbG9zZXN0UHJvamVjdC5kYXRhc2V0LmlkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b2RvLFxyXG4gICAgICBwcm9qZWN0LFxyXG4gICAgICBlbGVtZW50OiB7XHJcbiAgICAgICAgdG9kb0VsOiBjbG9zZXN0VG9kbyxcclxuICAgICAgICBwcm9qZWN0RWw6IGNsb3Nlc3RQcm9qZWN0LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldENsaWNrZWRFbGVtZW50SW5kZXgoZXYsIGFycikge1xyXG4gICAgY29uc3QgY2xpY2tlZEVMID0gdGhpcy5nZXRDbGlja2VkRWxlbWVudChldiwgYXJyKTtcclxuICAgIGxldCB0b2RvLCBwcm9qZWN0O1xyXG5cclxuICAgIGNvbnN0IHRvZG9JblByb2plY3RJbmRleCA9ICgpID0+IHtcclxuICAgICAgcmV0dXJuIGNsaWNrZWRFTC5wcm9qZWN0LnRhc2tzLmZpbmRJbmRleChcclxuICAgICAgICAoZWwpID0+IGVsLmlkID09PSBjbGlja2VkRUwudG9kby5pZFxyXG4gICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB0b2RvT3JQcm9qZWN0SW5kZXggPSAodHlwZSkgPT4ge1xyXG4gICAgICByZXR1cm4gYXJyLmZpbmRJbmRleCgoZWwpID0+IGVsLmlkID09PSBjbGlja2VkRUxbdHlwZV0uaWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoY2xpY2tlZEVMLnRvZG8gJiYgY2xpY2tlZEVMLnByb2plY3QpIHtcclxuICAgICAgcHJvamVjdCA9IHRvZG9PclByb2plY3RJbmRleCgncHJvamVjdCcpO1xyXG4gICAgICB0b2RvID0gdG9kb0luUHJvamVjdEluZGV4KCk7XHJcbiAgICB9IGVsc2UgaWYgKGNsaWNrZWRFTC50b2RvKSB7XHJcbiAgICAgIHRvZG8gPSB0b2RvT3JQcm9qZWN0SW5kZXgoJ3RvZG8nKTtcclxuICAgIH0gZWxzZSBpZiAoY2xpY2tlZEVMLnByb2plY3QpIHtcclxuICAgICAgcHJvamVjdCA9IHRvZG9PclByb2plY3RJbmRleCgncHJvamVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHByb2plY3QsXHJcbiAgICAgIHRvZG8sXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRWxlbWVudEluQXJyYXkobmV3VGFzaywgYXJyLCB0SW5kZXgsIHBJbmRleCkge1xyXG4gICAgaWYgKHRoaXMuaXNOdW1iZXIodEluZGV4KSAmJiB0aGlzLmlzTnVtYmVyKHBJbmRleCkpIHtcclxuICAgICAgYXJyW3BJbmRleF0udGFza3NbdEluZGV4XSA9IG5ld1Rhc2s7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzTnVtYmVyKHRJbmRleCkpIHtcclxuICAgICAgYXJyW3RJbmRleF0gPSBuZXdUYXNrO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVFbGVtZW50RnJvbUFycmF5KGFyciwgdEluZGV4LCBwSW5kZXgpIHtcclxuICAgIGlmICh0aGlzLmlzTnVtYmVyKHRJbmRleCkgJiYgdGhpcy5pc051bWJlcihwSW5kZXgpKSB7XHJcbiAgICAgIGFycltwSW5kZXhdLnRhc2tzLnNwbGljZSh0SW5kZXgsIDEpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc051bWJlcih0SW5kZXgpKSB7XHJcbiAgICAgIGFyci5zcGxpY2UodEluZGV4LCAxKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNOdW1iZXIocEluZGV4KSkge1xyXG4gICAgICBhcnIuc3BsaWNlKHBJbmRleCwgMSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlclByb2plY3RzQnlEdWVEYXRlKGRhdGVJbnRlcnZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyVGFza3NCeVR5cGUoJ3Byb2plY3QnKVxyXG4gICAgICAubWFwKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3VGFza3MgPSBwcm9qZWN0LnRhc2tzLmZpbHRlcigoZWwpID0+IGRhdGVJbnRlcnZhbChlbC5kdWVEYXRlKSk7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ucHJvamVjdCwgdGFza3M6IG5ld1Rhc2tzIH07XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QudGFza3MubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJUb2Rvc0J5RHVlRGF0ZShkYXRlSW50ZXJ2YWwpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbHRlclRhc2tzQnlUeXBlKCd0b2RvJykuZmlsdGVyKCh0b2RvKSA9PlxyXG4gICAgICBkYXRlSW50ZXJ2YWwodG9kby5kdWVEYXRlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGluc2VydEh0bWwocGFyZW50RWwsIGh0bWwpIHtcclxuICAgIHBhcmVudEVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGh0bWwpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBpc1RvZGF5LCBpc1RoaXNXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xyXG5pbXBvcnQgZG9tTWFuYWdlciBmcm9tICcuL2RvbU1hbmFnZXInO1xyXG5pbXBvcnQgTWFzb25yeSBmcm9tICdtYXNvbnJ5LWxheW91dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET00ge1xyXG4gIGNsaWNrZWRFbERhdGE7XHJcbiAgbWFzb25yeTtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZG9tTWFuYWdlciA9IG5ldyBkb21NYW5hZ2VyKHRoaXMuYWxsRWxlbWVudHMpO1xyXG4gICAgdGhpcy5oYW5kbGVNYXNvbnJ5TGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZWxlbWVudFNlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWFpbkVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksXHJcbiAgICAgIGZvcm06IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1mb3JtJyksXHJcbiAgICAgIG1vZGFsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKSxcclxuICAgICAgYXNpZGVFbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKSxcclxuICAgICAgZmllbGRzZXRSYWRpbzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LXJhZGlvJyksXHJcbiAgICAgIHRvZG9FbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8nKSxcclxuICAgICAgcHJvamVjdEVMOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdCcpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBpbnB1dFNlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5wdXRQcm9qZWN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpLFxyXG4gICAgICBpbnB1dFRvZG86IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RvJyksXHJcbiAgICAgIGlucHV0VGl0bGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLFxyXG4gICAgICBpbnB1dENvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JyksXHJcbiAgICAgIGlucHV0RGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQgYnV0dG9uU2VsZWN0b3IoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBidG5TaG93QWxsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXNob3ctYWxsJyksXHJcbiAgICAgIGJ0blRvZGF5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXRvZGF5JyksXHJcbiAgICAgIGJ0blByb2plY3RUb2RheTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1wcm9qZWN0LXRvZGF5JyksXHJcbiAgICAgIGJ0blRvZG9Ub2RheTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi10b2RvLXRvZGF5JyksXHJcbiAgICAgIGJ0bldlZWs6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4td2VlaycpLFxyXG4gICAgICBidG5Qcm9qZWN0V2VlazogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1wcm9qZWN0LXdlZWsnKSxcclxuICAgICAgYnRuVG9kb1dlZWs6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tdG9kby13ZWVrJyksXHJcbiAgICAgIGJ0bk9wZW5Nb2RhbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1vcGVuLW1vZGFsJyksXHJcbiAgICAgIGJ0bkNsb3NlTW9kYWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jbG9zZScpLFxyXG4gICAgICBidG5TdWJtaXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKSxcclxuICAgICAgYnRuTW9iaWxlTWVudTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1tZW51JyksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFsbEVsZW1lbnRzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4udGhpcy5lbGVtZW50U2VsZWN0b3IsXHJcbiAgICAgIC4uLnRoaXMuaW5wdXRTZWxlY3RvcixcclxuICAgICAgLi4udGhpcy5idXR0b25TZWxlY3RvcixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBoYW5kbGVNYXNvbnJ5TGF5b3V0KCkge1xyXG4gICAgY29uc3QgbWFpbkVsID0gdGhpcy5hbGxFbGVtZW50cy5tYWluRWw7XHJcbiAgICB0aGlzLm1hc29ucnkgPSBuZXcgTWFzb25yeShtYWluRWwsIHtcclxuICAgICAgaXRlbVNlbGVjdG9yOiAnbWFpbiA+IC5tYXNvbnJ5LWl0ZW0nLFxyXG4gICAgICBjb2x1bW5XaWR0aDogJy5tYXNvbnJ5LWl0ZW0nLFxyXG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXHJcbiAgICAgIGd1dHRlcjogMjAsXHJcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogJzAuM3MnLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVGb3JtQ3JlYXRlTW9kZShjcmVhdGVDbGFzcywgcHJvamVjdENsYXNzLCB0b2RvQ2xhc3MpIHtcclxuICAgIGNvbnN0IHsgbWFpbkVsLCBpbnB1dFByb2plY3QsIGlucHV0VG9kbyB9ID0gdGhpcy5hbGxFbGVtZW50cztcclxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRNb2RhbElucHV0VmFsdWVzKCk7XHJcblxyXG4gICAgaWYgKGlucHV0UHJvamVjdC5jaGVja2VkKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgcHJvamVjdENsYXNzKGlucHV0LnRpdGxlKTtcclxuICAgICAgY29uc3QgdG9kbyA9IG5ldyB0b2RvQ2xhc3MoaW5wdXQuZGVzY3JpcHRpb24sIGlucHV0LmRhdGUpO1xyXG4gICAgICBwcm9qZWN0Lmluc2VydEh0bWwobWFpbkVsLCBwcm9qZWN0LnByb2plY3RIVE1MKHRvZG8udG9kb0hUTUwoKSkpO1xyXG4gICAgICBwcm9qZWN0LnN0b3JlVG9kb0luVGFza3ModG9kbyk7XHJcbiAgICAgIGNyZWF0ZUNsYXNzLnN0b3JlRWxlbWVudChwcm9qZWN0KTtcclxuICAgICAgdGhpcy5tYXNvbnJ5LnByZXBlbmRlZCh0aGlzLmFsbEVsZW1lbnRzLnByb2plY3RFTCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0VG9kby5jaGVja2VkKSB7XHJcbiAgICAgIGNvbnN0IHRvZG8gPSBuZXcgdG9kb0NsYXNzKGlucHV0LmRlc2NyaXB0aW9uLCBpbnB1dC5kYXRlKTtcclxuICAgICAgdG9kby5pbnNlcnRIdG1sKG1haW5FbCwgdG9kby50b2RvSFRNTCgpKTtcclxuICAgICAgY3JlYXRlQ2xhc3Muc3RvcmVFbGVtZW50KHRvZG8pO1xyXG4gICAgICB0aGlzLm1hc29ucnkucHJlcGVuZGVkKHRoaXMuYWxsRWxlbWVudHMudG9kb0VsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhbmRsZUZvcm1BZGRUb2RvTW9kZShjcmVhdGVDbGFzcywgcHJvamVjdENsYXNzLCB0b2RvQ2xhc3MpIHtcclxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRNb2RhbElucHV0VmFsdWVzKCk7XHJcbiAgICBjb25zdCBwRGF0YSA9IHRoaXMuY2xpY2tlZEVsRGF0YS5lbERhdGEucHJvamVjdDtcclxuICAgIGNvbnN0IHBJbmRleCA9IHRoaXMuY2xpY2tlZEVsRGF0YS5pbmRleC5wcm9qZWN0O1xyXG5cclxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgcHJvamVjdENsYXNzKHBEYXRhLnRpdGxlLCBwRGF0YS50YXNrcywgcERhdGEuaWQpO1xyXG4gICAgY29uc3QgdG9kbyA9IG5ldyB0b2RvQ2xhc3MoaW5wdXQuZGVzY3JpcHRpb24sIGlucHV0LmRhdGUpO1xyXG5cclxuICAgIHRoaXMuY2xpY2tlZEVsRGF0YS5odG1sRWwucHJvamVjdEVsLmluc2VydEFkamFjZW50SFRNTChcclxuICAgICAgJ2JlZm9yZWVuZCcsXHJcbiAgICAgIHRvZG8udG9kb0hUTUwoKVxyXG4gICAgKTtcclxuXHJcbiAgICBwcm9qZWN0LnN0b3JlVG9kb0luVGFza3ModG9kbyk7XHJcbiAgICBjcmVhdGVDbGFzcy51cGRhdGVFbGVtZW50SW5BcnJheShwcm9qZWN0LCBjcmVhdGVDbGFzcy5nZXRUYXNrcywgcEluZGV4KTtcclxuICB9XHJcblxyXG4gIGNsZWFyTWFpbkNvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBtYWluRWwgPSB0aGlzLmFsbEVsZW1lbnRzLm1haW5FbDtcclxuICAgIGNvbnN0IGJ0biA9IHRoaXMuYWxsRWxlbWVudHMuYnRuT3Blbk1vZGFsO1xyXG5cclxuICAgIG1haW5FbC5pbm5lckhUTUwgPSAnJztcclxuICAgIG1haW5FbC5hcHBlbmRDaGlsZChidG4pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRm9ybUVkaXRNb2RlKGNyZWF0ZUNsYXNzLCB0b2RvQ2xhc3MpIHtcclxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRNb2RhbElucHV0VmFsdWVzKCk7XHJcbiAgICBjb25zdCB0b2RvSWQgPSB0aGlzLmNsaWNrZWRFbERhdGEuZWxEYXRhLnRvZG8uaWQ7XHJcbiAgICBjb25zdCB0b2RvSW5kZXggPSB0aGlzLmNsaWNrZWRFbERhdGEuaW5kZXgudG9kbztcclxuICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHRoaXMuY2xpY2tlZEVsRGF0YS5pbmRleC5wcm9qZWN0O1xyXG4gICAgY29uc3QgdGFyZ2V0RWwgPSB0aGlzLmNsaWNrZWRFbERhdGEuaHRtbEVsLnRvZG9FbDtcclxuICAgIGNvbnN0IHRvZG8gPSBuZXcgdG9kb0NsYXNzKGlucHV0LmRlc2NyaXB0aW9uLCBpbnB1dC5kYXRlLCB0b2RvSWQpO1xyXG4gICAgY29uc3QgYXJyID0gY3JlYXRlQ2xhc3MuZ2V0VGFza3M7XHJcblxyXG4gICAgdG9kby51cGRhdGVET01FbGVtZW50KHRhcmdldEVsKTtcclxuICAgIHRhcmdldEVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCB0b2RvLnRvZG9IVE1MKCkpO1xyXG4gICAgdGFyZ2V0RWwucmVtb3ZlKCk7XHJcbiAgICBjcmVhdGVDbGFzcy51cGRhdGVFbGVtZW50SW5BcnJheSh0b2RvLCBhcnIsIHRvZG9JbmRleCwgcHJvamVjdEluZGV4KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZGFsRm9yQWRkVG9kb01vZGUoKSB7XHJcbiAgICBjb25zdCBlbCA9IHRoaXMuYWxsRWxlbWVudHM7XHJcblxyXG4gICAgZWwubWFpbkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XHJcbiAgICAgIGlmIChldi50YXJnZXQuZGF0YXNldC5idG5UeXBlID09PSAnYWRkLXRvZG8nKSB7XHJcbiAgICAgICAgY29uc3QgcERhdGEgPSB0aGlzLmNsaWNrZWRFbERhdGEuZWxEYXRhLnByb2plY3Q7XHJcbiAgICAgICAgZWwuaW5wdXRUaXRsZS5sYWJlbHNbMF0uY2xhc3NMaXN0LmFkZCgnZmxvYXQtbGFiZWwnKTtcclxuICAgICAgICBlbC5pbnB1dFRpdGxlLnZhbHVlID0gcERhdGEudGl0bGU7XHJcbiAgICAgICAgZWwuaW5wdXRDb250ZW50LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgZWwuaW5wdXREYXRlLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTW9kYWxGb3JFZGl0TW9kZSgpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5hbGxFbGVtZW50cztcclxuICAgIGVsLm1haW5FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xyXG4gICAgICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9kby1idG4tZWRpdCcpKSB7XHJcbiAgICAgICAgY29uc3QgZWxEYXRhID0gdGhpcy5jbGlja2VkRWxEYXRhLmVsRGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGVsRGF0YS5wcm9qZWN0KSB7XHJcbiAgICAgICAgICBlbC5pbnB1dFRpdGxlLnZhbHVlID0gZWxEYXRhLnByb2plY3QudGl0bGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbC5pbnB1dENvbnRlbnQudmFsdWUgPSBlbERhdGEudG9kby5kZXNjcmlwdGlvbjtcclxuICAgICAgICBlbC5pbnB1dERhdGUudmFsdWVBc051bWJlciA9IGVsRGF0YS50b2RvLmR1ZURhdGU7XHJcbiAgICAgICAgZWwuaW5wdXRDb250ZW50LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgZWwuaW5wdXREYXRlLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUNsaWNrZWRIdG1sRWxEYXRhKGNyZWF0ZUNsYXNzKSB7XHJcbiAgICBjb25zdCBtYWluRWwgPSB0aGlzLmFsbEVsZW1lbnRzLm1haW5FbDtcclxuXHJcbiAgICBjb25zdCBjbGFzc0xpc3RBcnJheSA9IFtcclxuICAgICAgJ3RvZG8tYnRuLWVkaXQnLFxyXG4gICAgICAnYnRuLWFkZC1wcm9qZWN0LXRvZG8nLFxyXG4gICAgICAndG9kby1idG4tZGVsZXRlJyxcclxuICAgICAgJ3Byb2plY3QtZGVsZXRlJyxcclxuICAgICAgJ3RvZG8tY2hlY2tib3gnLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IGhhc0NsYXNzSW5BcnJheSA9IChldmVudCkgPT5cclxuICAgICAgY2xhc3NMaXN0QXJyYXkuc29tZSgobmFtZSkgPT4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSk7XHJcblxyXG4gICAgbWFpbkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XHJcbiAgICAgIGlmIChoYXNDbGFzc0luQXJyYXkoZXYpKSB7XHJcbiAgICAgICAgY29uc3QgZWxJbmRleCA9IGNyZWF0ZUNsYXNzLmdldENsaWNrZWRFbGVtZW50SW5kZXgoXHJcbiAgICAgICAgICBldixcclxuICAgICAgICAgIGNyZWF0ZUNsYXNzLmdldFRhc2tzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgeyBlbGVtZW50LCAuLi5wcm9qZWN0QW5kVG9kbyB9ID0gY3JlYXRlQ2xhc3MuZ2V0Q2xpY2tlZEVsZW1lbnQoXHJcbiAgICAgICAgICBldixcclxuICAgICAgICAgIGNyZWF0ZUNsYXNzLmdldFRhc2tzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ2V0RGVmaW5lZEVudHJpZXMgPSAodmFyaWFibGUpID0+IHtcclxuICAgICAgICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhcmlhYmxlKS5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgKFssIHZhbHVlXSkgPT4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2xpY2tlZEVsRGF0YSA9IHtcclxuICAgICAgICAgIGluZGV4OiBnZXREZWZpbmVkRW50cmllcyhlbEluZGV4KSxcclxuICAgICAgICAgIGVsRGF0YTogZ2V0RGVmaW5lZEVudHJpZXMocHJvamVjdEFuZFRvZG8pLFxyXG4gICAgICAgICAgaHRtbEVsOiBnZXREZWZpbmVkRW50cmllcyhlbGVtZW50KSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpY2tlZEVsRGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRm9ybU1vZGVzKGNyZWF0ZUNsYXNzLCBwcm9qZWN0Q2xhc3MsIHRvZG9DbGFzcykge1xyXG4gICAgY29uc3QgZm9ybSA9IHRoaXMuYWxsRWxlbWVudHMuZm9ybTtcclxuXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldikgPT4ge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKGZvcm0uZGF0YXNldC5tb2RlID09PSAnY3JlYXRlJykge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRm9ybUNyZWF0ZU1vZGUoY3JlYXRlQ2xhc3MsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChmb3JtLmRhdGFzZXQubW9kZSA9PT0gJ2FkZC10b2RvJykge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRm9ybUFkZFRvZG9Nb2RlKGNyZWF0ZUNsYXNzLCBwcm9qZWN0Q2xhc3MsIHRvZG9DbGFzcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZm9ybS5kYXRhc2V0Lm1vZGUgPT09ICdlZGl0Jykge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRm9ybUVkaXRNb2RlKGNyZWF0ZUNsYXNzLCB0b2RvQ2xhc3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjcmVhdGVDbGFzcy5zYXZlVGFza3NJbkxvY2FsKCk7XHJcbiAgICAgIHRoaXMubWFzb25yeS5sYXlvdXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2xpY2tlZEVsZW1lbnQoY3JlYXRlQ2xhc3MsIGFycikge1xyXG4gICAgY29uc3QgbWFpbkVsID0gdGhpcy5hbGxFbGVtZW50cy5tYWluRWw7XHJcbiAgICBtYWluRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZG8tYnRuLWRlbGV0ZScpIHx8XHJcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1kZWxldGUnKVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBldlRhcmdldEVsID1cclxuICAgICAgICAgIGV2LnRhcmdldC5jbG9zZXN0KCcudG9kbycpIHx8IGV2LnRhcmdldC5jbG9zZXN0KCcucHJvamVjdCcpO1xyXG4gICAgICAgIHRoaXMubWFzb25yeS5yZW1vdmUoZXZUYXJnZXRFbCk7XHJcbiAgICAgICAgZXZUYXJnZXRFbC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNsaWNrZWRFbERhdGEuaW5kZXg7XHJcbiAgICAgICAgY3JlYXRlQ2xhc3MucmVtb3ZlRWxlbWVudEZyb21BcnJheShhcnIsIGluZGV4LnRvZG8sIGluZGV4LnByb2plY3QpO1xyXG5cclxuICAgICAgICB0aGlzLm1hc29ucnkubGF5b3V0KCk7XHJcbiAgICAgICAgY3JlYXRlQ2xhc3Muc2F2ZVRhc2tzSW5Mb2NhbCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldE1pbkRhdGUoKSB7XHJcbiAgICBmdW5jdGlvbiBjdXJyZW50RGF0ZSgpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWxsRWxlbWVudHMuaW5wdXREYXRlLnNldEF0dHJpYnV0ZSgnbWluJywgY3VycmVudERhdGUoKSk7XHJcbiAgfVxyXG5cclxuICBnZXRNb2RhbElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgaW5wdXRUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xyXG4gICAgY29uc3QgaW5wdXRDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKTtcclxuICAgIGNvbnN0IGlucHV0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IGlucHV0VGl0bGUudmFsdWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBpbnB1dENvbnRlbnQudmFsdWUsXHJcbiAgICAgIGRhdGU6IGlucHV0RGF0ZS52YWx1ZUFzTnVtYmVyLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlUb2RvKHRvZG9BcnIsIHRvZG9DbGFzcykge1xyXG4gICAgY29uc3QgbWFpbkVsID0gdGhpcy5hbGxFbGVtZW50cy5tYWluRWw7XHJcblxyXG4gICAgdG9kb0Fyci5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBjb25zdCB0b2RvID0gbmV3IHRvZG9DbGFzcyhcclxuICAgICAgICBlbC5kZXNjcmlwdGlvbixcclxuICAgICAgICBlbC5kdWVEYXRlLFxyXG4gICAgICAgIGVsLmlkLFxyXG4gICAgICAgIGVsLmNvbXBsZXRlZFxyXG4gICAgICApO1xyXG4gICAgICB0b2RvLmluc2VydEh0bWwobWFpbkVsLCB0b2RvLnRvZG9IVE1MKCkpO1xyXG4gICAgICB0aGlzLm1hc29ucnkuYXBwZW5kZWQodGhpcy5hbGxFbGVtZW50cy50b2RvRWwpO1xyXG4gICAgICB0aGlzLm1hc29ucnkubGF5b3V0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlQcm9qZWN0KHByb2plY3RBcnIsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKSB7XHJcbiAgICBjb25zdCBtYWluRWwgPSB0aGlzLmFsbEVsZW1lbnRzLm1haW5FbDtcclxuXHJcbiAgICBwcm9qZWN0QXJyLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgcHJvamVjdENsYXNzKGVsLnRpdGxlLCBlbC50YXNrcywgZWwuaWQpO1xyXG4gICAgICBwcm9qZWN0Lmluc2VydEh0bWwobWFpbkVsLCBwcm9qZWN0LnByb2plY3RIVE1MKCkpO1xyXG4gICAgICBjb25zdCBwcm9qZWN0RWwgPSB0aGlzLmFsbEVsZW1lbnRzLnByb2plY3RFTDtcclxuXHJcbiAgICAgIHByb2plY3QudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZG8gPSBuZXcgdG9kb0NsYXNzKFxyXG4gICAgICAgICAgdGFzay5kZXNjcmlwdGlvbixcclxuICAgICAgICAgIHRhc2suZHVlRGF0ZSxcclxuICAgICAgICAgIHRhc2suaWQsXHJcbiAgICAgICAgICB0YXNrLmNvbXBsZXRlZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcHJvamVjdEVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9kby50b2RvSFRNTCgpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubWFzb25yeS5hcHBlbmRlZChwcm9qZWN0RWwpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hc29ucnkubGF5b3V0KCk7XHJcbiAgfVxyXG5cclxuICBjaGVja2JveEV2ZW50SGFuZGxlcihjcmVhdGVDbGFzcywgdG9kb0NsYXNzKSB7XHJcbiAgICBjb25zdCBtYWluRUwgPSB0aGlzLmFsbEVsZW1lbnRzLm1haW5FbDtcclxuXHJcbiAgICBtYWluRUwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcclxuICAgICAgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZG8tY2hlY2tib3gnKSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsaWNrZWRFbERhdGEuZWxEYXRhLnRvZG87XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNsaWNrZWRFbERhdGEuaW5kZXg7XHJcbiAgICAgICAgY29uc3QgdG9kb0VsID0gdGhpcy5jbGlja2VkRWxEYXRhLmh0bWxFbC50b2RvRWw7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvZG8gPSBuZXcgdG9kb0NsYXNzKFxyXG4gICAgICAgICAgZGF0YS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgIGRhdGEuZHVlRGF0ZSxcclxuICAgICAgICAgIGRhdGEuaWQsXHJcbiAgICAgICAgICBkYXRhLmNvbXBsZXRlZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdG9kby5jaGFuZ2VDb21wbGV0ZWQoKTtcclxuICAgICAgICB0b2RvLnVwZGF0ZURPTUVsZW1lbnQodG9kb0VsKTtcclxuICAgICAgICB0b2RvRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHRvZG8udG9kb0hUTUwoKSk7XHJcbiAgICAgICAgdG9kb0VsLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBjcmVhdGVDbGFzcy51cGRhdGVFbGVtZW50SW5BcnJheShcclxuICAgICAgICAgIHRvZG8sXHJcbiAgICAgICAgICBjcmVhdGVDbGFzcy5nZXRUYXNrcyxcclxuICAgICAgICAgIGluZGV4LnRvZG8sXHJcbiAgICAgICAgICBpbmRleC5wcm9qZWN0XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY3JlYXRlQ2xhc3Muc2F2ZVRhc2tzSW5Mb2NhbCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlGaWx0ZXJlZEJ5VHlwZShjcmVhdGVDbGFzcywgcHJvamVjdENsYXNzLCB0b2RvQ2xhc3MpIHtcclxuICAgIGNvbnN0IGZpbHRlclRvZG8gPSBbXHJcbiAgICAgIHsgYnV0dG9uOiB0aGlzLmFsbEVsZW1lbnRzLmJ0blRvZG9Ub2RheSwgZmlsdGVyOiBpc1RvZGF5IH0sXHJcbiAgICAgIHsgYnV0dG9uOiB0aGlzLmFsbEVsZW1lbnRzLmJ0blRvZG9XZWVrLCBmaWx0ZXI6IGlzVGhpc1dlZWsgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgZmlsdGVyUHJvamVjdCA9IFtcclxuICAgICAgeyBidXR0b246IHRoaXMuYWxsRWxlbWVudHMuYnRuUHJvamVjdFRvZGF5LCBmaWx0ZXI6IGlzVG9kYXkgfSxcclxuICAgICAgeyBidXR0b246IHRoaXMuYWxsRWxlbWVudHMuYnRuUHJvamVjdFdlZWssIGZpbHRlcjogaXNUaGlzV2VlayB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBmaWx0ZXJUb2RvLmZvckVhY2goKHsgYnV0dG9uLCBmaWx0ZXIgfSkgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhck1haW5Db250ZW50KCk7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyZWRUb2RvcyA9IGNyZWF0ZUNsYXNzLmZpbHRlclRvZG9zQnlEdWVEYXRlKGZpbHRlcik7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5VG9kbyhmaWx0ZXJlZFRvZG9zLCB0b2RvQ2xhc3MpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZpbHRlclByb2plY3QuZm9yRWFjaCgoeyBidXR0b24sIGZpbHRlciB9KSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFyTWFpbkNvbnRlbnQoKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJlZFByb2plY3RzID0gY3JlYXRlQ2xhc3MuZmlsdGVyUHJvamVjdHNCeUR1ZURhdGUoZmlsdGVyKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlQcm9qZWN0KGZpbHRlcmVkUHJvamVjdHMsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlGaWx0ZXJCeVRpbWUoY3JlYXRlQ2xhc3MsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJCeVRpbWUgPSBbXHJcbiAgICAgIHsgYnV0dG9uOiB0aGlzLmFsbEVsZW1lbnRzLmJ0blRvZGF5LCBmaWx0ZXI6IGlzVG9kYXkgfSxcclxuICAgICAgeyBidXR0b246IHRoaXMuYWxsRWxlbWVudHMuYnRuV2VlaywgZmlsdGVyOiBpc1RoaXNXZWVrIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGZpbHRlckJ5VGltZS5mb3JFYWNoKCh7IGJ1dHRvbiwgZmlsdGVyIH0pID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xlYXJNYWluQ29udGVudCgpO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkUHJvamVjdHMgPSBjcmVhdGVDbGFzcy5maWx0ZXJQcm9qZWN0c0J5RHVlRGF0ZShmaWx0ZXIpO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVG9kb3MgPSBjcmVhdGVDbGFzcy5maWx0ZXJUb2Rvc0J5RHVlRGF0ZShmaWx0ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlQcm9qZWN0KGZpbHRlcmVkUHJvamVjdHMsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlUb2RvKGZpbHRlcmVkVG9kb3MsIHRvZG9DbGFzcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5QWxsKGNyZWF0ZUNsYXNzLCBwcm9qZWN0Q2xhc3MsIHRvZG9DbGFzcykge1xyXG4gICAgdGhpcy5hbGxFbGVtZW50cy5idG5TaG93QWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNsZWFyTWFpbkNvbnRlbnQoKTtcclxuXHJcbiAgICAgIGNvbnN0IGFyclRvZG9zID0gY3JlYXRlQ2xhc3MuZmlsdGVyVGFza3NCeVR5cGUoJ3RvZG8nKTtcclxuICAgICAgY29uc3QgYXJyUHJvamVjdHMgPSBjcmVhdGVDbGFzcy5maWx0ZXJUYXNrc0J5VHlwZSgncHJvamVjdCcpO1xyXG5cclxuICAgICAgdGhpcy5kaXNwbGF5UHJvamVjdChhcnJQcm9qZWN0cywgcHJvamVjdENsYXNzLCB0b2RvQ2xhc3MpO1xyXG4gICAgICB0aGlzLmRpc3BsYXlUb2RvKGFyclRvZG9zLCB0b2RvQ2xhc3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplTWV0aG9kcyh7XHJcbiAgICBjcmVhdGVDbGFzcyxcclxuICAgIHByb2plY3RDbGFzcyxcclxuICAgIHRvZG9DbGFzcyxcclxuICAgIHRvZG9BcnIsXHJcbiAgICBwcm9qZWN0QXJyLFxyXG4gIH0pIHtcclxuICAgIHRoaXMuaGFuZGxlRm9ybU1vZGVzKGNyZWF0ZUNsYXNzLCBwcm9qZWN0Q2xhc3MsIHRvZG9DbGFzcyk7XHJcbiAgICB0aGlzLmRpc3BsYXlQcm9qZWN0KHByb2plY3RBcnIsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKTtcclxuICAgIHRoaXMuZGlzcGxheVRvZG8odG9kb0FyciwgdG9kb0NsYXNzKTtcclxuICAgIHRoaXMuc2F2ZUNsaWNrZWRIdG1sRWxEYXRhKGNyZWF0ZUNsYXNzKTtcclxuICAgIHRoaXMudXBkYXRlTW9kYWxGb3JFZGl0TW9kZSgpO1xyXG4gICAgdGhpcy5yZW1vdmVDbGlja2VkRWxlbWVudChjcmVhdGVDbGFzcywgY3JlYXRlQ2xhc3MuZ2V0VGFza3MpO1xyXG4gICAgdGhpcy5jaGVja2JveEV2ZW50SGFuZGxlcihjcmVhdGVDbGFzcywgdG9kb0NsYXNzKTtcclxuICAgIHRoaXMuZGlzcGxheUZpbHRlcmVkQnlUeXBlKGNyZWF0ZUNsYXNzLCBwcm9qZWN0Q2xhc3MsIHRvZG9DbGFzcyk7XHJcbiAgICB0aGlzLmRpc3BsYXlBbGwoY3JlYXRlQ2xhc3MsIHByb2plY3RDbGFzcywgdG9kb0NsYXNzKTtcclxuICAgIHRoaXMuZGlzcGxheUZpbHRlckJ5VGltZShjcmVhdGVDbGFzcywgcHJvamVjdENsYXNzLCB0b2RvQ2xhc3MpO1xyXG4gICAgdGhpcy51cGRhdGVNb2RhbEZvckFkZFRvZG9Nb2RlKCk7XHJcbiAgICB0aGlzLnNldE1pbkRhdGUoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoZWxlbWVudHMpIHtcclxuICAgIHRoaXMuYWxsRWxlbWVudHMgPSBlbGVtZW50cztcclxuICAgIHRoaXMuaW5pdE1ldGhvZHMoKTtcclxuICB9XHJcblxyXG4gIGluaXRNZXRob2RzKCkge1xyXG4gICAgdGhpcy5tb2RhbEV2ZW50c0xpc3RlbmVycygpO1xyXG4gICAgdGhpcy50b2dnbGVNb2JpbGVNZW51KCk7XHJcbiAgICB0aGlzLmlucHV0U3RhdGVFdmVudExpc3RlbmVyKCk7XHJcbiAgICB0aGlzLmZsb2F0TGFiZWxzKCk7XHJcbiAgICB0aGlzLnRvZ2dsZUFkZEVkaXRUb2RvUHJvcGVydGllcygpO1xyXG4gICAgdGhpcy5jaGVja1JhZGlvVmFsaWRpdHkoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0TW9kYWwoKSB7XHJcbiAgICBjb25zdCBlbCA9IHRoaXMuYWxsRWxlbWVudHM7XHJcblxyXG4gICAgZWwuZm9ybS5yZXNldCgpO1xyXG4gICAgZWwuZm9ybS5kYXRhc2V0Lm1vZGUgPSAnY3JlYXRlJztcclxuICAgIGVsLmZpZWxkc2V0UmFkaW8uc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BvaW50ZXItZXZlbnRzJyk7XHJcbiAgICBlbC5pbnB1dFRpdGxlLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgIGVsLmlucHV0VGl0bGUubGFiZWxzWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2Zsb2F0LWxhYmVsJyk7XHJcbiAgICBlbC5pbnB1dENvbnRlbnQubGFiZWxzWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2Zsb2F0LWxhYmVsJyk7XHJcbiAgICBlbC5pbnB1dFRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XHJcbiAgICBlbC5idG5TdWJtaXQudGV4dENvbnRlbnQgPSAnQ3JlYXRlJztcclxuICAgIGVsLmlucHV0VGl0bGUucmVtb3ZlQXR0cmlidXRlKCdyZXF1aXJlZCcpO1xyXG4gICAgZWwuaW5wdXRDb250ZW50LnJlbW92ZUF0dHJpYnV0ZSgncmVxdWlyZWQnKTtcclxuICAgIGVsLmlucHV0RGF0ZS5yZW1vdmVBdHRyaWJ1dGUoJ3JlcXVpcmVkJyk7XHJcbiAgfVxyXG5cclxuICBtb2RhbEV2ZW50c0xpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IG1vZGFsID0gdGhpcy5hbGxFbGVtZW50cy5tb2RhbDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsKSB7XHJcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnJlc2V0TW9kYWwoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hbGxFbGVtZW50cy5idG5DbG9zZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICB0aGlzLnJlc2V0TW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWxsRWxlbWVudHMuYnRuT3Blbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICB0aGlzLnJlc2V0TW9kYWwoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTW9iaWxlTWVudSgpIHtcclxuICAgIGNvbnN0IHsgYnRuTW9iaWxlTWVudSwgYXNpZGVFbCwgbWFpbkVsIH0gPSB0aGlzLmFsbEVsZW1lbnRzO1xyXG4gICAgYnRuTW9iaWxlTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgYnRuTW9iaWxlTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgYXNpZGVFbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgbWFpbkVsLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dFN0YXRlRXZlbnRMaXN0ZW5lcigpIHtcclxuICAgIGNvbnN0IHsgaW5wdXRUb2RvLCBpbnB1dFByb2plY3QgfSA9IHRoaXMuYWxsRWxlbWVudHM7XHJcblxyXG4gICAgW2lucHV0VG9kbywgaW5wdXRQcm9qZWN0XS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudXBkYXRlSW5wdXRTdGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRTdGF0ZSgpIHtcclxuICAgIGNvbnN0IHsgaW5wdXRUb2RvLCBpbnB1dFRpdGxlLCBpbnB1dENvbnRlbnQsIGlucHV0RGF0ZSB9ID0gdGhpcy5hbGxFbGVtZW50cztcclxuXHJcbiAgICBpZiAoaW5wdXRUb2RvLmNoZWNrZWQpIHtcclxuICAgICAgaW5wdXRUaXRsZS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIGlucHV0VGl0bGUuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuICAgICAgaW5wdXRUaXRsZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICBpbnB1dFRpdGxlLmxhYmVsc1swXS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xyXG4gICAgICBpbnB1dENvbnRlbnQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlucHV0VGl0bGUucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICBpbnB1dFRpdGxlLnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgIGlucHV0VGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgaW5wdXRUaXRsZS5sYWJlbHNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgaW5wdXRDb250ZW50LnJlbW92ZUF0dHJpYnV0ZSgncmVxdWlyZWQnKTtcclxuICAgICAgaW5wdXRDb250ZW50LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICB9XHJcbiAgICBpbnB1dERhdGUuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICB9XHJcblxyXG4gIGZsb2F0TGFiZWxzKCkge1xyXG4gICAgY29uc3QgeyBpbnB1dFRpdGxlLCBpbnB1dENvbnRlbnQgfSA9IHRoaXMuYWxsRWxlbWVudHM7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlTGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUgIT09ICcgJykge1xyXG4gICAgICAgIHRoaXMubGFiZWxzWzBdLmNsYXNzTGlzdC5hZGQoJ2Zsb2F0LWxhYmVsJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sYWJlbHNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnZmxvYXQtbGFiZWwnKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBbaW5wdXRUaXRsZSwgaW5wdXRDb250ZW50XS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZUxhYmVsKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWRkRWRpdFRvZG9Qcm9wZXJ0aWVzKCkge1xyXG4gICAgY29uc3QgZWwgPSB0aGlzLmFsbEVsZW1lbnRzO1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZVByb3BlcnRpZXMgPSAobW9kZSwgYnRuVGV4dCkgPT4ge1xyXG4gICAgICBlbC5mb3JtLmRhdGFzZXQubW9kZSA9IG1vZGU7XHJcbiAgICAgIGVsLmJ0blN1Ym1pdC50ZXh0Q29udGVudCA9IGJ0blRleHQ7XHJcbiAgICAgIGVsLm1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgIGVsLmZpZWxkc2V0UmFkaW8uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICAgICAgZWwuaW5wdXRUb2RvLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICBlbC5pbnB1dFRpdGxlLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsLm1haW5FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0O1xyXG4gICAgICBpZiAoYnRuLmRhdGFzZXQuYnRuVHlwZSA9PT0gJ2VkaXQnKSB7XHJcbiAgICAgICAgY2hhbmdlUHJvcGVydGllcygnZWRpdCcsICdTYXZlJyk7XHJcbiAgICAgICAgZWwuaW5wdXRDb250ZW50LmxhYmVsc1swXS5jbGFzc0xpc3QuYWRkKCdmbG9hdC1sYWJlbCcpO1xyXG4gICAgICAgIGVsLmlucHV0VGl0bGUubGFiZWxzWzBdLmNsYXNzTGlzdC5hZGQoJ2Zsb2F0LWxhYmVsJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYnRuLmRhdGFzZXQuYnRuVHlwZSA9PT0gJ2FkZC10b2RvJykge1xyXG4gICAgICAgIGNoYW5nZVByb3BlcnRpZXMoJ2FkZC10b2RvJywgJ0FkZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrUmFkaW9WYWxpZGl0eSgpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5hbGxFbGVtZW50cztcclxuICAgIGNvbnN0IHJhZGlvcyA9IFtlbC5pbnB1dFByb2plY3QsIGVsLmlucHV0VG9kb107XHJcblxyXG4gICAgY29uc3QgY2hhbmdlUmFkaW9WYWxpZGl0eSA9ICgpID0+IHtcclxuICAgICAgY29uc3QgaXNUcnVlID0gcmFkaW9zLnNvbWUoKHJhZGlvKSA9PiByYWRpby5jaGVja2VkKTtcclxuXHJcbiAgICAgIGlzVHJ1ZVxyXG4gICAgICAgID8gZWwuZmllbGRzZXRSYWRpby5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkJylcclxuICAgICAgICA6IGVsLmZpZWxkc2V0UmFkaW8uY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xyXG4gICAgfTtcclxuICAgIGNoYW5nZVJhZGlvVmFsaWRpdHkoKTtcclxuXHJcbiAgICByYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+XHJcbiAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZVJhZGlvVmFsaWRpdHkpXHJcbiAgICApO1xyXG5cclxuICAgIGVsLm1haW5FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xyXG4gICAgICBjb25zdCBldkRhdGFTZXQgPSBldi50YXJnZXQuZGF0YXNldC5idG5UeXBlO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZXZEYXRhU2V0ID09PSAnYWRkLXRvZG8nIHx8XHJcbiAgICAgICAgZXZEYXRhU2V0ID09PSAnb3Blbi1tb2RhbCcgfHxcclxuICAgICAgICBldkRhdGFTZXQgPT09ICdlZGl0J1xyXG4gICAgICApIHtcclxuICAgICAgICBjaGFuZ2VSYWRpb1ZhbGlkaXR5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgQ3JlYXRlIGZyb20gJy4vY3JlYXRlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3QgZXh0ZW5kcyBDcmVhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCB0YXNrcywgaWQpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnR5cGUgPSAncHJvamVjdCc7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLnRhc2tzID0gdGFza3MgfHwgW107XHJcbiAgICB0aGlzLmlkID0gaWQgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBzdG9yZVRvZG9JblRhc2tzKHRvZG8pIHtcclxuICAgIHRoaXMudGFza3MucHVzaCh0b2RvKTtcclxuICB9XHJcblxyXG4gIGdldCBnZXRUYXNrcygpIHtcclxuICAgIHJldHVybiB0aGlzLnRhc2tzO1xyXG4gIH1cclxuXHJcbiAgcHJvamVjdEhUTUwodG9kbyA9ICcnKSB7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJwcm9qZWN0IG1hc29ucnktaXRlbVwiIGRhdGEtaWQ9XCIke3RoaXMuaWR9XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0LWhlYWRpbmdcIj5cclxuICAgICAgICA8aDI+JHt0aGlzLnRpdGxlfTwvaDI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kcm9wZG93bi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvZG8tYnRuLWRyb3Bkb3duXCI+XHJcbiAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjMyXCJcclxuICAgICAgICAgICAgICAgIGhlaWdodD1cIjMyXCJcclxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjU2IDI1NlwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMTU2IDEyOGEyOCAyOCAwIDEgMS0yOC0yOGEyOCAyOCAwIDAgMSAyOCAyOFpNNDggMTAwYTI4IDI4IDAgMSAwIDI4IDI4YTI4IDI4IDAgMCAwLTI4LTI4Wm0xNjAgMGEyOCAyOCAwIDEgMCAyOCAyOGEyOCAyOCAwIDAgMC0yOC0yOFpcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWRyb3Bkb3duLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGJ1dHRvbiBjbGFzcz1cImJ0bi1hZGQtcHJvamVjdC10b2RvXCIgZGF0YS1idG4tdHlwZT1cImFkZC10b2RvXCI+QWRkIFRvZG88L2J1dHRvbj48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxidXR0b24gY2xhc3M9XCJwcm9qZWN0LWRlbGV0ZVwiPkRlbGV0ZTwvYnV0dG9uPjwvbGk+XHJcbiAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICAgJHt0b2RvfVxyXG4gICAgPC9kaXY+YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IENyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XHJcbmltcG9ydCB7IGZvcm1hdCwgaXNUaGlzWWVhciB9IGZyb20gJ2RhdGUtZm5zJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8gZXh0ZW5kcyBDcmVhdGUge1xyXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBpZCwgY29tcGxldGVkKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy50eXBlID0gJ3RvZG8nO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkIHx8IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGlkIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQ29tcGxldGVkKCkge1xyXG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0aGlzLmNvbXBsZXRlZCA/IGZhbHNlIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZvcm1hdHRlZERhdGUoKSB7XHJcbiAgICByZXR1cm4gaXNUaGlzWWVhcih0aGlzLmR1ZURhdGUpXHJcbiAgICAgID8gZm9ybWF0KHRoaXMuZHVlRGF0ZSwgJ01NTS4gZCwgZWVlLicpXHJcbiAgICAgIDogZm9ybWF0KHRoaXMuZHVlRGF0ZSwgJ3kuIE1NTS4gZCwgZWVlLicpO1xyXG4gIH1cclxuXHJcbiAgdG9kb0hUTUwoKSB7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ0b2RvIG1hc29ucnktaXRlbVwiIGRhdGEtaWQ9XCIke3RoaXMuaWR9XCI+XHJcbiAgPGRpdiBjbGFzcz1cInRvZG8tY29udGVudC1jb250YWluZXJcIj5cclxuICAgIDxsYWJlbCBjbGFzcz1cInRvZG8tY2hlY2tib3gtY29udGFpbmVyXCI+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgbmFtZT1cInRvZG8tY2hlY2tib3hcIlxyXG4gICAgICAgIGNsYXNzPVwidG9kby1jaGVja2JveFwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cInRvZG8gY2hlY2tib3hcIlxyXG4gICAgICAgICR7dGhpcy5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJ31cclxuICAgICAgLz5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja21hcmtcIj48L3NwYW4+XHJcbiAgICA8L2xhYmVsPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvZG8tdGV4dCAke3RoaXMuY29tcGxldGVkID8gJ3RvZG8tZG9uZScgOiAnJ31cIj5cclxuICAgICAgPHA+XHJcbiAgICAgICAgJHt0aGlzLmRlc2NyaXB0aW9ufVxyXG4gICAgICA8L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWluZm8tY29udGFpbmVyXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1kYXRlXCI+JHt0aGlzLmZvcm1hdHRlZERhdGUoKX08L3NwYW4+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWRyb3Bkb3duLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2RvLWJ0bi1kcm9wZG93blwiPlxyXG4gICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICAgICAgd2lkdGg9XCIzMlwiXHJcbiAgICAgICAgICAgIGhlaWdodD1cIjMyXCJcclxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNTYgMjU2XCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICBkPVwiTTE1NiAxMjhhMjggMjggMCAxIDEtMjgtMjhhMjggMjggMCAwIDEgMjggMjhaTTQ4IDEwMGEyOCAyOCAwIDEgMCAyOCAyOGEyOCAyOCAwIDAgMC0yOC0yOFptMTYwIDBhMjggMjggMCAxIDAgMjggMjhhMjggMjggMCAwIDAtMjgtMjhaXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWRyb3Bkb3duLWNvbnRlbnRcIj5cclxuICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgPGxpPjxidXR0b24gY2xhc3M9XCJ0b2RvLWJ0bi1lZGl0XCIgIGRhdGEtYnRuLXR5cGU9XCJlZGl0XCI+RWRpdDwvYnV0dG9uPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT48YnV0dG9uIGNsYXNzPVwidG9kby1idG4tZGVsZXRlXCIgIGRhdGE9XCJkZWxldGVcIj5EZWxldGU8L2J1dHRvbj48L2xpPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiAgYDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZURPTUVsZW1lbnQoZWwpIHtcclxuICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2RvLXRleHQnKS50ZXh0Q29udGVudCA9IHRoaXMuZGVzY3JpcHRpb247XHJcbiAgICBlbC5xdWVyeVNlbGVjdG9yKCcudG9kby1kYXRlJykudGV4dENvbnRlbnQgPSB0aGlzLmZvcm1hdHRlZERhdGUoKTtcclxuICB9XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qXG4gIEpvc2gncyBDdXN0b20gQ1NTIFJlc2V0XG4gIGh0dHBzOi8vd3d3Lmpvc2h3Y29tZWF1LmNvbS9jc3MvY3VzdG9tLWNzcy1yZXNldC9cbiovXG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4qIHtcbiAgbWFyZ2luOiAwO1xufVxuXG5ib2R5IHtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG59XG5cbmltZyxcbnBpY3R1cmUsXG52aWRlbyxcbmNhbnZhcyxcbnN2ZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbmlucHV0LFxuYnV0dG9uLFxudGV4dGFyZWEsXG5zZWxlY3Qge1xuICBmb250OiBpbmhlcml0O1xufVxuXG5wLFxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbn1cblxuI3Jvb3QsXG4jX19uZXh0IHtcbiAgaXNvbGF0aW9uOiBpc29sYXRlO1xufVxuXG4ubW9kYWwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig1cHgpO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICB6LWluZGV4OiA5OTk5O1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm9yZGVyOiAycHggc29saWQgI2JiYmJiYjtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIGNvbG9yOiAjMDAwMDAwO1xuICBwYWRkaW5nOiAzcmVtIDJyZW0gMnJlbTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogNTAwcHg7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgLmJ0bi1jbG9zZS5tb2RhbC1jbG9zZSB7XG4gIGNvbG9yOiAjYmJiYmJiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMXJlbTtcbiAgcmlnaHQ6IDJyZW07XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMnM7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgLmJ0bi1jbG9zZS5tb2RhbC1jbG9zZTpob3ZlciB7XG4gIGNvbG9yOiAjOGU4ZThlO1xuICBzY2FsZTogMS4yO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0ge1xuICBmb250LWZhbWlseTogXCJBUiBPbmUgU2Fuc1wiLCBzYW5zLXNlcmlmO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQge1xuICBib3JkZXI6IG5vbmU7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1yYWRpbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LXJhZGlvOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiUGxlYXNlIHNlbGVjdCB0eXBlIVwiO1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTIwcHg7XG4gIHJpZ2h0OiBjYWxjKCgxMDAlIC0gMTM4cHgpIC8gMik7XG4gIGNvbG9yOiAjZDMwMDAwO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQuaW5wdXQtcmFkaW8uaW52YWxpZDo6YWZ0ZXIge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LXJhZGlvIGRpdiB7XG4gIHdpZHRoOiA1MCU7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1yYWRpbyBkaXYgbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA2OGZmZjtcbiAgYm9yZGVyOiBzb2xpZCAycHggI2JiYmJiYjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogI2VlZWVlZTtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICBwYWRkaW5nOiAxcmVtIDJyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LXJhZGlvIGRpdiBsYWJlbDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MmFhZmY7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1yYWRpbyBkaXYgbGFiZWxbZm9yPXByb2plY3RdIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAwIDAgMTBweDtcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1yYWRpbyBkaXYgbGFiZWxbZm9yPXRvZG9dIHtcbiAgYm9yZGVyLXJhZGl1czogMCAxMHB4IDEwcHggMDtcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LXJhZGlvIGRpdiBpbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQuaW5wdXQtcmFkaW8gZGl2IGlucHV0OmNoZWNrZWQgfiBsYWJlbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzNWE0ZmY7XG4gIGJvcmRlci1jb2xvcjogIzhlOGU4ZTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgc2NhbGU6IDEuMDU7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMnM7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1yYWRpbyBkaXYgaW5wdXQ6aW52YWxpZCArIGxhYmVsIHtcbiAgYm9yZGVyLWNvbG9yOiAjZDMwMDAwO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQuaW5wdXQtY29udGVudCBkaXYge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1jb250ZW50IGRpdiBpbnB1dCxcbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LWNvbnRlbnQgYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYm9yZGVyOiAycHggc29saWQgI2JiYmJiYjtcbiAgcGFkZGluZzogMXJlbSAxcmVtIDAuM3JlbTtcbiAgb3V0bGluZTogbm9uZTtcbiAgd2lkdGg6IDEwMCU7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1jb250ZW50IGRpdiBsYWJlbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY3Vyc29yOiB0ZXh0O1xuICB0b3A6IDEzcHg7XG4gIGxlZnQ6IDEwcHg7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMnM7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1jb250ZW50IGRpdiBpbnB1dDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzA2OGZmZjtcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LWNvbnRlbnQgZGl2IGlucHV0OmZvY3VzICsgbGFiZWwsXG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1jb250ZW50IC5mbG9hdC1sYWJlbCB7XG4gIHRvcDogMnB4O1xuICBsZWZ0OiAxOHB4O1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgb3BhY2l0eTogNjAlO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjJzO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQuaW5wdXQtY29udGVudCA+ICo6bm90KDpmaXJzdC1jaGlsZCkge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQuaW5wdXQtY29udGVudCBkaXYgaW5wdXQ6aW52YWxpZCxcbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LWNvbnRlbnQgZGl2IGlucHV0OmZvY3VzOmludmFsaWQge1xuICBib3JkZXItY29sb3I6ICNkMzAwMDA7XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1jb250ZW50IGRpdiBpbnB1dDppbnZhbGlkICsgbGFiZWwge1xuICBjb2xvcjogI2QzMDAwMDtcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LWNvbnRlbnQgZGl2IGlucHV0OmludmFsaWQgKyBsYWJlbDo6YWZ0ZXIge1xuICBjb250ZW50OiBcIiByZXF1aXJlZCFcIjtcbn1cbi5tb2RhbCAubW9kYWwtY29udGVudCBmb3JtIGZpZWxkc2V0LmlucHV0LWNvbnRlbnQgZGl2IGlucHV0OmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjMDY4ZmZmO1xufVxuLm1vZGFsIC5tb2RhbC1jb250ZW50IGZvcm0gZmllbGRzZXQuaW5wdXQtY29udGVudCBidXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDY4ZmZmO1xuICBjb2xvcjogI2VlZWVlZTtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICBwYWRkaW5nOiAwLjdyZW07XG59XG4ubW9kYWwgLm1vZGFsLWNvbnRlbnQgZm9ybSBmaWVsZHNldC5pbnB1dC1jb250ZW50IGJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNiwgMTQzLCAyNTUsIDAuODE5NjA3ODQzMSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYXNpZGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDY4ZmZmO1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgOHB4IDhweCAxMnB4IDZweDtcbiAgY29sb3I6ICNlZWVlZWU7XG4gIHBhZGRpbmc6IDJyZW07XG4gIG1pbi13aWR0aDogZml0LWNvbnRlbnQ7XG4gIHotaW5kZXg6IDk5OTtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5hc2lkZSBoZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiA0cmVtO1xufVxuYXNpZGUgaGVhZGVyIGgxIHtcbiAgZm9udC1zaXplOiAycmVtO1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB0b3A6IDFyZW07XG4gIGJvdHRvbTogMnJlbTtcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNHJlbSk7XG59XG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSAuYnRuLW1lbnUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBkaXNwbGF5OiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDUwcHg7XG4gIHRyYW5zaXRpb246IGFsbCAxcyBlYXNlO1xuICB3aWR0aDogNTBweDtcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IC5idG4tbWVudTpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IC5idG4tbWVudSBzcGFuIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGhlaWdodDogNnB4O1xuICBtYXJnaW46IDEwcHggMDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcbiAgd2lkdGg6IDEwMCU7XG59XG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSAuYnRuLW1lbnUuYWN0aXZlIHNwYW46bnRoLWNoaWxkKDEpIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMjUlO1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgLmJ0bi1tZW51LmFjdGl2ZSBzcGFuOm50aC1jaGlsZCgyKSB7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IDBtcztcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IC5idG4tbWVudS5hY3RpdmUgc3BhbjpudGgtY2hpbGQoMykge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMjUlO1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgdWwgbGkgYnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IHVsIC5uYXYtc2hvdy1hbGwge1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IHVsIC5uYXYtc2hvdy1hbGwgLmJ0bi1zaG93LWFsbCB7XG4gIGNvbG9yOiAjZWVlZWVlO1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgdWwgLm5hdi10b2RheSxcbmFzaWRlIC5jb250YWluZXItc3RpY2t5IHVsIC5uYXYtd2VlayB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgdWwgLm5hdi10b2RheSAqLFxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgdWwgLm5hdi13ZWVrICoge1xuICBjb2xvcjogaW5oZXJpdDtcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IHVsIC5uYXYtdG9kYXkgPiBidXR0b24sXG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSB1bCAubmF2LXdlZWsgPiBidXR0b24ge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbn1cbmFzaWRlIC5jb250YWluZXItc3RpY2t5IHVsIC5uYXYtdG9kYXkgbGkgPiBidXR0b24sXG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSB1bCAubmF2LXdlZWsgbGkgPiBidXR0b24ge1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG59XG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSBmb290ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LWZhbWlseTogXCJBUiBPbmUgU2Fuc1wiLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNDAwO1xufVxuYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgZm9vdGVyIHAge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSBmb290ZXIgc3ZnIHtcbiAgY29sb3I6ICNlZWVlZWU7XG59XG5hc2lkZSAuY29udGFpbmVyLXN0aWNreSBmb290ZXIgc3ZnOmhvdmVyIHtcbiAgc2NhbGU6IDEuMTtcbn1cblxubWFpbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgcGFkZGluZzogMnJlbTtcbiAgd2lkdGg6IDEwMCU7XG59XG5tYWluIG1haW4gPiAubWFzb25yeS1pdGVtIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XG59XG5tYWluIC5wcm9qZWN0ID4gLm1hc29ucnktaXRlbS50b2RvIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5tYWluIC5idG4tb3Blbi1tb2RhbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwNjhmZmY7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMCAwIDEwcHggNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDFyZW07XG4gIGJvdHRvbTogMXJlbTtcbiAgaGVpZ2h0OiA2MHB4O1xuICB3aWR0aDogNjBweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbn1cbm1haW4gLmJ0bi1vcGVuLW1vZGFsOjpiZWZvcmUsIG1haW4gLmJ0bi1vcGVuLW1vZGFsOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogNjAlO1xuICB3aWR0aDogNnB4O1xuICByaWdodDogY2FsYyg1MCUgLSAzcHgpO1xuICBib3R0b206IDIwJTtcbn1cbm1haW4gLmJ0bi1vcGVuLW1vZGFsOjphZnRlciB7XG4gIHJvdGF0ZTogOTBkZWc7XG59XG5tYWluIC5idG4tb3Blbi1tb2RhbDpob3ZlciB7XG4gIHNjYWxlOiAxLjE7XG59XG5tYWluIC5wcm9qZWN0LFxubWFpbiAudG9kbyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgYm9yZGVyOiAjYmJiYmJiIDJweCBzb2xpZDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcGFkZGluZzogMXJlbTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcbn1cbm1haW4gLnByb2plY3Q6aG92ZXIsXG5tYWluIC50b2RvOmhvdmVyIHtcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjIpIDRweCA0cHggOXB4IDNweDtcbn1cbm1haW4gLnByb2plY3QgLnByb2plY3QtaGVhZGluZyxcbm1haW4gLnRvZG8gLnByb2plY3QtaGVhZGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbn1cbm1haW4gLnByb2plY3QgLnByb2plY3QtaGVhZGluZyBoMixcbm1haW4gLnRvZG8gLnByb2plY3QtaGVhZGluZyBoMiB7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiLCBzYW5zLXNlcmlmO1xufVxubWFpbiAucHJvamVjdCAudG9kby1kcm9wZG93bi1jb250YWluZXIsXG5tYWluIC50b2RvIC50b2RvLWRyb3Bkb3duLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbm1haW4gLnByb2plY3QgLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWJ0bi1kcm9wZG93bixcbm1haW4gLnRvZG8gLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWJ0bi1kcm9wZG93biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWRyb3Bkb3duLWNvbnRhaW5lciAudG9kby1idG4tZHJvcGRvd24gc3ZnLFxubWFpbiAudG9kbyAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tYnRuLWRyb3Bkb3duIHN2ZyB7XG4gIGNvbG9yOiAjYmJiYmJiO1xufVxubWFpbiAucHJvamVjdCAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tYnRuLWRyb3Bkb3duIHN2Zzpob3Zlcixcbm1haW4gLnRvZG8gLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWJ0bi1kcm9wZG93biBzdmc6aG92ZXIge1xuICBjb2xvcjogIzhlOGU4ZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxubWFpbiAucHJvamVjdCAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tZHJvcGRvd24tY29udGVudCxcbm1haW4gLnRvZG8gLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWRyb3Bkb3duLWNvbnRlbnQge1xuICBkaXNwbGF5OiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiAjYmJiYmJiIDJweCBzb2xpZDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6ICMwMDAwMDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDM2cHg7XG4gIHRvcDogMTBweDtcbiAgZm9udC1mYW1pbHk6IFwiQVIgT25lIFNhbnNcIiwgc2Fucy1zZXJpZjtcbiAgd2lkdGg6IG1heC1jb250ZW50O1xufVxubWFpbiAucHJvamVjdCAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tZHJvcGRvd24tY29udGVudCB1bCxcbm1haW4gLnRvZG8gLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWRyb3Bkb3duLWNvbnRlbnQgdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwLjVyZW07XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWRyb3Bkb3duLWNvbnRhaW5lciAudG9kby1kcm9wZG93bi1jb250ZW50IHVsIGJ1dHRvbjpob3Zlcixcbm1haW4gLnRvZG8gLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWRyb3Bkb3duLWNvbnRlbnQgdWwgYnV0dG9uOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWRyb3Bkb3duLWNvbnRhaW5lciAudG9kby1kcm9wZG93bi1jb250ZW50IHVsIC50b2RvLWJ0bi1lZGl0LFxubWFpbiAucHJvamVjdCAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tZHJvcGRvd24tY29udGVudCB1bCAuYnRuLWFkZC1wcm9qZWN0LXRvZG8sXG5tYWluIC50b2RvIC50b2RvLWRyb3Bkb3duLWNvbnRhaW5lciAudG9kby1kcm9wZG93bi1jb250ZW50IHVsIC50b2RvLWJ0bi1lZGl0LFxubWFpbiAudG9kbyAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tZHJvcGRvd24tY29udGVudCB1bCAuYnRuLWFkZC1wcm9qZWN0LXRvZG8ge1xuICBjb2xvcjogIzAwMDAwMDtcbn1cbm1haW4gLnByb2plY3QgLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWRyb3Bkb3duLWNvbnRlbnQgdWwgLnRvZG8tYnRuLWRlbGV0ZSxcbm1haW4gLnByb2plY3QgLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIC50b2RvLWRyb3Bkb3duLWNvbnRlbnQgdWwgLnByb2plY3QtZGVsZXRlLFxubWFpbiAudG9kbyAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tZHJvcGRvd24tY29udGVudCB1bCAudG9kby1idG4tZGVsZXRlLFxubWFpbiAudG9kbyAudG9kby1kcm9wZG93bi1jb250YWluZXIgLnRvZG8tZHJvcGRvd24tY29udGVudCB1bCAucHJvamVjdC1kZWxldGUge1xuICBjb2xvcjogI2QzMDAwMDtcbn1cbm1haW4gLnByb2plY3QgLnRvZG8tZHJvcGRvd24tY29udGFpbmVyOmhvdmVyIC50b2RvLWRyb3Bkb3duLWNvbnRlbnQsXG5tYWluIC50b2RvIC50b2RvLWRyb3Bkb3duLWNvbnRhaW5lcjpob3ZlciAudG9kby1kcm9wZG93bi1jb250ZW50IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5tYWluIC5wcm9qZWN0IC5wcm9qZWN0LXRvZG8sXG5tYWluIC5wcm9qZWN0IC50b2RvLWNvbnRlbnQtY29udGFpbmVyLFxubWFpbiAudG9kbyAucHJvamVjdC10b2RvLFxubWFpbiAudG9kbyAudG9kby1jb250ZW50LWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTBweCBhdXRvO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gNTBweDtcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXCJjaGVja2JveCB0b2RvXCIgXCJjaGVja2JveCB0b2RvLWluZm9cIjtcbiAgYm9yZGVyOiAjYmJiYmJiIDFweCBzb2xpZDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgZm9udC1mYW1pbHk6IFwiQVIgT25lIFNhbnNcIiwgc2Fucy1zZXJpZjtcbn1cbm1haW4gLnByb2plY3QgLnByb2plY3QtdG9kbzpub3QoOmxhc3QtY2hpbGQpLFxubWFpbiAucHJvamVjdCAudG9kby1jb250ZW50LWNvbnRhaW5lcjpub3QoOmxhc3QtY2hpbGQpLFxubWFpbiAudG9kbyAucHJvamVjdC10b2RvOm5vdCg6bGFzdC1jaGlsZCksXG5tYWluIC50b2RvIC50b2RvLWNvbnRlbnQtY29udGFpbmVyOm5vdCg6bGFzdC1jaGlsZCkge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxubWFpbiAucHJvamVjdCAudG9kby1jaGVja2JveC1jb250YWluZXIsXG5tYWluIC50b2RvIC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGdyaWQtYXJlYTogY2hlY2tib3g7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWNoZWNrYm94LWNvbnRhaW5lcjpob3ZlciAuY2hlY2ttYXJrLFxubWFpbiAudG9kbyAudG9kby1jaGVja2JveC1jb250YWluZXI6aG92ZXIgLmNoZWNrbWFyayB7XG4gIG91dGxpbmU6IDJweCBzb2xpZCAjOGU4ZThlO1xufVxubWFpbiAucHJvamVjdCAudG9kby1jaGVja2JveC1jb250YWluZXIgaW5wdXQ6Y2hlY2tlZCB+IC5jaGVja21hcmssXG5tYWluIC50b2RvIC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciBpbnB1dDpjaGVja2VkIH4gLmNoZWNrbWFyayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwNjhmZmY7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciBpbnB1dDpjaGVja2VkIH4gLmNoZWNrbWFyazphZnRlcixcbm1haW4gLnRvZG8gLnRvZG8tY2hlY2tib3gtY29udGFpbmVyIGlucHV0OmNoZWNrZWQgfiAuY2hlY2ttYXJrOmFmdGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciBpbnB1dCxcbm1haW4gLnRvZG8gLnRvZG8tY2hlY2tib3gtY29udGFpbmVyIGlucHV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvcGFjaXR5OiAwO1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xufVxubWFpbiAucHJvamVjdCAudG9kby1jaGVja2JveC1jb250YWluZXIgaW5wdXQ6Y2hlY2tlZCAuY2hlY2ttYXJrOmFmdGVyLFxubWFpbiAudG9kbyAudG9kby1jaGVja2JveC1jb250YWluZXIgaW5wdXQ6Y2hlY2tlZCAuY2hlY2ttYXJrOmFmdGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciAuY2hlY2ttYXJrLFxubWFpbiAudG9kbyAudG9kby1jaGVja2JveC1jb250YWluZXIgLmNoZWNrbWFyayB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvdXRsaW5lOiAxcHggc29saWQgI2JiYmJiYjtcbiAgaGVpZ2h0OiAzNXB4O1xuICB3aWR0aDogMzVweDtcbn1cbm1haW4gLnByb2plY3QgLnRvZG8tY2hlY2tib3gtY29udGFpbmVyIC5jaGVja21hcms6YWZ0ZXIsXG5tYWluIC50b2RvIC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciAuY2hlY2ttYXJrOmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBub25lO1xuICBsZWZ0OiAxMnB4O1xuICB0b3A6IDBweDtcbiAgd2lkdGg6IDEzcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYm9yZGVyOiBzb2xpZCAjZWVlZWVlO1xuICBib3JkZXItd2lkdGg6IDAgNXB4IDVweCAwO1xuICBib3JkZXItcmFkaXVzOiAwIDAgNXB4IDA7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQwZGVnKTtcbn1cbkBrZXlmcmFtZXMgbGluZSB7XG4gIGZyb20ge1xuICAgIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgdG8ge1xuICAgIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogI2QzMDAwMDtcbiAgfVxufVxubWFpbiAucHJvamVjdCAudG9kby10ZXh0LFxubWFpbiAudG9kbyAudG9kby10ZXh0IHtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjYmJiYmJiO1xuICBib3JkZXItYm90dG9tOiBzb2xpZCAxcHggI2JiYmJiYjtcbiAgcGFkZGluZzogMXJlbTtcbiAgbWF4LWhlaWdodDogMjAwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBncmlkLWFyZWE6IHRvZG87XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWRvbmUsXG5tYWluIC50b2RvIC50b2RvLWRvbmUge1xuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcbiAgdGV4dC1kZWNvcmF0aW9uLXRoaWNrbmVzczogM3B4O1xuICB0ZXh0LWRlY29yYXRpb24tY29sb3I6ICNkMzAwMDA7XG4gIGFuaW1hdGlvbjogbGluZSAxcyBsaW5lYXI7XG59XG5tYWluIC5wcm9qZWN0IC50b2RvLWluZm8tY29udGFpbmVyLFxubWFpbiAudG9kbyAudG9kby1pbmZvLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjYmJiYmJiO1xuICBwYWRkaW5nOiAwIDFyZW07XG4gIGdyaWQtYXJlYTogdG9kby1pbmZvO1xufVxubWFpbiAucHJvamVjdCAudG9kby1pbmZvLWNvbnRhaW5lciAudG9kby1kYXRlLFxubWFpbiAudG9kbyAudG9kby1pbmZvLWNvbnRhaW5lciAudG9kby1kYXRlIHtcbiAgb3BhY2l0eTogNjAlO1xufVxubWFpbiAucHJvamVjdCA+IC50b2RvIHtcbiAgcGFkZGluZzogMDtcbn1cbm1haW4gLnByb2plY3QgPiAudG9kbzpub3QoOmxhc3QtY2hpbGQpIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cbm1haW4gLnByb2plY3QgPiAudG9kbyAudG9kby1jb250ZW50LWNvbnRhaW5lciB7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6ICNiYmJiYmI7XG59XG5idXR0b246aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGNvbG9yOiAjOGU4ZThlO1xufVxuXG4udmlzdWFsbHktaGlkZGVuIHtcbiAgYm9yZGVyOiAwO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDFweDtcbiAgd2lkdGg6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY2xpcDogcmVjdCgxcHggMXB4IDFweCAxcHgpO1xuICBjbGlwOiByZWN0KDFweCwgMXB4LCAxcHgsIDFweCk7XG4gIGNsaXAtcGF0aDogaW5zZXQoNTAlKTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmRpc2FibGVkIHtcbiAgb3BhY2l0eTogNTAlO1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIGJvZHkge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbiAgYXNpZGUge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZy10b3A6IDA7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGhlaWdodDogOTBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlO1xuICB9XG4gIGFzaWRlIC5jb250YWluZXItc3RpY2t5IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cbiAgYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgLmJ0bi1tZW51LFxuICBhc2lkZSAuY29udGFpbmVyLXN0aWNreSAuYnRuLW1lbnUuYWN0aXZlIHtcbiAgICBkaXNwbGF5OiBpbml0aWFsO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbiAgYXNpZGUgLmNvbnRhaW5lci1zdGlja3kgZm9vdGVyIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB9XG4gIGFzaWRlLmFjdGl2ZSB7XG4gICAgaGVpZ2h0OiA1MzBweDtcbiAgfVxuICBtYWluIHtcbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XG4gIH1cbiAgbWFpbi5hY3RpdmUge1xuICAgIG1hcmdpbi10b3A6IDQxMHB4O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcbiAgLm1hc29ucnktaXRlbS50b2RvLFxuICAubWFzb25yeS1pdGVtLnByb2plY3Qge1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAycmVtKTtcbiAgfVxufVxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgLm1hc29ucnktaXRlbS50b2RvLFxuICAubWFzb25yeS1pdGVtLnByb2plY3Qge1xuICAgIHdpZHRoOiA0NSU7XG4gIH1cbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTQ0MHB4KSB7XG4gIC5tYXNvbnJ5LWl0ZW0udG9kbyxcbiAgLm1hc29ucnktaXRlbS5wcm9qZWN0IHtcbiAgICB3aWR0aDogMzAlO1xuICB9XG59XG5ib2R5IHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuaGVhZGVyLFxubmF2IHtcbiAgZmxleDogMDtcbn1cblxuZm9vdGVyIHtcbiAgbWFyZ2luLXRvcDogYXV0bztcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNldC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zdHlsZS5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbW9kYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYXNpZGUuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21haW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2J1dHRvbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3V0aWxpdGllcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fYnJlYWtwb2ludHMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBQUE7QUFJQTs7O0VBR0Usc0JBQUE7QUNDRjs7QURDQTtFQUNFLFNBQUE7QUNFRjs7QURBQTtFQUNFLGdCQUFBO0VBQ0EsbUNBQUE7QUNHRjs7QUREQTs7Ozs7RUFLRSxjQUFBO0VBQ0EsZUFBQTtBQ0lGOztBREZBOzs7O0VBSUUsYUFBQTtBQ0tGOztBREhBOzs7Ozs7O0VBT0UseUJBQUE7QUNNRjs7QURKQTs7RUFFRSxrQkFBQTtBQ09GOztBQ2hEQTtFQUNFLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG9DQUFBO0VBQ0EsMEJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7QURtREY7QUNqREU7RUFDRSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQ0FBQTtFQUNBLGNDZFk7RURlWix1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBRG1ESjtBQ2pESTtFQUNFLGNDbEJVO0VEbUJWLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtBRG1ETjtBQ2pETTtFQUNFLGNDdkJTO0VEd0JULFVBQUE7QURtRFI7QUMvQ0k7RUFDRSxzQ0N4QlE7QUZ5RWQ7QUMvQ007RUFDRSxZQUFBO0FEaURSO0FDOUNNO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0FEZ0RSO0FDOUNRO0VBQ0UsOEJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsK0JBQUE7RUFDQSxjQzlDSTtBRjhGZDtBQzdDUTtFQUNFLGNBQUE7QUQrQ1Y7QUM1Q1E7RUFDRSxVQUFBO0FEOENWO0FDNUNV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LFVBQUE7QUo0VEo7QUkxVEk7RUFDRSxtQkFBQTtBSjRUTjtBSXpUSTtFQUNFLFlBQUE7QUoyVE47O0FLL2lCQTtFQUNFLDZCQUFBO0VBQ0EsWUFBQTtFQUNBLGNIQ2M7QUZpakJoQjtBS2hqQkU7RUFDRSxlQUFBO0VBQ0EsY0hEYTtBRm1qQmpCOztBTXpqQkE7RUFDRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSw2QkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBTjRqQkY7O0FNempCQTtFQUNFLFlBQUE7QU40akJGOztBTzNrQkE7RUFDRTtJQUNFLHNCQUFBO0VQOGtCRjtFTzNrQkE7SUFDRSxnQkFBQTtJQUNBLGNBQUE7SUFDQSxlQUFBO0lBQ0EsWUFBQTtJQUNBLFdBQUE7SUFDQSx5QkFBQTtFUDZrQkY7RU8za0JFO0lBQ0Usa0JBQUE7RVA2a0JKO0VPM2tCSTs7SUFFRSxnQkFBQTtJQUNBLGtCQUFBO0lBQ0EsTUFBQTtJQUNBLFFBQUE7RVA2a0JOO0VPMWtCSTtJQUNFLG1CQUFBO0VQNGtCTjtFT3ZrQkE7SUFDRSxhQUFBO0VQeWtCRjtFT3RrQkE7SUFDRSxnQkFBQTtJQUNBLHlCQUFBO0VQd2tCRjtFT3JrQkE7SUFDRSxpQkFBQTtJQUNBLHlCQUFBO0VQdWtCRjtBQUNGO0FPcGtCQTtFQUNFOztJQUVFLHdCQUFBO0VQc2tCRjtBQUNGO0FPbmtCQTtFQUNFOztJQUVFLFVBQUE7RVBxa0JGO0FBQ0Y7QU9sa0JBO0VBQ0U7O0lBRUUsVUFBQTtFUG9rQkY7QUFDRjtBQTFuQkE7RUFDRSxhQUFBO0FBNG5CRjs7QUF6bkJBOztFQUVFLE9BQUE7QUE0bkJGOztBQXpuQkE7RUFDRSxnQkFBQTtBQTRuQkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLypcXHJcXG4gIEpvc2gncyBDdXN0b20gQ1NTIFJlc2V0XFxyXFxuICBodHRwczovL3d3dy5qb3Nod2NvbWVhdS5jb20vY3NzL2N1c3RvbS1jc3MtcmVzZXQvXFxyXFxuKi9cXHJcXG4qLFxcclxcbio6OmJlZm9yZSxcXHJcXG4qOjphZnRlciB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxyXFxufVxcclxcbmltZyxcXHJcXG5waWN0dXJlLFxcclxcbnZpZGVvLFxcclxcbmNhbnZhcyxcXHJcXG5zdmcge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcbmlucHV0LFxcclxcbmJ1dHRvbixcXHJcXG50ZXh0YXJlYSxcXHJcXG5zZWxlY3Qge1xcclxcbiAgZm9udDogaW5oZXJpdDtcXHJcXG59XFxyXFxucCxcXHJcXG5oMSxcXHJcXG5oMixcXHJcXG5oMyxcXHJcXG5oNCxcXHJcXG5oNSxcXHJcXG5oNiB7XFxyXFxuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xcclxcbn1cXHJcXG4jcm9vdCxcXHJcXG4jX19uZXh0IHtcXHJcXG4gIGlzb2xhdGlvbjogaXNvbGF0ZTtcXHJcXG59XFxyXFxuXCIsXCJAaW1wb3J0ICdyZXNldCc7XFxyXFxuQGltcG9ydCAndmFyaWFibGVzJztcXHJcXG5AaW1wb3J0ICdtb2RhbCc7XFxyXFxuQGltcG9ydCAnYXNpZGUnO1xcclxcbkBpbXBvcnQgJ21haW4nO1xcclxcbkBpbXBvcnQgJ2J1dHRvbnMnO1xcclxcbkBpbXBvcnQgJ3V0aWxpdGllcyc7XFxyXFxuQGltcG9ydCAnYnJlYWtwb2ludHMnO1xcclxcblxcclxcbmJvZHkge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuaGVhZGVyLFxcclxcbm5hdiB7XFxyXFxuICBmbGV4OiAwO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgbWFyZ2luLXRvcDogYXV0bztcXHJcXG59XFxyXFxuXCIsXCIubW9kYWwge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXHJcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig1cHgpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICB6LWluZGV4OiA5OTk5O1xcclxcblxcclxcbiAgLm1vZGFsLWNvbnRlbnQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICBib3JkZXI6IDJweCBzb2xpZCAkY2xyLXNlY29uZGFyeTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCAxM3B4IDVweCAkc2hhZG93O1xcclxcbiAgICBjb2xvcjogJGNsci10ZXh0LWRhcms7XFxyXFxuICAgIHBhZGRpbmc6IDNyZW0gMnJlbSAycmVtO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiA1MDBweDtcXHJcXG5cXHJcXG4gICAgLmJ0bi1jbG9zZS5tb2RhbC1jbG9zZSB7XFxyXFxuICAgICAgY29sb3I6ICRjbHItc2Vjb25kYXJ5O1xcclxcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICB0b3A6IDFyZW07XFxyXFxuICAgICAgcmlnaHQ6IDJyZW07XFxyXFxuICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG5cXHJcXG4gICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY2xyLWhvdmVyLWRhcms7XFxyXFxuICAgICAgICBzY2FsZTogMS4yO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIHtcXHJcXG4gICAgICBmb250LWZhbWlseTogJG5vcm1hbC1mb250O1xcclxcblxcclxcbiAgICAgIGZpZWxkc2V0IHtcXHJcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgZmllbGRzZXQuaW5wdXQtcmFkaW8ge1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG5cXHJcXG4gICAgICAgICY6OmFmdGVyIHtcXHJcXG4gICAgICAgICAgY29udGVudDogJ1BsZWFzZSBzZWxlY3QgdHlwZSEnO1xcclxcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgIHRvcDogLTIwcHg7XFxyXFxuICAgICAgICAgIHJpZ2h0OiBjYWxjKCgxMDAlIC0gMTM4cHgpIC8gMik7XFxyXFxuICAgICAgICAgIGNvbG9yOiAkY2xyLXdhcm5pbmc7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAmLmludmFsaWQ6OmFmdGVyIHtcXHJcXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBkaXYge1xcclxcbiAgICAgICAgICB3aWR0aDogNTAlO1xcclxcblxcclxcbiAgICAgICAgICBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNsci1wcmltYXJ5O1xcclxcbiAgICAgICAgICAgIGJvcmRlcjogc29saWQgMnB4ICRjbHItc2Vjb25kYXJ5O1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBjb2xvcjogJGNsci10ZXh0LWxpZ2h0O1xcclxcbiAgICAgICAgICAgIGZvbnQ6IHtcXHJcXG4gICAgICAgICAgICAgIGZhbWlseTogJGhlYWRpbmctZm9udDtcXHJcXG4gICAgICAgICAgICAgIHNpemU6IDEuM3JlbTtcXHJcXG4gICAgICAgICAgICAgIHdlaWdodDogNzAwO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xcclxcbiAgICAgICAgICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXHJcXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG5cXHJcXG4gICAgICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0MmFhZmY7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAgIGxhYmVsW2Zvcj0ncHJvamVjdCddIHtcXHJcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4IDAgMCAxMHB4O1xcclxcbiAgICAgICAgICAgIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcclxcbiAgICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAgIGxhYmVsW2Zvcj0ndG9kbyddIHtcXHJcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwIDEwcHggMTBweCAwO1xcclxcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7XFxyXFxuICAgICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICAgaW5wdXQge1xcclxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IDA7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDA7XFxyXFxuXFxyXFxuICAgICAgICAgICAgJjpjaGVja2VkIH4gbGFiZWwge1xcclxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzM1YTRmZjtcXHJcXG4gICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNsci1ob3Zlci1kYXJrO1xcclxcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgICAgICAgICAgIHNjYWxlOiAxLjA1O1xcclxcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICAgJiBpbnB1dDppbnZhbGlkICsgbGFiZWwge1xcclxcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNsci13YXJuaW5nO1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcblxcclxcbiAgICAgIGZpZWxkc2V0LmlucHV0LWNvbnRlbnQge1xcclxcbiAgICAgICAgZGl2IHtcXHJcXG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZGl2IGlucHV0LFxcclxcbiAgICAgICAgYnV0dG9uIHtcXHJcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgJGNsci1zZWNvbmRhcnk7XFxyXFxuICAgICAgICAgIHBhZGRpbmc6IDFyZW0gMXJlbSAwLjNyZW07XFxyXFxuICAgICAgICAgIG91dGxpbmU6IG5vbmU7XFxyXFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZGl2IGxhYmVsIHtcXHJcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICBjdXJzb3I6IHRleHQ7XFxyXFxuICAgICAgICAgIHRvcDogMTNweDtcXHJcXG4gICAgICAgICAgbGVmdDogMTBweDtcXHJcXG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGRpdiBpbnB1dDpmb2N1cyB7XFxyXFxuICAgICAgICAgIGJvcmRlci1jb2xvcjogJGNsci1wcmltYXJ5O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZGl2IGlucHV0OmZvY3VzICsgbGFiZWwsXFxyXFxuICAgICAgICAuZmxvYXQtbGFiZWwge1xcclxcbiAgICAgICAgICB0b3A6IDJweDtcXHJcXG4gICAgICAgICAgbGVmdDogMThweDtcXHJcXG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICAgICAgICAgIG9wYWNpdHk6IDYwJTtcXHJcXG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICYgPiAqOm5vdCg6Zmlyc3QtY2hpbGQpIHtcXHJcXG4gICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGRpdiBpbnB1dDppbnZhbGlkLFxcclxcbiAgICAgICAgZGl2IGlucHV0OmZvY3VzOmludmFsaWQge1xcclxcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRjbHItd2FybmluZztcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGRpdiBpbnB1dDppbnZhbGlkICsgbGFiZWwge1xcclxcbiAgICAgICAgICBjb2xvcjogJGNsci13YXJuaW5nO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZGl2IGlucHV0OmludmFsaWQgKyBsYWJlbDo6YWZ0ZXIge1xcclxcbiAgICAgICAgICBjb250ZW50OiAnIHJlcXVpcmVkISc7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBkaXYgaW5wdXQ6Zm9jdXMge1xcclxcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRjbHItcHJpbWFyeTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGJ1dHRvbiB7XFxyXFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjbHItcHJpbWFyeTtcXHJcXG4gICAgICAgICAgY29sb3I6ICRjbHItdGV4dC1saWdodDtcXHJcXG4gICAgICAgICAgZm9udDoge1xcclxcbiAgICAgICAgICAgIGZhbWlseTogJGhlYWRpbmctZm9udDtcXHJcXG4gICAgICAgICAgICBzaXplOiAxLjNyZW07XFxyXFxuICAgICAgICAgICAgd2VpZ2h0OiA3MDA7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXHJcXG4gICAgICAgICAgcGFkZGluZzogMC43cmVtO1xcclxcblxcclxcbiAgICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDY4ZmZmZDE7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblwiLFwiLy8gQ1VTVE9NIENPTE9SU1xcclxcbiRjbHItdGV4dC1saWdodDogI2VlZWVlZTtcXHJcXG4kY2xyLXRleHQtZGFyazogIzAwMDAwMDtcXHJcXG4kY2xyLXByaW1hcnk6ICMwNjhmZmY7XFxyXFxuJGNsci1zZWNvbmRhcnk6ICNiYmJiYmI7XFxyXFxuJGNsci13YXJuaW5nOiAjZDMwMDAwO1xcclxcbiRjbHItaG92ZXItZGFyazogIzhlOGU4ZTtcXHJcXG4kc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuXFxyXFxuLy8gQ1VTVE9NIEZPTlRTXFxyXFxuJGhlYWRpbmctZm9udDogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxyXFxuJG5vcm1hbC1mb250OiAnQVIgT25lIFNhbnMnLCBzYW5zLXNlcmlmO1xcclxcblwiLFwiYXNpZGUge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY2xyLXByaW1hcnk7XFxyXFxuICBib3gtc2hhZG93OiAkc2hhZG93IDhweCA4cHggMTJweCA2cHg7XFxyXFxuICBjb2xvcjogJGNsci10ZXh0LWxpZ2h0O1xcclxcbiAgcGFkZGluZzogMnJlbTtcXHJcXG4gIG1pbi13aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxuICB6LWluZGV4OiA5OTk7XFxyXFxuXFxyXFxuICBmb250OiB7XFxyXFxuICAgIGZhbWlseTogJGhlYWRpbmctZm9udDtcXHJcXG4gICAgd2VpZ2h0OiA2MDA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBoZWFkZXIge1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA0cmVtO1xcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgZm9udC1zaXplOiAycmVtO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuY29udGFpbmVyLXN0aWNreSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHBvc2l0aW9uOiBzdGlja3k7XFxyXFxuICAgIHRvcDogMXJlbTtcXHJcXG4gICAgYm90dG9tOiAycmVtO1xcclxcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA0cmVtKTtcXHJcXG5cXHJcXG4gICAgLmJ0bi1tZW51IHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgICBwYWRkaW5nOiAwO1xcclxcbiAgICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMXMgZWFzZTtcXHJcXG4gICAgICB3aWR0aDogNTBweDtcXHJcXG5cXHJcXG4gICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgc3BhbiB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjbHItdGV4dC1saWdodDtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDZweDtcXHJcXG4gICAgICAgIG1hcmdpbjogMTBweCAwO1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuYnRuLW1lbnUuYWN0aXZlIHtcXHJcXG4gICAgICBzcGFuOm50aC1jaGlsZCgxKSB7XFxyXFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxyXFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICBib3R0b206IDI1JTtcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgc3BhbjpudGgtY2hpbGQoMikge1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IDBtcztcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgc3BhbjpudGgtY2hpbGQoMykge1xcclxcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIHRvcDogMjUlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICB1bCB7XFxyXFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgICBwYWRkaW5nOiAwO1xcclxcblxcclxcbiAgICAgICYgbGkgYnV0dG9uOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcclxcbiAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAubmF2LXNob3ctYWxsIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG5cXHJcXG4gICAgICAgIC5idG4tc2hvdy1hbGwge1xcclxcbiAgICAgICAgICBjb2xvcjogJGNsci10ZXh0LWxpZ2h0O1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAubmF2LXRvZGF5LFxcclxcbiAgICAgIC5uYXYtd2VlayB7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcclxcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuXFxyXFxuICAgICAgICAmICoge1xcclxcbiAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICYgPiBidXR0b24ge1xcclxcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICYgbGkgPiBidXR0b24ge1xcclxcbiAgICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XFxyXFxuICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvb3RlciB7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICAgIGZvbnQ6IHtcXHJcXG4gICAgICAgIGZhbWlseTogJG5vcm1hbC1mb250O1xcclxcbiAgICAgICAgd2VpZ2h0OiA0MDA7XFxyXFxuICAgICAgfVxcclxcblxcclxcbiAgICAgIHAge1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICAgIH1cXHJcXG5cXHJcXG4gICAgICBzdmcge1xcclxcbiAgICAgICAgY29sb3I6ICRjbHItdGV4dC1saWdodDtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICBzY2FsZTogMS4xO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cIixcIm1haW4ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gIHBhZGRpbmc6IDJyZW07XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG5cXHJcXG4gIG1haW4gPiAubWFzb25yeS1pdGVtIHtcXHJcXG4gICAgZmxvYXQ6IGxlZnQ7XFxyXFxuICAgIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucHJvamVjdCA+IC5tYXNvbnJ5LWl0ZW0udG9kbyB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmJ0bi1vcGVuLW1vZGFsIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNsci1wcmltYXJ5O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYm94LXNoYWRvdzogJHNoYWRvdyAwIDAgMTBweCA0cHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICByaWdodDogMXJlbTtcXHJcXG4gICAgYm90dG9tOiAxcmVtO1xcclxcbiAgICBoZWlnaHQ6IDYwcHg7XFxyXFxuICAgIHdpZHRoOiA2MHB4O1xcclxcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcclxcblxcclxcbiAgICAmOjpiZWZvcmUsXFxyXFxuICAgICY6OmFmdGVyIHtcXHJcXG4gICAgICBjb250ZW50OiAnJztcXHJcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNsci10ZXh0LWxpZ2h0O1xcclxcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgICAgaGVpZ2h0OiA2MCU7XFxyXFxuICAgICAgd2lkdGg6IDZweDtcXHJcXG4gICAgICByaWdodDogY2FsYyg1MCUgLSAzcHgpO1xcclxcbiAgICAgIGJvdHRvbTogMjAlO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgICY6OmFmdGVyIHtcXHJcXG4gICAgICByb3RhdGU6IDkwZGVnO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIHNjYWxlOiAxLjE7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wcm9qZWN0LFxcclxcbiAgLnRvZG8ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxyXFxuICAgIGJvcmRlcjogJGNsci1zZWNvbmRhcnkgMnB4IHNvbGlkO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBib3gtc2hhZG93OiAkc2hhZG93IDRweCA0cHggOXB4IDNweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucHJvamVjdC1oZWFkaW5nIHtcXHJcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXHJcXG5cXHJcXG4gICAgICBoMiB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGhlYWRpbmctZm9udDtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnRvZG8tZHJvcGRvd24tY29udGFpbmVyIHtcXHJcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuXFxyXFxuICAgICAgLnRvZG8tYnRuLWRyb3Bkb3duIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgICAgICAgYm9yZGVyOiBub25lO1xcclxcbiAgICAgICAgc3ZnIHtcXHJcXG4gICAgICAgICAgY29sb3I6ICRjbHItc2Vjb25kYXJ5O1xcclxcblxcclxcbiAgICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjb2xvcjogJGNsci1ob3Zlci1kYXJrO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAudG9kby1kcm9wZG93bi1jb250ZW50IHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgICAgIGJvcmRlcjogJGNsci1zZWNvbmRhcnkgMnB4IHNvbGlkO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY2xyLXRleHQtZGFyaztcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIHJpZ2h0OiAzNnB4O1xcclxcbiAgICAgICAgdG9wOiAxMHB4O1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRub3JtYWwtZm9udDtcXHJcXG4gICAgICAgIHdpZHRoOiBtYXgtY29udGVudDtcXHJcXG5cXHJcXG4gICAgICAgIHVsIHtcXHJcXG4gICAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xcclxcblxcclxcbiAgICAgICAgICBidXR0b246aG92ZXIge1xcclxcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcclxcbiAgICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAgIC50b2RvLWJ0bi1lZGl0LFxcclxcbiAgICAgICAgICAuYnRuLWFkZC1wcm9qZWN0LXRvZG8ge1xcclxcbiAgICAgICAgICAgIGNvbG9yOiAkY2xyLXRleHQtZGFyaztcXHJcXG4gICAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgICAudG9kby1idG4tZGVsZXRlLFxcclxcbiAgICAgICAgICAucHJvamVjdC1kZWxldGUge1xcclxcbiAgICAgICAgICAgIGNvbG9yOiAkY2xyLXdhcm5pbmc7XFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgJjpob3ZlciAudG9kby1kcm9wZG93bi1jb250ZW50IHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucHJvamVjdC10b2RvLFxcclxcbiAgICAudG9kby1jb250ZW50LWNvbnRhaW5lciB7XFxyXFxuICAgICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDUwcHggYXV0bztcXHJcXG4gICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gNTBweDtcXHJcXG4gICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcclxcbiAgICAgICAgJ2NoZWNrYm94IHRvZG8nXFxyXFxuICAgICAgICAnY2hlY2tib3ggdG9kby1pbmZvJztcXHJcXG4gICAgICBib3JkZXI6ICRjbHItc2Vjb25kYXJ5IDFweCBzb2xpZDtcXHJcXG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICAgIGZvbnQtZmFtaWx5OiAkbm9ybWFsLWZvbnQ7XFxyXFxuXFxyXFxuICAgICAgJjpub3QoOmxhc3QtY2hpbGQpIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b2RvLWNoZWNrYm94LWNvbnRhaW5lciB7XFxyXFxuICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgICBncmlkLWFyZWE6IGNoZWNrYm94O1xcclxcblxcclxcbiAgICAgICY6aG92ZXIgLmNoZWNrbWFyayB7XFxyXFxuICAgICAgICBvdXRsaW5lOiAycHggc29saWQgJGNsci1ob3Zlci1kYXJrO1xcclxcbiAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAmIGlucHV0OmNoZWNrZWQgfiAuY2hlY2ttYXJrIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjbHItcHJpbWFyeTtcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgJiBpbnB1dDpjaGVja2VkIH4gLmNoZWNrbWFyazphZnRlciB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgaW5wdXQge1xcclxcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgICAgIGhlaWdodDogMDtcXHJcXG4gICAgICAgIHdpZHRoOiAwO1xcclxcblxcclxcbiAgICAgICAgJjpjaGVja2VkIC5jaGVja21hcms6YWZ0ZXIge1xcclxcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgLmNoZWNrbWFyayB7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgJGNsci1zZWNvbmRhcnk7XFxyXFxuICAgICAgICBoZWlnaHQ6IDM1cHg7XFxyXFxuICAgICAgICB3aWR0aDogMzVweDtcXHJcXG5cXHJcXG4gICAgICAgICY6YWZ0ZXIge1xcclxcbiAgICAgICAgICBjb250ZW50OiAnJztcXHJcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICAgICAgICBsZWZ0OiAxMnB4O1xcclxcbiAgICAgICAgICB0b3A6IDBweDtcXHJcXG4gICAgICAgICAgd2lkdGg6IDEzcHg7XFxyXFxuICAgICAgICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgICAgICAgYm9yZGVyOiBzb2xpZCAkY2xyLXRleHQtbGlnaHQ7XFxyXFxuICAgICAgICAgIGJvcmRlci13aWR0aDogMCA1cHggNXB4IDA7XFxyXFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCA1cHggMDtcXHJcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDBkZWcpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGxpbmUge1xcclxcbiAgICAgIGZyb20ge1xcclxcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gICAgICB9XFxyXFxuICAgICAgdG8ge1xcclxcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiAkY2xyLXdhcm5pbmc7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b2RvLXRleHQge1xcclxcbiAgICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggJGNsci1zZWNvbmRhcnk7XFxyXFxuICAgICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICRjbHItc2Vjb25kYXJ5O1xcclxcbiAgICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICAgICAgbWF4LWhlaWdodDogMjAwcHg7XFxyXFxuICAgICAgb3ZlcmZsb3c6IGF1dG87XFxyXFxuICAgICAgZ3JpZC1hcmVhOiB0b2RvO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b2RvLWRvbmUge1xcclxcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcclxcbiAgICAgIHRleHQtZGVjb3JhdGlvbi10aGlja25lc3M6IDNweDtcXHJcXG4gICAgICB0ZXh0LWRlY29yYXRpb24tY29sb3I6ICRjbHItd2FybmluZztcXHJcXG4gICAgICBhbmltYXRpb246IGxpbmUgMXMgbGluZWFyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b2RvLWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggJGNsci1zZWNvbmRhcnk7XFxyXFxuICAgICAgcGFkZGluZzogMCAxcmVtO1xcclxcbiAgICAgIGdyaWQtYXJlYTogdG9kby1pbmZvO1xcclxcblxcclxcbiAgICAgIC50b2RvLWRhdGUge1xcclxcbiAgICAgICAgb3BhY2l0eTogNjAlO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgfVxcclxcblxcclxcbiAgLnByb2plY3QgPiAudG9kbyB7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuXFxyXFxuICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XFxyXFxuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudG9kby1jb250ZW50LWNvbnRhaW5lciB7XFxyXFxuICAgICAgYm9yZGVyOiBub25lO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblwiLFwiYnV0dG9uIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgY29sb3I6ICRjbHItc2Vjb25kYXJ5O1xcclxcblxcclxcbiAgJjpob3ZlciB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgY29sb3I6ICRjbHItaG92ZXItZGFyaztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCIsXCIudmlzdWFsbHktaGlkZGVuIHtcXHJcXG4gIGJvcmRlcjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcXHJcXG4gIGhlaWdodDogMXB4O1xcclxcbiAgd2lkdGg6IDFweDtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICBjbGlwOiByZWN0KDFweCAxcHggMXB4IDFweCk7XFxyXFxuICBjbGlwOiByZWN0KDFweCwgMXB4LCAxcHgsIDFweCk7XFxyXFxuICBjbGlwLXBhdGg6IGluc2V0KDUwJSk7XFxyXFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzYWJsZWQge1xcclxcbiAgb3BhY2l0eTogNTAlO1xcclxcbn1cXHJcXG5cIixcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcXHJcXG4gIGJvZHkge1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgfVxcclxcblxcclxcbiAgYXNpZGUge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICBwYWRkaW5nLXRvcDogMDtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICBoZWlnaHQ6IDkwcHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlO1xcclxcblxcclxcbiAgICAuY29udGFpbmVyLXN0aWNreSB7XFxyXFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcblxcclxcbiAgICAgIC5idG4tbWVudSxcXHJcXG4gICAgICAuYnRuLW1lbnUuYWN0aXZlIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGluaXRpYWw7XFxyXFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICB0b3A6IDA7XFxyXFxuICAgICAgICByaWdodDogMDtcXHJcXG4gICAgICB9XFxyXFxuXFxyXFxuICAgICAgZm9vdGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuXFxyXFxuICBhc2lkZS5hY3RpdmUge1xcclxcbiAgICBoZWlnaHQ6IDUzMHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgbWFpbiB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDkwcHg7XFxyXFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2U7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBtYWluLmFjdGl2ZSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDQxMHB4O1xcclxcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7XFxyXFxuICAubWFzb25yeS1pdGVtLnRvZG8sXFxyXFxuICAubWFzb25yeS1pdGVtLnByb2plY3Qge1xcclxcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMnJlbSk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSB7XFxyXFxuICAubWFzb25yeS1pdGVtLnRvZG8sXFxyXFxuICAubWFzb25yeS1pdGVtLnByb2plY3Qge1xcclxcbiAgICB3aWR0aDogNDUlO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDE0NDBweCkge1xcclxcbiAgLm1hc29ucnktaXRlbS50b2RvLFxcclxcbiAgLm1hc29ucnktaXRlbS5wcm9qZWN0IHtcXHJcXG4gICAgd2lkdGg6IDMwJTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMZWFkaW5nWmVyb3MobnVtYmVyLCB0YXJnZXRMZW5ndGgpIHtcbiAgdmFyIHNpZ24gPSBudW1iZXIgPCAwID8gJy0nIDogJyc7XG4gIHZhciBvdXRwdXQgPSBNYXRoLmFicyhudW1iZXIpLnRvU3RyaW5nKCk7XG4gIHdoaWxlIChvdXRwdXQubGVuZ3RoIDwgdGFyZ2V0TGVuZ3RoKSB7XG4gICAgb3V0cHV0ID0gJzAnICsgb3V0cHV0O1xuICB9XG4gIHJldHVybiBzaWduICsgb3V0cHV0O1xufSIsImltcG9ydCBkZWZhdWx0TG9jYWxlIGZyb20gXCIuLi8uLi9sb2NhbGUvZW4tVVMvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRMb2NhbGU7IiwidmFyIGRlZmF1bHRPcHRpb25zID0ge307XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn0iLCJpbXBvcnQgZ2V0VVRDRGF5T2ZZZWFyIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ0RheU9mWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFVUQ0lTT1dlZWsgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDSVNPV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFVUQ0lTT1dlZWtZZWFyIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VVRDV2VlayBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VVRDV2Vla1llYXIgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCBhZGRMZWFkaW5nWmVyb3MgZnJvbSBcIi4uLy4uL2FkZExlYWRpbmdaZXJvcy9pbmRleC5qc1wiO1xuaW1wb3J0IGxpZ2h0Rm9ybWF0dGVycyBmcm9tIFwiLi4vbGlnaHRGb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG52YXIgZGF5UGVyaW9kRW51bSA9IHtcbiAgYW06ICdhbScsXG4gIHBtOiAncG0nLFxuICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgbm9vbjogJ25vb24nLFxuICBtb3JuaW5nOiAnbW9ybmluZycsXG4gIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgbmlnaHQ6ICduaWdodCdcbn07XG4vKlxuICogfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgYSAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgfCAgQSogfCBNaWxsaXNlY29uZHMgaW4gZGF5ICAgICAgICAgICAgfFxuICogfCAgYiAgfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgfCAgQiAgfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgfFxuICogfCAgYyAgfCBTdGFuZC1hbG9uZSBsb2NhbCBkYXkgb2Ygd2VlayAgfCAgQyogfCBMb2NhbGl6ZWQgaG91ciB3LyBkYXkgcGVyaW9kICAgfFxuICogfCAgZCAgfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgfCAgRCAgfCBEYXkgb2YgeWVhciAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZSAgfCBMb2NhbCBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgfCAgRSAgfCBEYXkgb2Ygd2VlayAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgRiogfCBEYXkgb2Ygd2VlayBpbiBtb250aCAgICAgICAgICAgfFxuICogfCAgZyogfCBNb2RpZmllZCBKdWxpYW4gZGF5ICAgICAgICAgICAgfCAgRyAgfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaCAgfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgfCAgSCAgfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaSEgfCBJU08gZGF5IG9mIHdlZWsgICAgICAgICAgICAgICAgfCAgSSEgfCBJU08gd2VlayBvZiB5ZWFyICAgICAgICAgICAgICAgfFxuICogfCAgaiogfCBMb2NhbGl6ZWQgaG91ciB3LyBkYXkgcGVyaW9kICAgfCAgSiogfCBMb2NhbGl6ZWQgaG91ciB3L28gZGF5IHBlcmlvZCAgfFxuICogfCAgayAgfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgfCAgSyAgfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbCogfCAoZGVwcmVjYXRlZCkgICAgICAgICAgICAgICAgICAgfCAgTCAgfCBTdGFuZC1hbG9uZSBtb250aCAgICAgICAgICAgICAgfFxuICogfCAgbSAgfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTSAgfCBNb250aCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbyEgfCBPcmRpbmFsIG51bWJlciBtb2RpZmllciAgICAgICAgfCAgTyAgfCBUaW1lem9uZSAoR01UKSAgICAgICAgICAgICAgICAgfFxuICogfCAgcCEgfCBMb25nIGxvY2FsaXplZCB0aW1lICAgICAgICAgICAgfCAgUCEgfCBMb25nIGxvY2FsaXplZCBkYXRlICAgICAgICAgICAgfFxuICogfCAgcSAgfCBTdGFuZC1hbG9uZSBxdWFydGVyICAgICAgICAgICAgfCAgUSAgfCBRdWFydGVyICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgciogfCBSZWxhdGVkIEdyZWdvcmlhbiB5ZWFyICAgICAgICAgfCAgUiEgfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgfFxuICogfCAgcyAgfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgfCAgUyAgfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgfFxuICogfCAgdCEgfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgfCAgVCEgfCBNaWxsaXNlY29uZHMgdGltZXN0YW1wICAgICAgICAgfFxuICogfCAgdSAgfCBFeHRlbmRlZCB5ZWFyICAgICAgICAgICAgICAgICAgfCAgVSogfCBDeWNsaWMgeWVhciAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgdiogfCBUaW1lem9uZSAoZ2VuZXJpYyBub24tbG9jYXQuKSAgfCAgViogfCBUaW1lem9uZSAobG9jYXRpb24pICAgICAgICAgICAgfFxuICogfCAgdyAgfCBMb2NhbCB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgfCAgVyogfCBXZWVrIG9mIG1vbnRoICAgICAgICAgICAgICAgICAgfFxuICogfCAgeCAgfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgfCAgWCAgfCBUaW1lem9uZSAoSVNPLTg2MDEpICAgICAgICAgICAgfFxuICogfCAgeSAgfCBZZWFyIChhYnMpICAgICAgICAgICAgICAgICAgICAgfCAgWSAgfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgfFxuICogfCAgeiAgfCBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0LikgfCAgWiogfCBUaW1lem9uZSAoYWxpYXNlcykgICAgICAgICAgICAgfFxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICogYXJlIG5vdCBpbXBsZW1lbnRlZCBidXQgcmVzZXJ2ZWQgYnkgVW5pY29kZSBzdGFuZGFyZC5cbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAhIGFyZSBub24tc3RhbmRhcmQsIGJ1dCBpbXBsZW1lbnRlZCBieSBkYXRlLWZuczpcbiAqIC0gYG9gIG1vZGlmaWVzIHRoZSBwcmV2aW91cyB0b2tlbiB0byB0dXJuIGl0IGludG8gYW4gb3JkaW5hbCAoc2VlIGBmb3JtYXRgIGRvY3MpXG4gKiAtIGBpYCBpcyBJU08gZGF5IG9mIHdlZWsuIEZvciBgaWAgYW5kIGBpaWAgaXMgcmV0dXJucyBudW1lcmljIElTTyB3ZWVrIGRheXMsXG4gKiAgIGkuZS4gNyBmb3IgU3VuZGF5LCAxIGZvciBNb25kYXksIGV0Yy5cbiAqIC0gYElgIGlzIElTTyB3ZWVrIG9mIHllYXIsIGFzIG9wcG9zZWQgdG8gYHdgIHdoaWNoIGlzIGxvY2FsIHdlZWsgb2YgeWVhci5cbiAqIC0gYFJgIGlzIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyLCBhcyBvcHBvc2VkIHRvIGBZYCB3aGljaCBpcyBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyLlxuICogICBgUmAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGBJYCBhbmQgYGlgXG4gKiAgIGZvciB1bml2ZXJzYWwgSVNPIHdlZWstbnVtYmVyaW5nIGRhdGUsIHdoZXJlYXNcbiAqICAgYFlgIGlzIHN1cHBvc2VkIHRvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgd2AgYW5kIGBlYFxuICogICBmb3Igd2Vlay1udW1iZXJpbmcgZGF0ZSBzcGVjaWZpYyB0byB0aGUgbG9jYWxlLlxuICogLSBgUGAgaXMgbG9uZyBsb2NhbGl6ZWQgZGF0ZSBmb3JtYXRcbiAqIC0gYHBgIGlzIGxvbmcgbG9jYWxpemVkIHRpbWUgZm9ybWF0XG4gKi9cblxudmFyIGZvcm1hdHRlcnMgPSB7XG4gIC8vIEVyYVxuICBHOiBmdW5jdGlvbiBHKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBlcmEgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgPiAwID8gMSA6IDA7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gQUQsIEJDXG4gICAgICBjYXNlICdHJzpcbiAgICAgIGNhc2UgJ0dHJzpcbiAgICAgIGNhc2UgJ0dHRyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCdcbiAgICAgICAgfSk7XG4gICAgICAvLyBBLCBCXG4gICAgICBjYXNlICdHR0dHRyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnXG4gICAgICAgIH0pO1xuICAgICAgLy8gQW5ubyBEb21pbmksIEJlZm9yZSBDaHJpc3RcbiAgICAgIGNhc2UgJ0dHR0cnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiB5KGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIC8vIE9yZGluYWwgbnVtYmVyXG4gICAgaWYgKHRva2VuID09PSAneW8nKSB7XG4gICAgICB2YXIgc2lnbmVkWWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgICB2YXIgeWVhciA9IHNpZ25lZFllYXIgPiAwID8gc2lnbmVkWWVhciA6IDEgLSBzaWduZWRZZWFyO1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoeWVhciwge1xuICAgICAgICB1bml0OiAneWVhcidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLnkoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gIFk6IGZ1bmN0aW9uIFkoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIHNpZ25lZFdlZWtZZWFyID0gZ2V0VVRDV2Vla1llYXIoZGF0ZSwgb3B0aW9ucyk7XG4gICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICB2YXIgd2Vla1llYXIgPSBzaWduZWRXZWVrWWVhciA+IDAgPyBzaWduZWRXZWVrWWVhciA6IDEgLSBzaWduZWRXZWVrWWVhcjtcblxuICAgIC8vIFR3byBkaWdpdCB5ZWFyXG4gICAgaWYgKHRva2VuID09PSAnWVknKSB7XG4gICAgICB2YXIgdHdvRGlnaXRZZWFyID0gd2Vla1llYXIgJSAxMDA7XG4gICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHR3b0RpZ2l0WWVhciwgMik7XG4gICAgfVxuXG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09ICdZbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHdlZWtZZWFyLCB7XG4gICAgICAgIHVuaXQ6ICd5ZWFyJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3Mod2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gIFI6IGZ1bmN0aW9uIFIoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgaXNvV2Vla1llYXIgPSBnZXRVVENJU09XZWVrWWVhcihkYXRlKTtcblxuICAgIC8vIFBhZGRpbmdcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWtZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBFeHRlbmRlZCB5ZWFyLiBUaGlzIGlzIGEgc2luZ2xlIG51bWJlciBkZXNpZ25hdGluZyB0aGUgeWVhciBvZiB0aGlzIGNhbGVuZGFyIHN5c3RlbS5cbiAgLy8gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIGxvY2FsaXplcnMgYXJlIEIuQy4geWVhcnM6XG4gIC8vIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gIC8vIHwtLS0tLS18LS0tLS18LS0tLS18XG4gIC8vIHwgQUMgMSB8ICAgMSB8ICAgMSB8XG4gIC8vIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gIC8vIHwgQkMgMiB8ICAgMiB8ICAtMSB8XG4gIC8vIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAgLy8gd2hpbGUgYHV1YCBwYWRzIHNpbmdsZSBkaWdpdCB5ZWFycyB0byAyIGNoYXJhY3RlcnMgYW5kIHJldHVybnMgb3RoZXIgeWVhcnMgdW5jaGFuZ2VkLlxuICB1OiBmdW5jdGlvbiB1KGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh5ZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBRdWFydGVyXG4gIFE6IGZ1bmN0aW9uIFEoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIHF1YXJ0ZXIgPSBNYXRoLmNlaWwoKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpIC8gMyk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gMSwgMiwgMywgNFxuICAgICAgY2FzZSAnUSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSAnUVEnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlICdRbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB1bml0OiAncXVhcnRlcidcbiAgICAgICAgfSk7XG4gICAgICAvLyBRMSwgUTIsIFEzLCBRNFxuICAgICAgY2FzZSAnUVFRJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSAnUVFRUVEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlICdRUVFRJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFN0YW5kLWFsb25lIHF1YXJ0ZXJcbiAgcTogZnVuY3Rpb24gcShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRVVENNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlICdxJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhxdWFydGVyKTtcbiAgICAgIC8vIDAxLCAwMiwgMDMsIDA0XG4gICAgICBjYXNlICdxcSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgJ3FvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwge1xuICAgICAgICAgIHVuaXQ6ICdxdWFydGVyJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlICdxcXEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlICdxcXFxcSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi5cbiAgICAgIGNhc2UgJ3FxcXEnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gTW9udGhcbiAgTTogZnVuY3Rpb24gTShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnTSc6XG4gICAgICBjYXNlICdNTSc6XG4gICAgICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuTShkYXRlLCB0b2tlbik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlICdNbyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoICsgMSwge1xuICAgICAgICAgIHVuaXQ6ICdtb250aCdcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW4sIEZlYiwgLi4uLCBEZWNcbiAgICAgIGNhc2UgJ01NTSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSAnTU1NTU0nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgICAgIGNhc2UgJ01NTU0nOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBTdGFuZC1hbG9uZSBtb250aFxuICBMOiBmdW5jdGlvbiBMKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAuLi4sIDEyXG4gICAgICBjYXNlICdMJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhtb250aCArIDEpO1xuICAgICAgLy8gMDEsIDAyLCAuLi4sIDEyXG4gICAgICBjYXNlICdMTCc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobW9udGggKyAxLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDEydGhcbiAgICAgIGNhc2UgJ0xvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7XG4gICAgICAgICAgdW5pdDogJ21vbnRoJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSAnTExMJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSiwgRiwgLi4uLCBEXG4gICAgICBjYXNlICdMTExMTCc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlclxuICAgICAgY2FzZSAnTExMTCc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIExvY2FsIHdlZWsgb2YgeWVhclxuICB3OiBmdW5jdGlvbiB3KGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciB3ZWVrID0gZ2V0VVRDV2VlayhkYXRlLCBvcHRpb25zKTtcbiAgICBpZiAodG9rZW4gPT09ICd3bycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKHdlZWssIHtcbiAgICAgICAgdW5pdDogJ3dlZWsnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBJU08gd2VlayBvZiB5ZWFyXG4gIEk6IGZ1bmN0aW9uIEkoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGlzb1dlZWsgPSBnZXRVVENJU09XZWVrKGRhdGUpO1xuICAgIGlmICh0b2tlbiA9PT0gJ0lvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvV2Vlaywge1xuICAgICAgICB1bml0OiAnd2VlaydcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIERheSBvZiB0aGUgbW9udGhcbiAgZDogZnVuY3Rpb24gZChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdkbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDRGF0ZSgpLCB7XG4gICAgICAgIHVuaXQ6ICdkYXRlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuZChkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIERheSBvZiB5ZWFyXG4gIEQ6IGZ1bmN0aW9uIEQoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGRheU9mWWVhciA9IGdldFVUQ0RheU9mWWVhcihkYXRlKTtcbiAgICBpZiAodG9rZW4gPT09ICdEbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRheU9mWWVhciwge1xuICAgICAgICB1bml0OiAnZGF5T2ZZZWFyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF5T2ZZZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBEYXkgb2Ygd2Vla1xuICBFOiBmdW5jdGlvbiBFKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBkYXlPZldlZWsgPSBkYXRlLmdldFVUQ0RheSgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSAnRSc6XG4gICAgICBjYXNlICdFRSc6XG4gICAgICBjYXNlICdFRUUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgJ0VFRUVFJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgJ0VFRUVFRSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdzaG9ydCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVlc2RheVxuICAgICAgY2FzZSAnRUVFRSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gTG9jYWwgZGF5IG9mIHdlZWtcbiAgZTogZnVuY3Rpb24gZShkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgICB2YXIgbG9jYWxEYXlPZldlZWsgPSAoZGF5T2ZXZWVrIC0gb3B0aW9ucy53ZWVrU3RhcnRzT24gKyA4KSAlIDcgfHwgNztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBOdW1lcmljYWwgdmFsdWUgKE50aCBkYXkgb2Ygd2VlayB3aXRoIGN1cnJlbnQgbG9jYWxlIG9yIHdlZWtTdGFydHNPbilcbiAgICAgIGNhc2UgJ2UnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGxvY2FsRGF5T2ZXZWVrKTtcbiAgICAgIC8vIFBhZGRlZCBudW1lcmljYWwgdmFsdWVcbiAgICAgIGNhc2UgJ2VlJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgJ2VvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobG9jYWxEYXlPZldlZWssIHtcbiAgICAgICAgICB1bml0OiAnZGF5J1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2VlZSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSAnZWVlZWUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSAnZWVlZWVlJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3Nob3J0JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlICdlZWVlJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBTdGFuZC1hbG9uZSBsb2NhbCBkYXkgb2Ygd2Vla1xuICBjOiBmdW5jdGlvbiBjKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBkYXlPZldlZWsgPSBkYXRlLmdldFVUQ0RheSgpO1xuICAgIHZhciBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoc2FtZSBhcyBpbiBgZWApXG4gICAgICBjYXNlICdjJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlICdjYyc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgJ2NvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobG9jYWxEYXlPZldlZWssIHtcbiAgICAgICAgICB1bml0OiAnZGF5J1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2NjYyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSAnY2NjY2MnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSAnY2NjY2NjJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3Nob3J0JyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlICdjY2NjJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBJU08gZGF5IG9mIHdlZWtcbiAgaTogZnVuY3Rpb24gaShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZGF5T2ZXZWVrID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgICB2YXIgaXNvRGF5T2ZXZWVrID0gZGF5T2ZXZWVrID09PSAwID8gNyA6IGRheU9mV2VlaztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAyXG4gICAgICBjYXNlICdpJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhpc29EYXlPZldlZWspO1xuICAgICAgLy8gMDJcbiAgICAgIGNhc2UgJ2lpJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29EYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAybmRcbiAgICAgIGNhc2UgJ2lvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvRGF5T2ZXZWVrLCB7XG4gICAgICAgICAgdW5pdDogJ2RheSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgJ2lpaSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSAnaWlpaWknOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSAnaWlpaWlpJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3Nob3J0JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlICdpaWlpJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBBTSBvciBQTVxuICBhOiBmdW5jdGlvbiBhKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICB2YXIgZGF5UGVyaW9kRW51bVZhbHVlID0gaG91cnMgLyAxMiA+PSAxID8gJ3BtJyA6ICdhbSc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnYSc6XG4gICAgICBjYXNlICdhYSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnYWFhJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgJ2FhYWFhJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnYWFhYSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gQU0sIFBNLCBtaWRuaWdodCwgbm9vblxuICBiOiBmdW5jdGlvbiBiKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICB2YXIgZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubm9vbjtcbiAgICB9IGVsc2UgaWYgKGhvdXJzID09PSAwKSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1pZG5pZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyAncG0nIDogJ2FtJztcbiAgICB9XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnYic6XG4gICAgICBjYXNlICdiYic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnYmJiJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgJ2JiYmJiJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnYmJiYic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gaW4gdGhlIG1vcm5pbmcsIGluIHRoZSBhZnRlcm5vb24sIGluIHRoZSBldmVuaW5nLCBhdCBuaWdodFxuICBCOiBmdW5jdGlvbiBCKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICB2YXIgZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgIGlmIChob3VycyA+PSAxNykge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ldmVuaW5nO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPj0gMTIpIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0uYWZ0ZXJub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPj0gNCkge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5tb3JuaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm5pZ2h0O1xuICAgIH1cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdCJzpcbiAgICAgIGNhc2UgJ0JCJzpcbiAgICAgIGNhc2UgJ0JCQic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnQkJCQkInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdCQkJCJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBIb3VyIFsxLTEyXVxuICBoOiBmdW5jdGlvbiBoKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ2hvJykge1xuICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpICUgMTI7XG4gICAgICBpZiAoaG91cnMgPT09IDApIGhvdXJzID0gMTI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3Vycywge1xuICAgICAgICB1bml0OiAnaG91cidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLmgoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBIb3VyIFswLTIzXVxuICBIOiBmdW5jdGlvbiBIKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ0hvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENIb3VycygpLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuSChkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIEhvdXIgWzAtMTFdXG4gIEs6IGZ1bmN0aW9uIEsoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpICUgMTI7XG4gICAgaWYgKHRva2VuID09PSAnS28nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3Vycywge1xuICAgICAgICB1bml0OiAnaG91cidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBIb3VyIFsxLTI0XVxuICBrOiBmdW5jdGlvbiBrKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICBpZiAoaG91cnMgPT09IDApIGhvdXJzID0gMjQ7XG4gICAgaWYgKHRva2VuID09PSAna28nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3Vycywge1xuICAgICAgICB1bml0OiAnaG91cidcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNaW51dGVcbiAgbTogZnVuY3Rpb24gbShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdtbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDTWludXRlcygpLCB7XG4gICAgICAgIHVuaXQ6ICdtaW51dGUnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5tKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gU2Vjb25kXG4gIHM6IGZ1bmN0aW9uIHMoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnc28nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ1NlY29uZHMoKSwge1xuICAgICAgICB1bml0OiAnc2Vjb25kJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMucyhkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIEZyYWN0aW9uIG9mIHNlY29uZFxuICBTOiBmdW5jdGlvbiBTKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5TKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gVGltZXpvbmUgKElTTy04NjAxLiBJZiBvZmZzZXQgaXMgMCwgb3V0cHV0IGlzIGFsd2F5cyBgJ1onYClcbiAgWDogZnVuY3Rpb24gWChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIGlmICh0aW1lem9uZU9mZnNldCA9PT0gMCkge1xuICAgICAgcmV0dXJuICdaJztcbiAgICB9XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgJ1gnOlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgWFhgXG4gICAgICBjYXNlICdYWFhYJzpcbiAgICAgIGNhc2UgJ1hYJzpcbiAgICAgICAgLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYWGBcbiAgICAgIGNhc2UgJ1hYWFhYJzpcbiAgICAgIGNhc2UgJ1hYWCc6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gVGltZXpvbmUgKElTTy04NjAxLiBJZiBvZmZzZXQgaXMgMCwgb3V0cHV0IGlzIGAnKzAwOjAwJ2Agb3IgZXF1aXZhbGVudClcbiAgeDogZnVuY3Rpb24geChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEhvdXJzIGFuZCBvcHRpb25hbCBtaW51dGVzXG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4YFxuICAgICAgY2FzZSAneHh4eCc6XG4gICAgICBjYXNlICd4eCc6XG4gICAgICAgIC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eHhgXG4gICAgICBjYXNlICd4eHh4eCc6XG4gICAgICBjYXNlICd4eHgnOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICB9XG4gIH0sXG4gIC8vIFRpbWV6b25lIChHTVQpXG4gIE86IGZ1bmN0aW9uIE8oZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBTaG9ydFxuICAgICAgY2FzZSAnTyc6XG4gICAgICBjYXNlICdPTyc6XG4gICAgICBjYXNlICdPT08nOlxuICAgICAgICByZXR1cm4gJ0dNVCcgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgICAgLy8gTG9uZ1xuICAgICAgY2FzZSAnT09PTyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ0dNVCcgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICB9XG4gIH0sXG4gIC8vIFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXRpb24pXG4gIHo6IGZ1bmN0aW9uIHooZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBTaG9ydFxuICAgICAgY2FzZSAneic6XG4gICAgICBjYXNlICd6eic6XG4gICAgICBjYXNlICd6enonOlxuICAgICAgICByZXR1cm4gJ0dNVCcgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgICAgLy8gTG9uZ1xuICAgICAgY2FzZSAnenp6eic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ0dNVCcgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgJzonKTtcbiAgICB9XG4gIH0sXG4gIC8vIFNlY29uZHMgdGltZXN0YW1wXG4gIHQ6IGZ1bmN0aW9uIHQoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICB2YXIgdGltZXN0YW1wID0gTWF0aC5mbG9vcihvcmlnaW5hbERhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAgVDogZnVuY3Rpb24gVChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lc3RhbXAgPSBvcmlnaW5hbERhdGUuZ2V0VGltZSgpO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModGltZXN0YW1wLCB0b2tlbi5sZW5ndGgpO1xuICB9XG59O1xuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmVTaG9ydChvZmZzZXQsIGRpcnR5RGVsaW1pdGVyKSB7XG4gIHZhciBzaWduID0gb2Zmc2V0ID4gMCA/ICctJyA6ICcrJztcbiAgdmFyIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIHZhciBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApO1xuICB2YXIgbWludXRlcyA9IGFic09mZnNldCAlIDYwO1xuICBpZiAobWludXRlcyA9PT0gMCkge1xuICAgIHJldHVybiBzaWduICsgU3RyaW5nKGhvdXJzKTtcbiAgfVxuICB2YXIgZGVsaW1pdGVyID0gZGlydHlEZWxpbWl0ZXIgfHwgJyc7XG4gIHJldHVybiBzaWduICsgU3RyaW5nKGhvdXJzKSArIGRlbGltaXRlciArIGFkZExlYWRpbmdaZXJvcyhtaW51dGVzLCAyKTtcbn1cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyhvZmZzZXQsIGRpcnR5RGVsaW1pdGVyKSB7XG4gIGlmIChvZmZzZXQgJSA2MCA9PT0gMCkge1xuICAgIHZhciBzaWduID0gb2Zmc2V0ID4gMCA/ICctJyA6ICcrJztcbiAgICByZXR1cm4gc2lnbiArIGFkZExlYWRpbmdaZXJvcyhNYXRoLmFicyhvZmZzZXQpIC8gNjAsIDIpO1xuICB9XG4gIHJldHVybiBmb3JtYXRUaW1lem9uZShvZmZzZXQsIGRpcnR5RGVsaW1pdGVyKTtcbn1cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpIHtcbiAgdmFyIGRlbGltaXRlciA9IGRpcnR5RGVsaW1pdGVyIHx8ICcnO1xuICB2YXIgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKyc7XG4gIHZhciBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICB2YXIgaG91cnMgPSBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCksIDIpO1xuICB2YXIgbWludXRlcyA9IGFkZExlYWRpbmdaZXJvcyhhYnNPZmZzZXQgJSA2MCwgMik7XG4gIHJldHVybiBzaWduICsgaG91cnMgKyBkZWxpbWl0ZXIgKyBtaW51dGVzO1xufVxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0dGVyczsiLCJpbXBvcnQgYWRkTGVhZGluZ1plcm9zIGZyb20gXCIuLi8uLi9hZGRMZWFkaW5nWmVyb3MvaW5kZXguanNcIjtcbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICovXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiB5KGRhdGUsIHRva2VuKSB7XG4gICAgLy8gRnJvbSBodHRwOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LTMxL3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0Zvcm1hdF90b2tlbnNcbiAgICAvLyB8IFllYXIgICAgIHwgICAgIHkgfCB5eSB8ICAgeXl5IHwgIHl5eXkgfCB5eXl5eSB8XG4gICAgLy8gfC0tLS0tLS0tLS18LS0tLS0tLXwtLS0tfC0tLS0tLS18LS0tLS0tLXwtLS0tLS0tfFxuICAgIC8vIHwgQUQgMSAgICAgfCAgICAgMSB8IDAxIHwgICAwMDEgfCAgMDAwMSB8IDAwMDAxIHxcbiAgICAvLyB8IEFEIDEyICAgIHwgICAgMTIgfCAxMiB8ICAgMDEyIHwgIDAwMTIgfCAwMDAxMiB8XG4gICAgLy8gfCBBRCAxMjMgICB8ICAgMTIzIHwgMjMgfCAgIDEyMyB8ICAwMTIzIHwgMDAxMjMgfFxuICAgIC8vIHwgQUQgMTIzNCAgfCAgMTIzNCB8IDM0IHwgIDEyMzQgfCAgMTIzNCB8IDAxMjM0IHxcbiAgICAvLyB8IEFEIDEyMzQ1IHwgMTIzNDUgfCA0NSB8IDEyMzQ1IHwgMTIzNDUgfCAxMjM0NSB8XG5cbiAgICB2YXIgc2lnbmVkWWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIHZhciB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0b2tlbiA9PT0gJ3l5JyA/IHllYXIgJSAxMDAgOiB5ZWFyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNb250aFxuICBNOiBmdW5jdGlvbiBNKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHJldHVybiB0b2tlbiA9PT0gJ00nID8gU3RyaW5nKG1vbnRoICsgMSkgOiBhZGRMZWFkaW5nWmVyb3MobW9udGggKyAxLCAyKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiBkKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0RhdGUoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gQU0gb3IgUE1cbiAgYTogZnVuY3Rpb24gYShkYXRlLCB0b2tlbikge1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXRlLmdldFVUQ0hvdXJzKCkgLyAxMiA+PSAxID8gJ3BtJyA6ICdhbSc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSAnYSc6XG4gICAgICBjYXNlICdhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgJ2FhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgICBjYXNlICdhYWFhYSc6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWVbMF07XG4gICAgICBjYXNlICdhYWFhJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUgPT09ICdhbScgPyAnYS5tLicgOiAncC5tLic7XG4gICAgfVxuICB9LFxuICAvLyBIb3VyIFsxLTEyXVxuICBoOiBmdW5jdGlvbiBoKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMiB8fCAxMiwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gSChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENIb3VycygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBNaW51dGVcbiAgbTogZnVuY3Rpb24gbShkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENNaW51dGVzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiBzKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ1NlY29uZHMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFM6IGZ1bmN0aW9uIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgbnVtYmVyT2ZEaWdpdHMgPSB0b2tlbi5sZW5ndGg7XG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgdmFyIGZyYWN0aW9uYWxTZWNvbmRzID0gTWF0aC5mbG9vcihtaWxsaXNlY29uZHMgKiBNYXRoLnBvdygxMCwgbnVtYmVyT2ZEaWdpdHMgLSAzKSk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmcmFjdGlvbmFsU2Vjb25kcywgdG9rZW4ubGVuZ3RoKTtcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdHRlcnM7IiwidmFyIGRhdGVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgY2FzZSAnUFBQJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICBjYXNlICdQUFBQJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICB9XG59O1xudmFyIHRpbWVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gdGltZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZykge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlICdwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgY2FzZSAncHAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgY2FzZSAncHBwJzpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoe1xuICAgICAgICB3aWR0aDogJ2xvbmcnXG4gICAgICB9KTtcbiAgICBjYXNlICdwcHBwJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICB9XG59O1xudmFyIGRhdGVUaW1lTG9uZ0Zvcm1hdHRlciA9IGZ1bmN0aW9uIGRhdGVUaW1lTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKSB7XG4gIHZhciBtYXRjaFJlc3VsdCA9IHBhdHRlcm4ubWF0Y2goLyhQKykocCspPy8pIHx8IFtdO1xuICB2YXIgZGF0ZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsxXTtcbiAgdmFyIHRpbWVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMl07XG4gIGlmICghdGltZVBhdHRlcm4pIHtcbiAgICByZXR1cm4gZGF0ZUxvbmdGb3JtYXR0ZXIocGF0dGVybiwgZm9ybWF0TG9uZyk7XG4gIH1cbiAgdmFyIGRhdGVUaW1lRm9ybWF0O1xuICBzd2l0Y2ggKGRhdGVQYXR0ZXJuKSB7XG4gICAgY2FzZSAnUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ3Nob3J0J1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQUCc6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoe1xuICAgICAgICB3aWR0aDogJ21lZGl1bSdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFBQJzpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnbG9uZydcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUFBQUCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnZnVsbCdcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGRhdGVUaW1lRm9ybWF0LnJlcGxhY2UoJ3t7ZGF0ZX19JywgZGF0ZUxvbmdGb3JtYXR0ZXIoZGF0ZVBhdHRlcm4sIGZvcm1hdExvbmcpKS5yZXBsYWNlKCd7e3RpbWV9fScsIHRpbWVMb25nRm9ybWF0dGVyKHRpbWVQYXR0ZXJuLCBmb3JtYXRMb25nKSk7XG59O1xudmFyIGxvbmdGb3JtYXR0ZXJzID0ge1xuICBwOiB0aW1lTG9uZ0Zvcm1hdHRlcixcbiAgUDogZGF0ZVRpbWVMb25nRm9ybWF0dGVyXG59O1xuZXhwb3J0IGRlZmF1bHQgbG9uZ0Zvcm1hdHRlcnM7IiwiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENEYXlPZlllYXIoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gIGRhdGUuc2V0VVRDTW9udGgoMCwgMSk7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mWWVhclRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICB2YXIgZGlmZmVyZW5jZSA9IHRpbWVzdGFtcCAtIHN0YXJ0T2ZZZWFyVGltZXN0YW1wO1xuICByZXR1cm4gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gTUlMTElTRUNPTkRTX0lOX0RBWSkgKyAxO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ0lTT1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENJU09XZWVrWWVhcihkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIgKyAxLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIpO1xuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZlVUQ0lTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhcik7XG4gIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDE7XG4gIH1cbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ0lTT1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDSVNPV2Vla1llYXIgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENJU09XZWVrKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRpZmYgPSBzdGFydE9mVVRDSVNPV2VlayhkYXRlKS5nZXRUaW1lKCkgLSBzdGFydE9mVVRDSVNPV2Vla1llYXIoZGF0ZSkuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBNSUxMSVNFQ09ORFNfSU5fV0VFSykgKyAxO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4uL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENXZWVrWWVhcihkaXJ0eURhdGUsIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYsIF9yZWYyLCBfcmVmMywgX29wdGlvbnMkZmlyc3RXZWVrQ29uLCBfb3B0aW9ucyRsb2NhbGUsIF9vcHRpb25zJGxvY2FsZSRvcHRpbywgX2RlZmF1bHRPcHRpb25zJGxvY2FsLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyO1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkZmlyc3RXZWVrQ29uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX29wdGlvbnMkZmlyc3RXZWVrQ29uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRmaXJzdFdlZWtDb24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMSk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAxIGFuZCA3IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEoZmlyc3RXZWVrQ29udGFpbnNEYXRlID49IDEgJiYgZmlyc3RXZWVrQ29udGFpbnNEYXRlIDw9IDcpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2ZpcnN0V2Vla0NvbnRhaW5zRGF0ZSBtdXN0IGJlIGJldHdlZW4gMSBhbmQgNyBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciBmaXJzdFdlZWtPZk5leHRZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZpcnN0V2Vla09mTmV4dFllYXIuc2V0VVRDRnVsbFllYXIoeWVhciArIDEsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vla09mTmV4dFllYXIuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mTmV4dFllYXIgPSBzdGFydE9mVVRDV2VlayhmaXJzdFdlZWtPZk5leHRZZWFyLCBvcHRpb25zKTtcbiAgdmFyIGZpcnN0V2Vla09mVGhpc1llYXIgPSBuZXcgRGF0ZSgwKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWtPZlRoaXNZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZlVUQ1dlZWsoZmlyc3RXZWVrT2ZUaGlzWWVhciwgb3B0aW9ucyk7XG4gIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDE7XG4gIH1cbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDV2VlayBmcm9tIFwiLi4vc3RhcnRPZlVUQ1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBzdGFydE9mVVRDV2Vla1llYXIgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUsgPSA2MDQ4MDAwMDA7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVVENXZWVrKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRpZmYgPSBzdGFydE9mVVRDV2VlayhkYXRlLCBvcHRpb25zKS5nZXRUaW1lKCkgLSBzdGFydE9mVVRDV2Vla1llYXIoZGF0ZSwgb3B0aW9ucykuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBNSUxMSVNFQ09ORFNfSU5fV0VFSykgKyAxO1xufSIsInZhciBwcm90ZWN0ZWREYXlPZlllYXJUb2tlbnMgPSBbJ0QnLCAnREQnXTtcbnZhciBwcm90ZWN0ZWRXZWVrWWVhclRva2VucyA9IFsnWVknLCAnWVlZWSddO1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZERheU9mWWVhclRva2Vucy5pbmRleE9mKHRva2VuKSAhPT0gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuKHRva2VuKSB7XG4gIHJldHVybiBwcm90ZWN0ZWRXZWVrWWVhclRva2Vucy5pbmRleE9mKHRva2VuKSAhPT0gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gdGhyb3dQcm90ZWN0ZWRFcnJvcih0b2tlbiwgZm9ybWF0LCBpbnB1dCkge1xuICBpZiAodG9rZW4gPT09ICdZWVlZJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09ICdZWScpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09ICdEJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09ICdERCcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlVzZSBgZGRgIGluc3RlYWQgb2YgYEREYCAoaW4gYFwiLmNvbmNhdChmb3JtYXQsIFwiYCkgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdG8gdGhlIGlucHV0IGBcIikuY29uY2F0KGlucHV0LCBcImA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFwiKSk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJpbXBvcnQgZ2V0VVRDSVNPV2Vla1llYXIgZnJvbSBcIi4uL2dldFVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ0lTT1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0T2ZVVENJU09XZWVrWWVhcihkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciB5ZWFyID0gZ2V0VVRDSVNPV2Vla1llYXIoZGlydHlEYXRlKTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeSA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIGRhdGUgPSBzdGFydE9mVVRDSVNPV2Vlayhmb3VydGhPZkphbnVhcnkpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ0lTT1dlZWsoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgd2Vla1N0YXJ0c09uID0gMTtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRheSA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gZGlmZik7XG4gIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCBnZXRVVENXZWVrWWVhciBmcm9tIFwiLi4vZ2V0VVRDV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ1dlZWtZZWFyKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX3JlZjIsIF9yZWYzLCBfb3B0aW9ucyRmaXJzdFdlZWtDb24sIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkbG9jYWxlJG9wdGlvLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDI7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgZmlyc3RXZWVrQ29udGFpbnNEYXRlID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDEpO1xuICB2YXIgeWVhciA9IGdldFVUQ1dlZWtZZWFyKGRpcnR5RGF0ZSwgb3B0aW9ucyk7XG4gIHZhciBmaXJzdFdlZWsgPSBuZXcgRGF0ZSgwKTtcbiAgZmlyc3RXZWVrLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vlay5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIGRhdGUgPSBzdGFydE9mVVRDV2VlayhmaXJzdFdlZWssIG9wdGlvbnMpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZlVUQ1dlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkd2Vla1N0YXJ0c09uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX29wdGlvbnMkd2Vla1N0YXJ0c09uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkYXkgPSBkYXRlLmdldFVUQ0RheSgpO1xuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSAtIGRpZmYpO1xuICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0ludGVnZXIoZGlydHlOdW1iZXIpIHtcbiAgaWYgKGRpcnR5TnVtYmVyID09PSBudWxsIHx8IGRpcnR5TnVtYmVyID09PSB0cnVlIHx8IGRpcnR5TnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG4gIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfVxuICByZXR1cm4gbnVtYmVyIDwgMCA/IE1hdGguY2VpbChudW1iZXIpIDogTWF0aC5mbG9vcihudW1iZXIpO1xufSIsImltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGFkZE1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gYmUgYWRkZWQuIFBvc2l0aXZlIGRlY2ltYWxzIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5mbG9vcmAsIGRlY2ltYWxzIGxlc3MgdGhhbiB6ZXJvIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5jZWlsYC5cbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIGFkZGVkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCA3NTAgbWlsbGlzZWNvbmRzIHRvIDEwIEp1bHkgMjAxNCAxMjo0NTozMC4wMDA6XG4gKiBjb25zdCByZXN1bHQgPSBhZGRNaWxsaXNlY29uZHMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCA0NSwgMzAsIDApLCA3NTApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NTozMC43NTBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciB0aW1lc3RhbXAgPSB0b0RhdGUoZGlydHlEYXRlKS5nZXRUaW1lKCk7XG4gIHZhciBhbW91bnQgPSB0b0ludGVnZXIoZGlydHlBbW91bnQpO1xuICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgYW1vdW50KTtcbn0iLCJpbXBvcnQgaXNWYWxpZCBmcm9tIFwiLi4vaXNWYWxpZC9pbmRleC5qc1wiO1xuaW1wb3J0IHN1Yk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vc3ViTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXR0ZXJzIGZyb20gXCIuLi9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9uZ0Zvcm1hdHRlcnMgZnJvbSBcIi4uL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuLCBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4sIHRocm93UHJvdGVjdGVkRXJyb3IgfSBmcm9tIFwiLi4vX2xpYi9wcm90ZWN0ZWRUb2tlbnMvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qc1wiOyAvLyBUaGlzIFJlZ0V4cCBjb25zaXN0cyBvZiB0aHJlZSBwYXJ0cyBzZXBhcmF0ZWQgYnkgYHxgOlxuLy8gLSBbeVlRcU1Md0lkRGVjaWhIS2ttc11vIG1hdGNoZXMgYW55IGF2YWlsYWJsZSBvcmRpbmFsIG51bWJlciB0b2tlblxuLy8gICAob25lIG9mIHRoZSBjZXJ0YWluIGxldHRlcnMgZm9sbG93ZWQgYnkgYG9gKVxuLy8gLSAoXFx3KVxcMSogbWF0Y2hlcyBhbnkgc2VxdWVuY2VzIG9mIHRoZSBzYW1lIGxldHRlclxuLy8gLSAnJyBtYXRjaGVzIHR3byBxdW90ZSBjaGFyYWN0ZXJzIGluIGEgcm93XG4vLyAtICcoJyd8W14nXSkrKCd8JCkgbWF0Y2hlcyBhbnl0aGluZyBzdXJyb3VuZGVkIGJ5IHR3byBxdW90ZSBjaGFyYWN0ZXJzICgnKSxcbi8vICAgZXhjZXB0IGEgc2luZ2xlIHF1b3RlIHN5bWJvbCwgd2hpY2ggZW5kcyB0aGUgc2VxdWVuY2UuXG4vLyAgIFR3byBxdW90ZSBjaGFyYWN0ZXJzIGRvIG5vdCBlbmQgdGhlIHNlcXVlbmNlLlxuLy8gICBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBzaW5nbGUgcXVvdGVcbi8vICAgdGhlbiB0aGUgc2VxdWVuY2Ugd2lsbCBjb250aW51ZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4vLyAtIC4gbWF0Y2hlcyBhbnkgc2luZ2xlIGNoYXJhY3RlciB1bm1hdGNoZWQgYnkgcHJldmlvdXMgcGFydHMgb2YgdGhlIFJlZ0V4cHNcbnZhciBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG52YXIgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcbnZhciBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG52YXIgZG91YmxlUXVvdGVSZWdFeHAgPSAvJycvZztcbnZhciB1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCA9IC9bYS16QS1aXS87XG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIHRoZSBnaXZlbiBmb3JtYXQuIFRoZSByZXN1bHQgbWF5IHZhcnkgYnkgbG9jYWxlLlxuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhlIGBmb3JtYXRgIHRva2VucyBkaWZmZXIgZnJvbSBNb21lbnQuanMgYW5kIG90aGVyIGxpYnJhcmllcy5cbiAqID4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogVGhlIGNoYXJhY3RlcnMgd3JhcHBlZCBiZXR3ZWVuIHR3byBzaW5nbGUgcXVvdGVzIGNoYXJhY3RlcnMgKCcpIGFyZSBlc2NhcGVkLlxuICogVHdvIHNpbmdsZSBxdW90ZXMgaW4gYSByb3csIHdoZXRoZXIgaW5zaWRlIG9yIG91dHNpZGUgYSBxdW90ZWQgc2VxdWVuY2UsIHJlcHJlc2VudCBhICdyZWFsJyBzaW5nbGUgcXVvdGUuXG4gKiAoc2VlIHRoZSBsYXN0IGV4YW1wbGUpXG4gKlxuICogRm9ybWF0IG9mIHRoZSBzdHJpbmcgaXMgYmFzZWQgb24gVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuICogd2l0aCBhIGZldyBhZGRpdGlvbnMgKHNlZSBub3RlIDcgYmVsb3cgdGhlIHRhYmxlKS5cbiAqXG4gKiBBY2NlcHRlZCBwYXR0ZXJuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBhdHRlcm4gfCBSZXN1bHQgZXhhbXBsZXMgICAgICAgICAgICAgICAgICAgfCBOb3RlcyB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tfFxuICogfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRy4uR0dHICB8IEFELCBCQyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgICAgfCBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHRyAgIHwgQSwgQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBDYWxlbmRhciB5ZWFyICAgICAgICAgICAgICAgICAgIHwgeSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHlvICAgICAgfCA0NHRoLCAxc3QsIDB0aCwgMTd0aCAgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5ICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5eSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgIHwgWSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlvICAgICAgfCA0NHRoLCAxc3QsIDE5MDB0aCwgMjAxN3RoICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZWSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgIHwgUiAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSICAgICAgfCAtNDMsIDAwLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlIgICAgIHwgLTA0MywgMDAwLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUiAgICB8IC0wMDQzLCAwMDAwLCAwMDAxLCAxOTAwLCAyMDE3ICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlJSICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUsNyB8XG4gKiB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICAgfCB1ICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXUgICAgICB8IC00MywgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dSAgICAgfCAtMDQzLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1ICAgIHwgLTAwNDMsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dXUgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgUXVhcnRlciAoZm9ybWF0dGluZykgICAgICAgICAgICB8IFEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUVEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgUXVhcnRlciAoc3RhbmQtYWxvbmUpICAgICAgICAgICB8IHEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcXEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgTW9udGggKGZvcm1hdHRpbmcpICAgICAgICAgICAgICB8IE0gICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU0gICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTU0gICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTW9udGggKHN0YW5kLWFsb25lKSAgICAgICAgICAgICB8IEwgICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTEwgICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTCAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTEwgICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgICB8IHcgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3byAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd3cgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgICB8IEkgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSUkgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgICB8IGQgICAgICAgfCAxLCAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzFzdCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZGQgICAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgICB8IEQgICAgICAgfCAxLCAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzY1dGgsIDM2NnRoICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREQgICAgICB8IDAxLCAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERERCAgICAgfCAwMDEsIDAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBEYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgICAgIHwgRS4uRUVFICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUVFICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICB8IGkgICAgICAgfCAxLCAyLCAzLCAuLi4sIDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgN3RoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWkgICAgICB8IDAxLCAwMiwgLi4uLCAwNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWkgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpaSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCA3ICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgfCBlICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW8gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWUgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZWUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoc3RhbmQtYWxvbmUpIHwgYyAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjYyAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2MgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjYyAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2NjICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICB8IGEuLmFhICAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWEgICAgIHwgYW0sIHBtICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWFhICAgfCBhLCBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgfCBiLi5iYiAgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiICAgICB8IGFtLCBwbSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmIgICAgfCBhLm0uLCBwLm0uLCBub29uLCBtaWRuaWdodCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiYiAgIHwgYSwgcCwgbiwgbWkgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgIHwgQi4uQkJCICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkIgICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCQiAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgIHwgaCAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAxMnRoICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgIHwgSCAgICAgICB8IDAsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhvICAgICAgfCAwdGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICAgIHwgMDAsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgIHwgSyAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAwdGggICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLSyAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgIHwgayAgICAgICB8IDI0LCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtvICAgICAgfCAyNHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrayAgICAgIHwgMjQsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbSAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1vICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcyAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNvICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgIHwgUyAgICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTICAgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1MgICAgIHwgMDAwLCAwMDEsIC4uLiwgOTk5ICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTUyAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvIFopICAgICAgICB8IFggICAgICAgfCAtMDgsICswNTMwLCBaICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWCAgICAgIHwgLTA4MDAsICswNTMwLCBaICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYICAgICB8IC0wODowMCwgKzA1OjMwLCBaICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFggICAgfCAtMDgwMCwgKzA1MzAsIFosICsxMjM0NTYgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYWCAgIHwgLTA4OjAwLCArMDU6MzAsIFosICsxMjozNDo1NiAgICAgIHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgIHwgeCAgICAgICB8IC0wOCwgKzA1MzAsICswMCAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4ICAgICAgfCAtMDgwMCwgKzA1MzAsICswMDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHggICAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eCAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAsICsxMjM0NTYgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHh4ICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwLCArMTI6MzQ6NTYgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICAgfCBPLi4uT09PIHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT09PTyAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIgICAgIHxcbiAqIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pICB8IHouLi56enogfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCA2ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB6enp6ICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiw2ICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgIHwgdCAgICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHR0ICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgfCBUICAgICAgIHwgNTEyOTY5NTIwOTAwICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVFQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgICB8IFAgICAgICAgfCAwNC8yOS8xNDUzICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUCAgICAgIHwgQXByIDI5LCAxNDUzICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQICAgICB8IEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFAgICAgfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICAgfCBwICAgICAgIHwgMTI6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHAgICAgICB8IDEyOjAwOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcCAgICAgfCAxMjowMDowMCBBTSBHTVQrMiAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHBwICAgIHwgMTI6MDA6MDAgQU0gR01UKzAyOjAwICAgICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBDb21iaW5hdGlvbiBvZiBkYXRlIGFuZCB0aW1lICAgIHwgUHAgICAgICB8IDA0LzI5LzE0NTMsIDEyOjAwIEFNICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQcHAgICAgfCBBcHIgMjksIDE0NTMsIDEyOjAwOjAwIEFNICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBwcHAgIHwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUHBwcHB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICB8IDIsNyAgIHxcbiAqIE5vdGVzOlxuICogMS4gXCJGb3JtYXR0aW5nXCIgdW5pdHMgKGUuZy4gZm9ybWF0dGluZyBxdWFydGVyKSBpbiB0aGUgZGVmYXVsdCBlbi1VUyBsb2NhbGVcbiAqICAgIGFyZSB0aGUgc2FtZSBhcyBcInN0YW5kLWFsb25lXCIgdW5pdHMsIGJ1dCBhcmUgZGlmZmVyZW50IGluIHNvbWUgbGFuZ3VhZ2VzLlxuICogICAgXCJGb3JtYXR0aW5nXCIgdW5pdHMgYXJlIGRlY2xpbmVkIGFjY29yZGluZyB0byB0aGUgcnVsZXMgb2YgdGhlIGxhbmd1YWdlXG4gKiAgICBpbiB0aGUgY29udGV4dCBvZiBhIGRhdGUuIFwiU3RhbmQtYWxvbmVcIiB1bml0cyBhcmUgYWx3YXlzIG5vbWluYXRpdmUgc2luZ3VsYXI6XG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBMTExMJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZCdgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBNTU1NJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZHUnYFxuICpcbiAqIDIuIEFueSBzZXF1ZW5jZSBvZiB0aGUgaWRlbnRpY2FsIGxldHRlcnMgaXMgYSBwYXR0ZXJuLCB1bmxlc3MgaXQgaXMgZXNjYXBlZCBieVxuICogICAgdGhlIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIChzZWUgYmVsb3cpLlxuICogICAgSWYgdGhlIHNlcXVlbmNlIGlzIGxvbmdlciB0aGFuIGxpc3RlZCBpbiB0YWJsZSAoZS5nLiBgRUVFRUVFRUVFRUVgKVxuICogICAgdGhlIG91dHB1dCB3aWxsIGJlIHRoZSBzYW1lIGFzIGRlZmF1bHQgcGF0dGVybiBmb3IgdGhpcyB1bml0LCB1c3VhbGx5XG4gKiAgICB0aGUgbG9uZ2VzdCBvbmUgKGluIGNhc2Ugb2YgSVNPIHdlZWtkYXlzLCBgRUVFRWApLiBEZWZhdWx0IHBhdHRlcm5zIGZvciB1bml0c1xuICogICAgYXJlIG1hcmtlZCB3aXRoIFwiMlwiIGluIHRoZSBsYXN0IGNvbHVtbiBvZiB0aGUgdGFibGUuXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU0nKSAvLz0+ICdOb3YnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NJykgLy89PiAnTidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqIDMuIFNvbWUgcGF0dGVybnMgY291bGQgYmUgdW5saW1pdGVkIGxlbmd0aCAoc3VjaCBhcyBgeXl5eXl5eXlgKS5cbiAqICAgIFRoZSBvdXRwdXQgd2lsbCBiZSBwYWRkZWQgd2l0aCB6ZXJvcyB0byBtYXRjaCB0aGUgbGVuZ3RoIG9mIHRoZSBwYXR0ZXJuLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAneXl5eXl5eXknKSAvLz0+ICcwMDAwMjAxNydgXG4gKlxuICogNC4gYFFRUVFRYCBhbmQgYHFxcXFxYCBjb3VsZCBiZSBub3Qgc3RyaWN0bHkgbnVtZXJpY2FsIGluIHNvbWUgbG9jYWxlcy5cbiAqICAgIFRoZXNlIHRva2VucyByZXByZXNlbnQgdGhlIHNob3J0ZXN0IGZvcm0gb2YgdGhlIHF1YXJ0ZXIuXG4gKlxuICogNS4gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIHBhdHRlcm5zIGFyZSBCLkMuIHllYXJzOlxuICpcbiAqICAgIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICogICAgfCBBQyAxIHwgICAxIHwgICAxIHxcbiAqICAgIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gKiAgICB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICpcbiAqICAgIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAqICAgIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZDpcbiAqXG4gKiAgICB8IFllYXIgfCBgeXlgIHwgYHV1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tLXwtLS0tLS18XG4gKiAgICB8IDEgICAgfCAgIDAxIHwgICAwMSB8XG4gKiAgICB8IDE0ICAgfCAgIDE0IHwgICAxNCB8XG4gKiAgICB8IDM3NiAgfCAgIDc2IHwgIDM3NiB8XG4gKiAgICB8IDE0NTMgfCAgIDUzIHwgMTQ1MyB8XG4gKlxuICogICAgVGhlIHNhbWUgZGlmZmVyZW5jZSBpcyB0cnVlIGZvciBsb2NhbCBhbmQgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIChgWWAgYW5kIGBSYCksXG4gKiAgICBleGNlcHQgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhcnMgYXJlIGRlcGVuZGVudCBvbiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gXG4gKiAgICBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAoY29tcGFyZSBbZ2V0SVNPV2Vla1llYXJde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0SVNPV2Vla1llYXJ9XG4gKiAgICBhbmQgW2dldFdlZWtZZWFyXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldFdlZWtZZWFyfSkuXG4gKlxuICogNi4gU3BlY2lmaWMgbm9uLWxvY2F0aW9uIHRpbWV6b25lcyBhcmUgY3VycmVudGx5IHVuYXZhaWxhYmxlIGluIGBkYXRlLWZuc2AsXG4gKiAgICBzbyByaWdodCBub3cgdGhlc2UgdG9rZW5zIGZhbGwgYmFjayB0byBHTVQgdGltZXpvbmVzLlxuICpcbiAqIDcuIFRoZXNlIHBhdHRlcm5zIGFyZSBub3QgaW4gdGhlIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqICAgIC0gYGlgOiBJU08gZGF5IG9mIHdlZWtcbiAqICAgIC0gYElgOiBJU08gd2VlayBvZiB5ZWFyXG4gKiAgICAtIGBSYDogSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqICAgIC0gYHRgOiBzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgVGA6IG1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYG9gOiBvcmRpbmFsIG51bWJlciBtb2RpZmllclxuICogICAgLSBgUGA6IGxvbmcgbG9jYWxpemVkIGRhdGVcbiAqICAgIC0gYHBgOiBsb25nIGxvY2FsaXplZCB0aW1lXG4gKlxuICogOC4gYFlZYCBhbmQgYFlZWVlgIHRva2VucyByZXByZXNlbnQgd2Vlay1udW1iZXJpbmcgeWVhcnMgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggeWVhcnMuXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiA5LiBgRGAgYW5kIGBERGAgdG9rZW5zIHJlcHJlc2VudCBkYXlzIG9mIHRoZSB5ZWFyIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIGRheXMgb2YgdGhlIG1vbnRoLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdCAtIHRoZSBzdHJpbmcgb2YgdG9rZW5zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHBhcmFtIHswfDF8MnwzfDR8NXw2fSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGU9MV0gLSB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2Vucz1mYWxzZV0gLSBpZiB0cnVlLCBhbGxvd3MgdXNhZ2Ugb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIgdG9rZW5zIGBZWWAgYW5kIGBZWVlZYDtcbiAqICAgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM9ZmFsc2VdIC0gaWYgdHJ1ZSwgYWxsb3dzIHVzYWdlIG9mIHRoZSBkYXkgb2YgeWVhciB0b2tlbnMgYERgIGFuZCBgRERgO1xuICogICBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBsb2NhbGl6ZWAgcHJvcGVydHlcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXRMb25nYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMud2Vla1N0YXJ0c09uYCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNlxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgN1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gdXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYHl5YCBpbnN0ZWFkIG9mIGBZWWAgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gdXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYGRkYCBpbnN0ZWFkIG9mIGBERGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gZm9ybWF0IHN0cmluZyBjb250YWlucyBhbiB1bmVzY2FwZWQgbGF0aW4gYWxwaGFiZXQgY2hhcmFjdGVyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDEsIDExKSwgJ01NL2RkL3l5eXknKVxuICogLy89PiAnMDIvMTEvMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDIgSnVseSAyMDE0IGluIEVzcGVyYW50bzpcbiAqIGltcG9ydCB7IGVvTG9jYWxlIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIpLCBcImRvICdkZScgTU1NTSB5eXl5XCIsIHtcbiAqICAgbG9jYWxlOiBlb0xvY2FsZVxuICogfSlcbiAqIC8vPT4gJzItYSBkZSBqdWxpbyAyMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFc2NhcGUgc3RyaW5nIGJ5IHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIsIDE1KSwgXCJoICdvJydjbG9jaydcIilcbiAqIC8vPT4gXCIzIG8nY2xvY2tcIlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChkaXJ0eURhdGUsIGRpcnR5Rm9ybWF0U3RyLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfb3B0aW9ucyRsb2NhbGUsIF9yZWYyLCBfcmVmMywgX3JlZjQsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlMiwgX29wdGlvbnMkbG9jYWxlMiRvcHRpLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIsIF9yZWY1LCBfcmVmNiwgX3JlZjcsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlMywgX29wdGlvbnMkbG9jYWxlMyRvcHRpLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwzLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0O1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGZvcm1hdFN0ciA9IFN0cmluZyhkaXJ0eUZvcm1hdFN0cik7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBsb2NhbGUgPSAoX3JlZiA9IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyRsb2NhbGUgIT09IHZvaWQgMCA/IF9vcHRpb25zJGxvY2FsZSA6IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IGRlZmF1bHRMb2NhbGU7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYyID0gKF9yZWYzID0gKF9yZWY0ID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMiA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUyID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMiRvcHRpID0gX29wdGlvbnMkbG9jYWxlMi5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUyJG9wdGkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZTIkb3B0aS5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWY0ICE9PSB2b2lkIDAgPyBfcmVmNCA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogMSk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAxIGFuZCA3IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEoZmlyc3RXZWVrQ29udGFpbnNEYXRlID49IDEgJiYgZmlyc3RXZWVrQ29udGFpbnNEYXRlIDw9IDcpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2ZpcnN0V2Vla0NvbnRhaW5zRGF0ZSBtdXN0IGJlIGJldHdlZW4gMSBhbmQgNyBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWY1ID0gKF9yZWY2ID0gKF9yZWY3ID0gKF9vcHRpb25zJHdlZWtTdGFydHNPbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9vcHRpb25zJHdlZWtTdGFydHNPbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkd2Vla1N0YXJ0c09uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMyA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUzID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMyRvcHRpID0gX29wdGlvbnMkbG9jYWxlMy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUzJG9wdGkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZTMkb3B0aS53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWY3ICE9PSB2b2lkIDAgPyBfcmVmNyA6IGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjYgIT09IHZvaWQgMCA/IF9yZWY2IDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMgPSBkZWZhdWx0T3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWw0ID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsMy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0LndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjUgIT09IHZvaWQgMCA/IF9yZWY1IDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIGlmICghbG9jYWxlLmxvY2FsaXplKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gbG9jYWxpemUgcHJvcGVydHknKTtcbiAgfVxuICBpZiAoIWxvY2FsZS5mb3JtYXRMb25nKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gZm9ybWF0TG9uZyBwcm9wZXJ0eScpO1xuICB9XG4gIHZhciBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGluIHN5c3RlbSB0aW1lem9uZSB0byB0aGUgc2FtZSBkYXRlIGluIFVUQyswMDowMCB0aW1lem9uZS5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgd2hlbiBVVEMgZnVuY3Rpb25zIHdpbGwgYmUgaW1wbGVtZW50ZWQsIGxvY2FsZXMgd2lsbCBiZSBjb21wYXRpYmxlIHdpdGggdGhlbS5cbiAgLy8gU2VlIGFuIGlzc3VlIGFib3V0IFVUQyBmdW5jdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG4gIHZhciB0aW1lem9uZU9mZnNldCA9IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMob3JpZ2luYWxEYXRlKTtcbiAgdmFyIHV0Y0RhdGUgPSBzdWJNaWxsaXNlY29uZHMob3JpZ2luYWxEYXRlLCB0aW1lem9uZU9mZnNldCk7XG4gIHZhciBmb3JtYXR0ZXJPcHRpb25zID0ge1xuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogZmlyc3RXZWVrQ29udGFpbnNEYXRlLFxuICAgIHdlZWtTdGFydHNPbjogd2Vla1N0YXJ0c09uLFxuICAgIGxvY2FsZTogbG9jYWxlLFxuICAgIF9vcmlnaW5hbERhdGU6IG9yaWdpbmFsRGF0ZVxuICB9O1xuICB2YXIgcmVzdWx0ID0gZm9ybWF0U3RyLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKS5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIHZhciBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09ICdwJyB8fCBmaXJzdENoYXJhY3RlciA9PT0gJ1AnKSB7XG4gICAgICB2YXIgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgIHJldHVybiBsb25nRm9ybWF0dGVyKHN1YnN0cmluZywgbG9jYWxlLmZvcm1hdExvbmcpO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyaW5nO1xuICB9KS5qb2luKCcnKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKS5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIC8vIFJlcGxhY2UgdHdvIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIHdpdGggb25lIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICBpZiAoc3Vic3RyaW5nID09PSBcIicnXCIpIHtcbiAgICAgIHJldHVybiBcIidcIjtcbiAgICB9XG4gICAgdmFyIGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCInXCIpIHtcbiAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zKSAmJiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4oc3Vic3RyaW5nKSkge1xuICAgICAgICB0aHJvd1Byb3RlY3RlZEVycm9yKHN1YnN0cmluZywgZGlydHlGb3JtYXRTdHIsIFN0cmluZyhkaXJ0eURhdGUpKTtcbiAgICAgIH1cbiAgICAgIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucykgJiYgaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbihzdWJzdHJpbmcpKSB7XG4gICAgICAgIHRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBkaXJ0eUZvcm1hdFN0ciwgU3RyaW5nKGRpcnR5RGF0ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZvcm1hdHRlcih1dGNEYXRlLCBzdWJzdHJpbmcsIGxvY2FsZS5sb2NhbGl6ZSwgZm9ybWF0dGVyT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYCcgKyBmaXJzdENoYXJhY3RlciArICdgJyk7XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHJpbmc7XG4gIH0pLmpvaW4oJycpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIHZhciBtYXRjaGVkID0gaW5wdXQubWF0Y2goZXNjYXBlZFN0cmluZ1JlZ0V4cCk7XG4gIGlmICghbWF0Y2hlZCkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNEYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiB2YWx1ZSBhIGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGUuIFRoZSBmdW5jdGlvbiB3b3JrcyBmb3IgZGF0ZXMgdHJhbnNmZXJyZWQgYWNyb3NzIGlmcmFtZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZGF0ZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZShOYU4pKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBzb21lIHZhbHVlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIG9iamVjdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSh7fSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEYXRlKHZhbHVlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBEYXRlXSc7XG59IiwiaW1wb3J0IHN0YXJ0T2ZEYXkgZnJvbSBcIi4uL3N0YXJ0T2ZEYXkvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzU2FtZURheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAwNjowMDowMCBhbmQgNCBTZXB0ZW1iZXIgMTg6MDA6MDAgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDApLCBuZXcgRGF0ZSgyMDE0LCA4LCA0LCAxOCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIGFuZCA0IE9jdG9iZXIgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQpLCBuZXcgRGF0ZSgyMDE0LCA5LCA0KSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyLCAyMDE0IGFuZCA0IFNlcHRlbWJlciwgMjAxNSBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTUsIDgsIDQpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1NhbWVEYXkoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGlydHlEYXRlUmlnaHQpO1xuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mRGF5LmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZkRheS5nZXRUaW1lKCk7XG59IiwiaW1wb3J0IHN0YXJ0T2ZXZWVrIGZyb20gXCIuLi9zdGFydE9mV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNTYW1lV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEBwYXJhbSB7MHwxfDJ8M3w0fDV8Nn0gW29wdGlvbnMud2Vla1N0YXJ0c09uPTBdIC0gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgLSBTdW5kYXkpXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAzMSBBdWd1c3QgMjAxNCBhbmQgNCBTZXB0ZW1iZXIgMjAxNCBpbiB0aGUgc2FtZSB3ZWVrP1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lV2VlayhuZXcgRGF0ZSgyMDE0LCA3LCAzMSksIG5ldyBEYXRlKDIwMTQsIDgsIDQpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHdlZWsgc3RhcnRzIHdpdGggTW9uZGF5LFxuICogLy8gYXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDcsIDMxKSwgbmV3IERhdGUoMjAxNCwgOCwgNCksIHtcbiAqICAgd2Vla1N0YXJ0c09uOiAxXG4gKiB9KVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMSBKYW51YXJ5IDIwMTQgYW5kIDEgSmFudWFyeSAyMDE1IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDAsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNTYW1lV2VlayhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCwgb3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0U3RhcnRPZldlZWsgPSBzdGFydE9mV2VlayhkaXJ0eURhdGVMZWZ0LCBvcHRpb25zKTtcbiAgdmFyIGRhdGVSaWdodFN0YXJ0T2ZXZWVrID0gc3RhcnRPZldlZWsoZGlydHlEYXRlUmlnaHQsIG9wdGlvbnMpO1xuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mV2Vlay5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZXZWVrLmdldFRpbWUoKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzU2FtZVllYXJcbiAqIEBjYXRlZ29yeSBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgeWVhcj9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgeWVhcj9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDIgU2VwdGVtYmVyIDIwMTQgYW5kIDI1IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHllYXI/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVZZWFyKG5ldyBEYXRlKDIwMTQsIDgsIDIpLCBuZXcgRGF0ZSgyMDE0LCA4LCAyNSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNTYW1lWWVhcihkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgcmV0dXJuIGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgPT09IGRhdGVSaWdodC5nZXRGdWxsWWVhcigpO1xufSIsImltcG9ydCBpc1NhbWVXZWVrIGZyb20gXCIuLi9pc1NhbWVXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1RoaXNXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSB3ZWVrIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBub3QgcHJlc2VudCBpbiB0aGUgRlAgc3VibW9kdWxlIGFzXG4gKiA+IGl0IHVzZXMgYERhdGUubm93KClgIGludGVybmFsbHkgaGVuY2UgaW1wdXJlIGFuZCBjYW4ndCBiZSBzYWZlbHkgY3VycmllZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9uc1xuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcGFyYW0gezB8MXwyfDN8NHw1fDZ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoaXMgd2Vla1xuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAyMSBTZXB0ZW1iZXIgMjAxNCBpbiB0aGlzIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1RoaXNXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCBhbmQgd2VlayBzdGFydHMgd2l0aCBNb25kYXlcbiAqIC8vIGlzIDIxIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVGhpc1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjEpLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBmYWxzZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVGhpc1dlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gaXNTYW1lV2VlayhkaXJ0eURhdGUsIERhdGUubm93KCksIG9wdGlvbnMpO1xufSIsImltcG9ydCBpc1NhbWVZZWFyIGZyb20gXCIuLi9pc1NhbWVZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1RoaXNZZWFyXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSB5ZWFyIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgeWVhciBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBub3QgcHJlc2VudCBpbiB0aGUgRlAgc3VibW9kdWxlIGFzXG4gKiA+IGl0IHVzZXMgYERhdGUubm93KClgIGludGVybmFsbHkgaGVuY2UgaW1wdXJlIGFuZCBjYW4ndCBiZSBzYWZlbHkgY3VycmllZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGlzIHllYXJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCwgaXMgMiBKdWx5IDIwMTQgaW4gdGhpcyB5ZWFyP1xuICogY29uc3QgcmVzdWx0ID0gaXNUaGlzWWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RoaXNZZWFyKGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIGlzU2FtZVllYXIoZGlydHlEYXRlLCBEYXRlLm5vdygpKTtcbn0iLCJpbXBvcnQgaXNTYW1lRGF5IGZyb20gXCIuLi9pc1NhbWVEYXkvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzVG9kYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdG9kYXk/XG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgdG9kYXk/XG4gKlxuICogPiDimqDvuI8gUGxlYXNlIG5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBwcmVzZW50IGluIHRoZSBGUCBzdWJtb2R1bGUgYXNcbiAqID4gaXQgdXNlcyBgRGF0ZS5ub3coKWAgaW50ZXJuYWxseSBoZW5jZSBpbXB1cmUgYW5kIGNhbid0IGJlIHNhZmVseSBjdXJyaWVkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHRvZGF5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDYgT2N0b2JlciAxNDowMDowMCB0b2RheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVG9kYXkobmV3IERhdGUoMjAxNCwgOSwgNiwgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVG9kYXkoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gaXNTYW1lRGF5KGRpcnR5RGF0ZSwgRGF0ZS5ub3coKSk7XG59IiwiaW1wb3J0IGlzRGF0ZSBmcm9tIFwiLi4vaXNEYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzVmFsaWRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdmFsaWQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGFyZ3VtZW50IGlzIEludmFsaWQgRGF0ZSBhbmQgdHJ1ZSBvdGhlcndpc2UuXG4gKiBBcmd1bWVudCBpcyBjb252ZXJ0ZWQgdG8gRGF0ZSB1c2luZyBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHsqfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB2YWxpZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoMjAxNCwgMSwgMzEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsdWUsIGNvbnZlcnRhYmxlIGludG8gYSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZCgxMzkzODA0ODAwMDAwKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgnJykpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVmFsaWQoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICBpZiAoIWlzRGF0ZShkaXJ0eURhdGUpICYmIHR5cGVvZiBkaXJ0eURhdGUgIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHJldHVybiAhaXNOYU4oTnVtYmVyKGRhdGUpKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZvcm1hdExvbmdGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICB2YXIgZm9ybWF0ID0gYXJncy5mb3JtYXRzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHNbYXJncy5kZWZhdWx0V2lkdGhdO1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRMb2NhbGl6ZUZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXJ0eUluZGV4LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRleHQgPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmNvbnRleHQgPyBTdHJpbmcob3B0aW9ucy5jb250ZXh0KSA6ICdzdGFuZGFsb25lJztcbiAgICB2YXIgdmFsdWVzQXJyYXk7XG4gICAgaWYgKGNvbnRleHQgPT09ICdmb3JtYXR0aW5nJyAmJiBhcmdzLmZvcm1hdHRpbmdWYWx1ZXMpIHtcbiAgICAgIHZhciBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRGb3JtYXR0aW5nV2lkdGggfHwgYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YXIgd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogZGVmYXVsdFdpZHRoO1xuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2RlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFyIF93aWR0aCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy52YWx1ZXNbX3dpZHRoXSB8fCBhcmdzLnZhbHVlc1tfZGVmYXVsdFdpZHRoXTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gYXJncy5hcmd1bWVudENhbGxiYWNrID8gYXJncy5hcmd1bWVudENhbGxiYWNrKGRpcnR5SW5kZXgpIDogZGlydHlJbmRleDtcbiAgICAvLyBAdHMtaWdub3JlOiBGb3Igc29tZSByZWFzb24gVHlwZVNjcmlwdCBqdXN0IGRvbid0IHdhbnQgdG8gbWF0Y2ggaXQsIG5vIG1hdHRlciBob3cgaGFyZCB3ZSB0cnkuIEkgY2hhbGxlbmdlIHlvdSB0byB0cnkgdG8gcmVtb3ZlIGl0IVxuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYXRjaEZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICB2YXIgbWF0Y2hQYXR0ZXJuID0gd2lkdGggJiYgYXJncy5tYXRjaFBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLm1hdGNoUGF0dGVybnNbYXJncy5kZWZhdWx0TWF0Y2hXaWR0aF07XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKG1hdGNoUGF0dGVybik7XG4gICAgaWYgKCFtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUGF0dGVybnMgPSB3aWR0aCAmJiBhcmdzLnBhcnNlUGF0dGVybnNbd2lkdGhdIHx8IGFyZ3MucGFyc2VQYXR0ZXJuc1thcmdzLmRlZmF1bHRQYXJzZVdpZHRoXTtcbiAgICB2YXIga2V5ID0gQXJyYXkuaXNBcnJheShwYXJzZVBhdHRlcm5zKSA/IGZpbmRJbmRleChwYXJzZVBhdHRlcm5zLCBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKTtcbiAgICB9KSA6IGZpbmRLZXkocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSk7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGZpbmRLZXkob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwcmVkaWNhdGUob2JqZWN0W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIga2V5ID0gMDsga2V5IDwgYXJyYXkubGVuZ3RoOyBrZXkrKykge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYXRjaFBhdHRlcm5GbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLm1hdGNoUGF0dGVybik7XG4gICAgaWYgKCFtYXRjaFJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcbiAgICB2YXIgcGFyc2VSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5wYXJzZVBhdHRlcm4pO1xuICAgIGlmICghcGFyc2VSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIHZhciB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhwYXJzZVJlc3VsdFswXSkgOiBwYXJzZVJlc3VsdFswXTtcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB2YXIgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHJlc3Q6IHJlc3RcbiAgICB9O1xuICB9O1xufSIsInZhciBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIHhTZWNvbmRzOiB7XG4gICAgb25lOiAnMSBzZWNvbmQnLFxuICAgIG90aGVyOiAne3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIGhhbGZBTWludXRlOiAnaGFsZiBhIG1pbnV0ZScsXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICB4TWludXRlczoge1xuICAgIG9uZTogJzEgbWludXRlJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgaG91cicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhIb3Vyczoge1xuICAgIG9uZTogJzEgaG91cicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhEYXlzOiB7XG4gICAgb25lOiAnMSBkYXknLFxuICAgIG90aGVyOiAne3tjb3VudH19IGRheXMnXG4gIH0sXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiAnYWJvdXQgMSB3ZWVrJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgeFdlZWtzOiB7XG4gICAgb25lOiAnMSB3ZWVrJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgYWJvdXRYTW9udGhzOiB7XG4gICAgb25lOiAnYWJvdXQgMSBtb250aCcsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICB4TW9udGhzOiB7XG4gICAgb25lOiAnMSBtb250aCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIHhZZWFyczoge1xuICAgIG9uZTogJzEgeWVhcicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6ICdvdmVyIDEgeWVhcicsXG4gICAgb3RoZXI6ICdvdmVyIHt7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiAnYWxtb3N0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICB9XG59O1xudmFyIGZvcm1hdERpc3RhbmNlID0gZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2UodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gIHZhciByZXN1bHQ7XG4gIHZhciB0b2tlblZhbHVlID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuICBpZiAodHlwZW9mIHRva2VuVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZSgne3tjb3VudH19JywgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gJ2luICcgKyByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQgKyAnIGFnbyc7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0RGlzdGFuY2U7IiwiaW1wb3J0IGJ1aWxkRm9ybWF0TG9uZ0ZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzXCI7XG52YXIgZGF0ZUZvcm1hdHMgPSB7XG4gIGZ1bGw6ICdFRUVFLCBNTU1NIGRvLCB5JyxcbiAgbG9uZzogJ01NTU0gZG8sIHknLFxuICBtZWRpdW06ICdNTU0gZCwgeScsXG4gIHNob3J0OiAnTU0vZGQveXl5eSdcbn07XG52YXIgdGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6ICdoOm1tOnNzIGEgenp6eicsXG4gIGxvbmc6ICdoOm1tOnNzIGEgeicsXG4gIG1lZGl1bTogJ2g6bW06c3MgYScsXG4gIHNob3J0OiAnaDptbSBhJ1xufTtcbnZhciBkYXRlVGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBsb25nOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbWVkaXVtOiAne3tkYXRlfX0sIHt7dGltZX19JyxcbiAgc2hvcnQ6ICd7e2RhdGV9fSwge3t0aW1lfX0nXG59O1xudmFyIGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgdGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IHRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pLFxuICBkYXRlVGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVUaW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdExvbmc7IiwidmFyIGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogXCInbGFzdCcgZWVlZSAnYXQnIHBcIixcbiAgeWVzdGVyZGF5OiBcIid5ZXN0ZXJkYXkgYXQnIHBcIixcbiAgdG9kYXk6IFwiJ3RvZGF5IGF0JyBwXCIsXG4gIHRvbW9ycm93OiBcIid0b21vcnJvdyBhdCcgcFwiLFxuICBuZXh0V2VlazogXCJlZWVlICdhdCcgcFwiLFxuICBvdGhlcjogJ1AnXG59O1xudmFyIGZvcm1hdFJlbGF0aXZlID0gZnVuY3Rpb24gZm9ybWF0UmVsYXRpdmUodG9rZW4sIF9kYXRlLCBfYmFzZURhdGUsIF9vcHRpb25zKSB7XG4gIHJldHVybiBmb3JtYXRSZWxhdGl2ZUxvY2FsZVt0b2tlbl07XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0UmVsYXRpdmU7IiwiaW1wb3J0IGJ1aWxkTG9jYWxpemVGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanNcIjtcbnZhciBlcmFWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydCJywgJ0EnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnQkMnLCAnQUQnXSxcbiAgd2lkZTogWydCZWZvcmUgQ2hyaXN0JywgJ0Fubm8gRG9taW5pJ11cbn07XG52YXIgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbJzEnLCAnMicsICczJywgJzQnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnUTEnLCAnUTInLCAnUTMnLCAnUTQnXSxcbiAgd2lkZTogWycxc3QgcXVhcnRlcicsICcybmQgcXVhcnRlcicsICczcmQgcXVhcnRlcicsICc0dGggcXVhcnRlciddXG59O1xuXG4vLyBOb3RlOiBpbiBFbmdsaXNoLCB0aGUgbmFtZXMgb2YgZGF5cyBvZiB0aGUgd2VlayBhbmQgbW9udGhzIGFyZSBjYXBpdGFsaXplZC5cbi8vIElmIHlvdSBhcmUgbWFraW5nIGEgbmV3IGxvY2FsZSBiYXNlZCBvbiB0aGlzIG9uZSwgY2hlY2sgaWYgdGhlIHNhbWUgaXMgdHJ1ZSBmb3IgdGhlIGxhbmd1YWdlIHlvdSdyZSB3b3JraW5nIG9uLlxuLy8gR2VuZXJhbGx5LCBmb3JtYXR0ZWQgZGF0ZXMgc2hvdWxkIGxvb2sgbGlrZSB0aGV5IGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgc2VudGVuY2UsXG4vLyBlLmcuIGluIFNwYW5pc2ggbGFuZ3VhZ2UgdGhlIHdlZWtkYXlzIGFuZCBtb250aHMgc2hvdWxkIGJlIGluIHRoZSBsb3dlcmNhc2UuXG52YXIgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydKJywgJ0YnLCAnTScsICdBJywgJ00nLCAnSicsICdKJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddLFxuICBhYmJyZXZpYXRlZDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICB3aWRlOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxufTtcbnZhciBkYXlWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ10sXG4gIHNob3J0OiBbJ1N1JywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1NhJ10sXG4gIGFiYnJldmlhdGVkOiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICB3aWRlOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J11cbn07XG52YXIgZGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogJ2EnLFxuICAgIHBtOiAncCcsXG4gICAgbWlkbmlnaHQ6ICdtaScsXG4gICAgbm9vbjogJ24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiAnQU0nLFxuICAgIHBtOiAnUE0nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiAnYS5tLicsXG4gICAgcG06ICdwLm0uJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH1cbn07XG52YXIgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9XG59O1xudmFyIG9yZGluYWxOdW1iZXIgPSBmdW5jdGlvbiBvcmRpbmFsTnVtYmVyKGRpcnR5TnVtYmVyLCBfb3B0aW9ucykge1xuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIHZhciByZW0xMDAgPSBudW1iZXIgJSAxMDA7XG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdzdCc7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnbmQnO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3JkJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciArICd0aCc7XG59O1xudmFyIGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyOiBvcmRpbmFsTnVtYmVyLFxuICBlcmE6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBlcmFWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBxdWFydGVyVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IGZ1bmN0aW9uIGFyZ3VtZW50Q2FsbGJhY2socXVhcnRlcikge1xuICAgICAgcmV0dXJuIHF1YXJ0ZXIgLSAxO1xuICAgIH1cbiAgfSksXG4gIG1vbnRoOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogbW9udGhWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnLFxuICAgIGZvcm1hdHRpbmdWYWx1ZXM6IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdEZvcm1hdHRpbmdXaWR0aDogJ3dpZGUnXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgbG9jYWxpemU7IiwiaW1wb3J0IGJ1aWxkTWF0Y2hGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanNcIjtcbmltcG9ydCBidWlsZE1hdGNoUGF0dGVybkZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanNcIjtcbnZhciBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xudmFyIHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXFxkKy9pO1xudmFyIG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYnxhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oYlxcLj9cXHM/Y1xcLj98YlxcLj9cXHM/Y1xcLj9cXHM/ZVxcLj98YVxcLj9cXHM/ZFxcLj98Y1xcLj9cXHM/ZVxcLj8pL2ksXG4gIHdpZGU6IC9eKGJlZm9yZSBjaHJpc3R8YmVmb3JlIGNvbW1vbiBlcmF8YW5ubyBkb21pbml8Y29tbW9uIGVyYSkvaVxufTtcbnZhciBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmIvaSwgL14oYXxjKS9pXVxufTtcbnZhciBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15xWzEyMzRdL2ksXG4gIHdpZGU6IC9eWzEyMzRdKHRofHN0fG5kfHJkKT8gcXVhcnRlci9pXG59O1xudmFyIHBhcnNlUXVhcnRlclBhdHRlcm5zID0ge1xuICBhbnk6IFsvMS9pLCAvMi9pLCAvMy9pLCAvNC9pXVxufTtcbnZhciBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaVxufTtcbnZhciBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9eai9pLCAvXmYvaSwgL15tL2ksIC9eYS9pLCAvXm0vaSwgL15qL2ksIC9eai9pLCAvXmEvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldLFxuICBhbnk6IFsvXmphL2ksIC9eZi9pLCAvXm1hci9pLCAvXmFwL2ksIC9ebWF5L2ksIC9eanVuL2ksIC9eanVsL2ksIC9eYXUvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldXG59O1xudmFyIG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bc210d2ZdL2ksXG4gIHNob3J0OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgd2lkZTogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2lcbn07XG52YXIgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15zL2ksIC9ebS9pLCAvXnQvaSwgL153L2ksIC9edC9pLCAvXmYvaSwgL15zL2ldLFxuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldXG59O1xudmFyIG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pXG59O1xudmFyIHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaVxuICB9XG59O1xudmFyIG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyOiBidWlsZE1hdGNoUGF0dGVybkZuKHtcbiAgICBtYXRjaFBhdHRlcm46IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgcGFyc2VQYXR0ZXJuOiBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHZhbHVlQ2FsbGJhY2s6IGZ1bmN0aW9uIHZhbHVlQ2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIH1cbiAgfSksXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueScsXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayhpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaE1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ2FueScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBtYXRjaDsiLCJpbXBvcnQgZm9ybWF0RGlzdGFuY2UgZnJvbSBcIi4vX2xpYi9mb3JtYXREaXN0YW5jZS9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdExvbmcgZnJvbSBcIi4vX2xpYi9mb3JtYXRMb25nL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0UmVsYXRpdmUgZnJvbSBcIi4vX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGxvY2FsaXplIGZyb20gXCIuL19saWIvbG9jYWxpemUvaW5kZXguanNcIjtcbmltcG9ydCBtYXRjaCBmcm9tIFwiLi9fbGliL21hdGNoL2luZGV4LmpzXCI7XG4vKipcbiAqIEB0eXBlIHtMb2NhbGV9XG4gKiBAY2F0ZWdvcnkgTG9jYWxlc1xuICogQHN1bW1hcnkgRW5nbGlzaCBsb2NhbGUgKFVuaXRlZCBTdGF0ZXMpLlxuICogQGxhbmd1YWdlIEVuZ2xpc2hcbiAqIEBpc28tNjM5LTIgZW5nXG4gKiBAYXV0aG9yIFNhc2hhIEtvc3MgW0Brb3Nzbm9jb3JwXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20va29zc25vY29ycH1cbiAqIEBhdXRob3IgTGVzaGEgS29zcyBbQGxlc2hha29zc117QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2xlc2hha29zc31cbiAqL1xudmFyIGxvY2FsZSA9IHtcbiAgY29kZTogJ2VuLVVTJyxcbiAgZm9ybWF0RGlzdGFuY2U6IGZvcm1hdERpc3RhbmNlLFxuICBmb3JtYXRMb25nOiBmb3JtYXRMb25nLFxuICBmb3JtYXRSZWxhdGl2ZTogZm9ybWF0UmVsYXRpdmUsXG4gIGxvY2FsaXplOiBsb2NhbGl6ZSxcbiAgbWF0Y2g6IG1hdGNoLFxuICBvcHRpb25zOiB7XG4gICAgd2Vla1N0YXJ0c09uOiAwIC8qIFN1bmRheSAqLyxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDFcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsZTsiLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZEYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgZGF5XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZkRheShkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEBwYXJhbSB7MHwxfDJ8M3w0fDV8Nn0gW29wdGlvbnMud2Vla1N0YXJ0c09uPTBdIC0gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgLSBTdW5kYXkpXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHN0YXJ0IG9mIGEgd2Vla1xuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTdW4gQXVnIDMxIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX3JlZjIsIF9yZWYzLCBfb3B0aW9ucyR3ZWVrU3RhcnRzT24sIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkbG9jYWxlJG9wdGlvLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDI7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgd2Vla1N0YXJ0c09uID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJHdlZWtTdGFydHNPbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9vcHRpb25zJHdlZWtTdGFydHNPbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkd2Vla1N0YXJ0c09uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDApO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMCBhbmQgNiBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKHdlZWtTdGFydHNPbiA+PSAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd3ZWVrU3RhcnRzT24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDYgaW5jbHVzaXZlbHknKTtcbiAgfVxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IGFkZE1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vYWRkTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgc3ViTWlsbGlzZWNvbmRzXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZnJvbSB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIHN1YnRyYWN0ZWQuIFBvc2l0aXZlIGRlY2ltYWxzIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5mbG9vcmAsIGRlY2ltYWxzIGxlc3MgdGhhbiB6ZXJvIHdpbGwgYmUgcm91bmRlZCB1c2luZyBgTWF0aC5jZWlsYC5cbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIHN1YnRyYWN0ZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3VidHJhY3QgNzUwIG1pbGxpc2Vjb25kcyBmcm9tIDEwIEp1bHkgMjAxNCAxMjo0NTozMC4wMDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdWJNaWxsaXNlY29uZHMobmV3IERhdGUoMjAxNCwgNiwgMTAsIDEyLCA0NSwgMzAsIDApLCA3NTApXG4gKiAvLz0+IFRodSBKdWwgMTAgMjAxNCAxMjo0NToyOS4yNTBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ViTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBhbW91bnQgPSB0b0ludGVnZXIoZGlydHlBbW91bnQpO1xuICByZXR1cm4gYWRkTWlsbGlzZWNvbmRzKGRpcnR5RGF0ZSwgLWFtb3VudCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgX3R5cGVvZihhcmd1bWVudCkgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNzdHJpbmctYXJndW1lbnRzXCIpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiLyoqXG4gKiBtYXRjaGVzU2VsZWN0b3IgdjIuMC4yXG4gKiBtYXRjaGVzU2VsZWN0b3IoIGVsZW1lbnQsICcuc2VsZWN0b3InIClcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cubWF0Y2hlc1NlbGVjdG9yID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtYXRjaGVzTWV0aG9kID0gKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgRWxlbVByb3RvID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlO1xuICAgIC8vIGNoZWNrIGZvciB0aGUgc3RhbmRhcmQgbWV0aG9kIG5hbWUgZmlyc3RcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdW4tcHJlZml4ZWRcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXNTZWxlY3Rvcic7XG4gICAgfVxuICAgIC8vIGNoZWNrIHZlbmRvciBwcmVmaXhlc1xuICAgIHZhciBwcmVmaXhlcyA9IFsgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbycgXTtcblxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICAgIHZhciBtZXRob2QgPSBwcmVmaXggKyAnTWF0Y2hlc1NlbGVjdG9yJztcbiAgICAgIGlmICggRWxlbVByb3RvWyBtZXRob2QgXSApIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIGVsZW1bIG1hdGNoZXNNZXRob2QgXSggc2VsZWN0b3IgKTtcbiAgfTtcblxufSkpO1xuIiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjEuMS4wXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuLyoganNoaW50IHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCB3aW5kb3cgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBnbG9iYWwuRXZFbWl0dGVyID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIEV2RW1pdHRlcigpIHt9XG5cbnZhciBwcm90byA9IEV2RW1pdHRlci5wcm90b3R5cGU7XG5cbnByb3RvLm9uID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBldmVudHMgaGFzaFxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgbGlzdGVuZXJzIGFycmF5XG4gIHZhciBsaXN0ZW5lcnMgPSBldmVudHNbIGV2ZW50TmFtZSBdID0gZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcbiAgLy8gb25seSBhZGQgb25jZVxuICBpZiAoIGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApID09IC0xICkge1xuICAgIGxpc3RlbmVycy5wdXNoKCBsaXN0ZW5lciApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vbmNlID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFkZCBldmVudFxuICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIC8vIHNldCBvbmNlIGZsYWdcbiAgLy8gc2V0IG9uY2VFdmVudHMgaGFzaFxuICB2YXIgb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgb25jZUxpc3RlbmVycyBvYmplY3RcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdIHx8IHt9O1xuICAvLyBzZXQgZmxhZ1xuICBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9mZiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNvcHkgb3ZlciB0byBhdm9pZCBpbnRlcmZlcmVuY2UgaWYgLm9mZigpIGluIGxpc3RlbmVyXG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgwKTtcbiAgYXJncyA9IGFyZ3MgfHwgW107XG4gIC8vIG9uY2Ugc3R1ZmZcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbIGV2ZW50TmFtZSBdO1xuXG4gIGZvciAoIHZhciBpPTA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldXG4gICAgdmFyIGlzT25jZSA9IG9uY2VMaXN0ZW5lcnMgJiYgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICBpZiAoIGlzT25jZSApIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgLy8gcmVtb3ZlIGJlZm9yZSB0cmlnZ2VyIHRvIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICB0aGlzLm9mZiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAgICAgLy8gdW5zZXQgb25jZSBmbGFnXG4gICAgICBkZWxldGUgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICB9XG4gICAgLy8gdHJpZ2dlciBsaXN0ZW5lclxuICAgIGxpc3RlbmVyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmFsbE9mZiA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcbn07XG5cbnJldHVybiBFdkVtaXR0ZXI7XG5cbn0pKTtcbiIsIi8qKlxuICogRml6enkgVUkgdXRpbHMgdjIuMC43XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKCBtYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0ge307XG5cbi8vIC0tLS0tIGV4dGVuZCAtLS0tLSAvL1xuXG4vLyBleHRlbmRzIG9iamVjdHNcbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn07XG5cbi8vIC0tLS0tIG1vZHVsbyAtLS0tLSAvL1xuXG51dGlscy5tb2R1bG8gPSBmdW5jdGlvbiggbnVtLCBkaXYgKSB7XG4gIHJldHVybiAoICggbnVtICUgZGl2ICkgKyBkaXYgKSAlIGRpdjtcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG52YXIgYXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLy8gdHVybiBlbGVtZW50IG9yIG5vZGVMaXN0IGludG8gYW4gYXJyYXlcbnV0aWxzLm1ha2VBcnJheSA9IGZ1bmN0aW9uKCBvYmogKSB7XG4gIGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG4gICAgLy8gdXNlIG9iamVjdCBpZiBhbHJlYWR5IGFuIGFycmF5XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICAvLyByZXR1cm4gZW1wdHkgYXJyYXkgaWYgdW5kZWZpbmVkIG9yIG51bGwuICM2XG4gIGlmICggb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBpc0FycmF5TGlrZSA9IHR5cGVvZiBvYmogPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcic7XG4gIGlmICggaXNBcnJheUxpa2UgKSB7XG4gICAgLy8gY29udmVydCBub2RlTGlzdCB0byBhcnJheVxuICAgIHJldHVybiBhcnJheVNsaWNlLmNhbGwoIG9iaiApO1xuICB9XG5cbiAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gIHJldHVybiBbIG9iaiBdO1xufTtcblxuLy8gLS0tLS0gcmVtb3ZlRnJvbSAtLS0tLSAvL1xuXG51dGlscy5yZW1vdmVGcm9tID0gZnVuY3Rpb24oIGFyeSwgb2JqICkge1xuICB2YXIgaW5kZXggPSBhcnkuaW5kZXhPZiggb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UGFyZW50IC0tLS0tIC8vXG5cbnV0aWxzLmdldFBhcmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgd2hpbGUgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBjaGVjayB0aGF0IGVsZW0gaXMgYW4gYWN0dWFsIGVsZW1lbnRcbiAgICBpZiAoICEoIGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhZGQgZWxlbSBpZiBubyBzZWxlY3RvclxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgLy8gZmlsdGVyXG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICB9XG4gICAgLy8gZmluZCBjaGlsZHJlblxuICAgIHZhciBjaGlsZEVsZW1zID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApO1xuICAgIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gICAgZm9yICggdmFyIGk9MDsgaSA8IGNoaWxkRWxlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbaV0gKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmZkVsZW1zO1xufTtcblxuLy8gLS0tLS0gZGVib3VuY2VNZXRob2QgLS0tLS0gLy9cblxudXRpbHMuZGVib3VuY2VNZXRob2QgPSBmdW5jdGlvbiggX2NsYXNzLCBtZXRob2ROYW1lLCB0aHJlc2hvbGQgKSB7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAxMDA7XG4gIC8vIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgbWV0aG9kID0gX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdO1xuICB2YXIgdGltZW91dE5hbWUgPSBtZXRob2ROYW1lICsgJ1RpbWVvdXQnO1xuXG4gIF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgbWV0aG9kLmFwcGx5KCBfdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIF90aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCApO1xuICB9O1xufTtcblxuLy8gLS0tLS0gZG9jUmVhZHkgLS0tLS0gLy9cblxudXRpbHMuZG9jUmVhZHkgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gIHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgaWYgKCByZWFkeVN0YXRlID09ICdjb21wbGV0ZScgfHwgcmVhZHlTdGF0ZSA9PSAnaW50ZXJhY3RpdmUnICkge1xuICAgIC8vIGRvIGFzeW5jIHRvIGFsbG93IGZvciBvdGhlciBzY3JpcHRzIHRvIHJ1bi4gbWV0YWZpenp5L2ZsaWNraXR5IzQ0MVxuICAgIHNldFRpbWVvdXQoIGNhbGxiYWNrICk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYWxsYmFjayApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBodG1sSW5pdCAtLS0tLSAvL1xuXG4vLyBodHRwOi8vamFtZXNyb2JlcnRzLm5hbWUvYmxvZy8yMDEwLzAyLzIyL3N0cmluZy1mdW5jdGlvbnMtZm9yLWphdmFzY3JpcHQtdHJpbS10by1jYW1lbC1jYXNlLXRvLWRhc2hlZC1hbmQtdG8tdW5kZXJzY29yZS9cbnV0aWxzLnRvRGFzaGVkID0gZnVuY3Rpb24oIHN0ciApIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKCAvKC4pKFtBLVpdKS9nLCBmdW5jdGlvbiggbWF0Y2gsICQxLCAkMiApIHtcbiAgICByZXR1cm4gJDEgKyAnLScgKyAkMjtcbiAgfSkudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4vKipcbiAqIGFsbG93IHVzZXIgdG8gaW5pdGlhbGl6ZSBjbGFzc2VzIHZpYSBbZGF0YS1uYW1lc3BhY2VdIG9yIC5qcy1uYW1lc3BhY2UgY2xhc3NcbiAqIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4gKiBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb25zXG4gKi9cbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIHV0aWxzLmRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIHZhciBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2U7XG4gICAgdmFyIGRhdGFBdHRyRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnWycgKyBkYXRhQXR0ciArICddJyApO1xuICAgIHZhciBqc0Rhc2hFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtJyArIGRhc2hlZE5hbWVzcGFjZSApO1xuICAgIHZhciBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZGF0YUF0dHJFbGVtcyApXG4gICAgICAuY29uY2F0KCB1dGlscy5tYWtlQXJyYXkoIGpzRGFzaEVsZW1zICkgKTtcbiAgICB2YXIgZGF0YU9wdGlvbnNBdHRyID0gZGF0YUF0dHIgKyAnLW9wdGlvbnMnO1xuICAgIHZhciBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xuXG4gICAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhQXR0ciApIHx8XG4gICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhT3B0aW9uc0F0dHIgKTtcbiAgICAgIHZhciBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCAnRXJyb3IgcGFyc2luZyAnICsgZGF0YUF0dHIgKyAnIG9uICcgKyBlbGVtLmNsYXNzTmFtZSArXG4gICAgICAgICAgJzogJyArIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IFdpZGdldENsYXNzKCBlbGVtLCBvcHRpb25zICk7XG4gICAgICAvLyBtYWtlIGF2YWlsYWJsZSB2aWEgJCgpLmRhdGEoJ25hbWVzcGFjZScpXG4gICAgICBpZiAoIGpRdWVyeSApIHtcbiAgICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9KTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gdXRpbHM7XG5cbn0pKTtcbiIsIi8qIVxuICogZ2V0U2l6ZSB2Mi4wLjNcbiAqIG1lYXN1cmUgc2l6ZSBvZiBlbGVtZW50c1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKiBnbG9iYWxzIGNvbnNvbGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZ2V0U2l6ZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoZWxwZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdldCBhIG51bWJlciBmcm9tIGEgc3RyaW5nLCBub3QgYSBwZXJjZW50YWdlXG5mdW5jdGlvbiBnZXRTdHlsZVNpemUoIHZhbHVlICkge1xuICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgLy8gbm90IGEgcGVyY2VudCBsaWtlICcxMDAlJywgYW5kIGEgbnVtYmVyXG4gIHZhciBpc1ZhbGlkID0gdmFsdWUuaW5kZXhPZignJScpID09IC0xICYmICFpc05hTiggbnVtICk7XG4gIHJldHVybiBpc1ZhbGlkICYmIG51bTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09ICd1bmRlZmluZWQnID8gbm9vcCA6XG4gIGZ1bmN0aW9uKCBtZXNzYWdlICkge1xuICAgIGNvbnNvbGUuZXJyb3IoIG1lc3NhZ2UgKTtcbiAgfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWVhc3VyZW1lbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBtZWFzdXJlbWVudHMgPSBbXG4gICdwYWRkaW5nTGVmdCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ21hcmdpbkxlZnQnLFxuICAnbWFyZ2luUmlnaHQnLFxuICAnbWFyZ2luVG9wJyxcbiAgJ21hcmdpbkJvdHRvbScsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCdcbl07XG5cbnZhciBtZWFzdXJlbWVudHNMZW5ndGggPSBtZWFzdXJlbWVudHMubGVuZ3RoO1xuXG5mdW5jdGlvbiBnZXRaZXJvU2l6ZSgpIHtcbiAgdmFyIHNpemUgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGlubmVyV2lkdGg6IDAsXG4gICAgaW5uZXJIZWlnaHQ6IDAsXG4gICAgb3V0ZXJXaWR0aDogMCxcbiAgICBvdXRlckhlaWdodDogMFxuICB9O1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXRTdHlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldFN0eWxlLCBnZXQgc3R5bGUgb2YgZWxlbWVudCwgY2hlY2sgZm9yIEZpcmVmb3ggYnVnXG4gKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGUoIGVsZW0gKSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcbiAgaWYgKCAhc3R5bGUgKSB7XG4gICAgbG9nRXJyb3IoICdTdHlsZSByZXR1cm5lZCAnICsgc3R5bGUgK1xuICAgICAgJy4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gJyArXG4gICAgICAnU2VlIGh0dHBzOi8vYml0Lmx5L2dldHNpemVidWcxJyApO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGlzQm94U2l6ZU91dGVyO1xuXG4vKipcbiAqIHNldHVwXG4gKiBjaGVjayBpc0JveFNpemVyT3V0ZXJcbiAqIGRvIG9uIGZpcnN0IGdldFNpemUoKSByYXRoZXIgdGhhbiBvbiBwYWdlIGxvYWQgZm9yIEZpcmVmb3ggYnVnXG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAvLyBzZXR1cCBvbmNlXG4gIGlmICggaXNTZXR1cCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNTZXR1cCA9IHRydWU7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYm94IHNpemluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8qKlxuICAgKiBDaHJvbWUgJiBTYWZhcmkgbWVhc3VyZSB0aGUgb3V0ZXItd2lkdGggb24gc3R5bGUud2lkdGggb24gYm9yZGVyLWJveCBlbGVtc1xuICAgKiBJRTExICYgRmlyZWZveDwyOSBtZWFzdXJlcyB0aGUgaW5uZXItd2lkdGhcbiAgICovXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgZGl2LnN0eWxlLnBhZGRpbmcgPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgZGl2LnN0eWxlLmJvcmRlcldpZHRoID0gJzFweCAycHggM3B4IDRweCc7XG4gIGRpdi5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgYm9keS5hcHBlbmRDaGlsZCggZGl2ICk7XG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCBkaXYgKTtcbiAgLy8gcm91bmQgdmFsdWUgZm9yIGJyb3dzZXIgem9vbS4gZGVzYW5kcm8vbWFzb25yeSM5MjhcbiAgaXNCb3hTaXplT3V0ZXIgPSBNYXRoLnJvdW5kKCBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICkgKSA9PSAyMDA7XG4gIGdldFNpemUuaXNCb3hTaXplT3V0ZXIgPSBpc0JveFNpemVPdXRlcjtcblxuICBib2R5LnJlbW92ZUNoaWxkKCBkaXYgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U2l6ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBnZXRTaXplKCBlbGVtICkge1xuICBzZXR1cCgpO1xuXG4gIC8vIHVzZSBxdWVyeVNlbGV0b3IgaWYgZWxlbSBpcyBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG5cbiAgLy8gZG8gbm90IHByb2NlZWQgb24gbm9uLW9iamVjdHNcbiAgaWYgKCAhZWxlbSB8fCB0eXBlb2YgZWxlbSAhPSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZWxlbSApO1xuXG4gIC8vIGlmIGhpZGRlbiwgZXZlcnl0aGluZyBpcyAwXG4gIGlmICggc3R5bGUuZGlzcGxheSA9PSAnbm9uZScgKSB7XG4gICAgcmV0dXJuIGdldFplcm9TaXplKCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHt9O1xuICBzaXplLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgc2l6ZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodDtcblxuICB2YXIgaXNCb3JkZXJCb3ggPSBzaXplLmlzQm9yZGVyQm94ID0gc3R5bGUuYm94U2l6aW5nID09ICdib3JkZXItYm94JztcblxuICAvLyBnZXQgYWxsIG1lYXN1cmVtZW50c1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlWyBtZWFzdXJlbWVudCBdO1xuICAgIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAgIC8vIGFueSAnYXV0bycsICdtZWRpdW0nIHZhbHVlIHdpbGwgYmUgMFxuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAhaXNOYU4oIG51bSApID8gbnVtIDogMDtcbiAgfVxuXG4gIHZhciBwYWRkaW5nV2lkdGggPSBzaXplLnBhZGRpbmdMZWZ0ICsgc2l6ZS5wYWRkaW5nUmlnaHQ7XG4gIHZhciBwYWRkaW5nSGVpZ2h0ID0gc2l6ZS5wYWRkaW5nVG9wICsgc2l6ZS5wYWRkaW5nQm90dG9tO1xuICB2YXIgbWFyZ2luV2lkdGggPSBzaXplLm1hcmdpbkxlZnQgKyBzaXplLm1hcmdpblJpZ2h0O1xuICB2YXIgbWFyZ2luSGVpZ2h0ID0gc2l6ZS5tYXJnaW5Ub3AgKyBzaXplLm1hcmdpbkJvdHRvbTtcbiAgdmFyIGJvcmRlcldpZHRoID0gc2l6ZS5ib3JkZXJMZWZ0V2lkdGggKyBzaXplLmJvcmRlclJpZ2h0V2lkdGg7XG4gIHZhciBib3JkZXJIZWlnaHQgPSBzaXplLmJvcmRlclRvcFdpZHRoICsgc2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcblxuICB2YXIgaXNCb3JkZXJCb3hTaXplT3V0ZXIgPSBpc0JvcmRlckJveCAmJiBpc0JveFNpemVPdXRlcjtcblxuICAvLyBvdmVyd3JpdGUgd2lkdGggYW5kIGhlaWdodCBpZiB3ZSBjYW4gZ2V0IGl0IGZyb20gc3R5bGVcbiAgdmFyIHN0eWxlV2lkdGggPSBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICk7XG4gIGlmICggc3R5bGVXaWR0aCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS53aWR0aCA9IHN0eWxlV2lkdGggK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICB9XG5cbiAgdmFyIHN0eWxlSGVpZ2h0ID0gZ2V0U3R5bGVTaXplKCBzdHlsZS5oZWlnaHQgKTtcbiAgaWYgKCBzdHlsZUhlaWdodCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS5oZWlnaHQgPSBzdHlsZUhlaWdodCArXG4gICAgICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHVubGVzcyBpdCdzIGFscmVhZHkgaW5jbHVkaW5nIGl0XG4gICAgICAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcbiAgfVxuXG4gIHNpemUuaW5uZXJXaWR0aCA9IHNpemUud2lkdGggLSAoIHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gIHNpemUuaW5uZXJIZWlnaHQgPSBzaXplLmhlaWdodCAtICggcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuXG4gIHNpemUub3V0ZXJXaWR0aCA9IHNpemUud2lkdGggKyBtYXJnaW5XaWR0aDtcbiAgc2l6ZS5vdXRlckhlaWdodCA9IHNpemUuaGVpZ2h0ICsgbWFyZ2luSGVpZ2h0O1xuXG4gIHJldHVybiBzaXplO1xufVxuXG5yZXR1cm4gZ2V0U2l6ZTtcblxufSk7XG4iLCIvKiFcbiAqIE1hc29ucnkgdjQuMi4yXG4gKiBDYXNjYWRpbmcgZ3JpZCBsYXlvdXQgbGlicmFyeVxuICogaHR0cHM6Ly9tYXNvbnJ5LmRlc2FuZHJvLmNvbVxuICogTUlUIExpY2Vuc2VcbiAqIGJ5IERhdmlkIERlU2FuZHJvXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAgICdvdXRsYXllci9vdXRsYXllcicsXG4gICAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZSdcbiAgICAgIF0sXG4gICAgICBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCdvdXRsYXllcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuTWFzb25yeSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3cuT3V0bGF5ZXIsXG4gICAgICB3aW5kb3cuZ2V0U2l6ZVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBPdXRsYXllciwgZ2V0U2l6ZSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtYXNvbnJ5RGVmaW5pdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8vIGNyZWF0ZSBhbiBPdXRsYXllciBsYXlvdXQgY2xhc3NcbiAgdmFyIE1hc29ucnkgPSBPdXRsYXllci5jcmVhdGUoJ21hc29ucnknKTtcbiAgLy8gaXNGaXRXaWR0aCAtPiBmaXRXaWR0aFxuICBNYXNvbnJ5LmNvbXBhdE9wdGlvbnMuZml0V2lkdGggPSAnaXNGaXRXaWR0aCc7XG5cbiAgdmFyIHByb3RvID0gTWFzb25yeS5wcm90b3R5cGU7XG5cbiAgcHJvdG8uX3Jlc2V0TGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5nZXRTaXplKCk7XG4gICAgdGhpcy5fZ2V0TWVhc3VyZW1lbnQoICdjb2x1bW5XaWR0aCcsICdvdXRlcldpZHRoJyApO1xuICAgIHRoaXMuX2dldE1lYXN1cmVtZW50KCAnZ3V0dGVyJywgJ291dGVyV2lkdGgnICk7XG4gICAgdGhpcy5tZWFzdXJlQ29sdW1ucygpO1xuXG4gICAgLy8gcmVzZXQgY29sdW1uIFlcbiAgICB0aGlzLmNvbFlzID0gW107XG4gICAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuY29sczsgaSsrICkge1xuICAgICAgdGhpcy5jb2xZcy5wdXNoKCAwICk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXhZID0gMDtcbiAgICB0aGlzLmhvcml6b250YWxDb2xJbmRleCA9IDA7XG4gIH07XG5cbiAgcHJvdG8ubWVhc3VyZUNvbHVtbnMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldENvbnRhaW5lcldpZHRoKCk7XG4gICAgLy8gaWYgY29sdW1uV2lkdGggaXMgMCwgZGVmYXVsdCB0byBvdXRlcldpZHRoIG9mIGZpcnN0IGl0ZW1cbiAgICBpZiAoICF0aGlzLmNvbHVtbldpZHRoICkge1xuICAgICAgdmFyIGZpcnN0SXRlbSA9IHRoaXMuaXRlbXNbMF07XG4gICAgICB2YXIgZmlyc3RJdGVtRWxlbSA9IGZpcnN0SXRlbSAmJiBmaXJzdEl0ZW0uZWxlbWVudDtcbiAgICAgIC8vIGNvbHVtbldpZHRoIGZhbGwgYmFjayB0byBpdGVtIG9mIGZpcnN0IGVsZW1lbnRcbiAgICAgIHRoaXMuY29sdW1uV2lkdGggPSBmaXJzdEl0ZW1FbGVtICYmIGdldFNpemUoIGZpcnN0SXRlbUVsZW0gKS5vdXRlcldpZHRoIHx8XG4gICAgICAgIC8vIGlmIGZpcnN0IGVsZW0gaGFzIG5vIHdpZHRoLCBkZWZhdWx0IHRvIHNpemUgb2YgY29udGFpbmVyXG4gICAgICAgIHRoaXMuY29udGFpbmVyV2lkdGg7XG4gICAgfVxuXG4gICAgdmFyIGNvbHVtbldpZHRoID0gdGhpcy5jb2x1bW5XaWR0aCArPSB0aGlzLmd1dHRlcjtcblxuICAgIC8vIGNhbGN1bGF0ZSBjb2x1bW5zXG4gICAgdmFyIGNvbnRhaW5lcldpZHRoID0gdGhpcy5jb250YWluZXJXaWR0aCArIHRoaXMuZ3V0dGVyO1xuICAgIHZhciBjb2xzID0gY29udGFpbmVyV2lkdGggLyBjb2x1bW5XaWR0aDtcbiAgICAvLyBmaXggcm91bmRpbmcgZXJyb3JzLCB0eXBpY2FsbHkgd2l0aCBndXR0ZXJzXG4gICAgdmFyIGV4Y2VzcyA9IGNvbHVtbldpZHRoIC0gY29udGFpbmVyV2lkdGggJSBjb2x1bW5XaWR0aDtcbiAgICAvLyBpZiBvdmVyc2hvb3QgaXMgbGVzcyB0aGFuIGEgcGl4ZWwsIHJvdW5kIHVwLCBvdGhlcndpc2UgZmxvb3IgaXRcbiAgICB2YXIgbWF0aE1ldGhvZCA9IGV4Y2VzcyAmJiBleGNlc3MgPCAxID8gJ3JvdW5kJyA6ICdmbG9vcic7XG4gICAgY29scyA9IE1hdGhbIG1hdGhNZXRob2QgXSggY29scyApO1xuICAgIHRoaXMuY29scyA9IE1hdGgubWF4KCBjb2xzLCAxICk7XG4gIH07XG5cbiAgcHJvdG8uZ2V0Q29udGFpbmVyV2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAvLyBjb250YWluZXIgaXMgcGFyZW50IGlmIGZpdCB3aWR0aFxuICAgIHZhciBpc0ZpdFdpZHRoID0gdGhpcy5fZ2V0T3B0aW9uKCdmaXRXaWR0aCcpO1xuICAgIHZhciBjb250YWluZXIgPSBpc0ZpdFdpZHRoID8gdGhpcy5lbGVtZW50LnBhcmVudE5vZGUgOiB0aGlzLmVsZW1lbnQ7XG4gICAgLy8gY2hlY2sgdGhhdCB0aGlzLnNpemUgYW5kIHNpemUgYXJlIHRoZXJlXG4gICAgLy8gSUU4IHRyaWdnZXJzIHJlc2l6ZSBvbiBib2R5IHNpemUgY2hhbmdlLCBzbyB0aGV5IG1pZ2h0IG5vdCBiZVxuICAgIHZhciBzaXplID0gZ2V0U2l6ZSggY29udGFpbmVyICk7XG4gICAgdGhpcy5jb250YWluZXJXaWR0aCA9IHNpemUgJiYgc2l6ZS5pbm5lcldpZHRoO1xuICB9O1xuXG4gIHByb3RvLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24gPSBmdW5jdGlvbiggaXRlbSApIHtcbiAgICBpdGVtLmdldFNpemUoKTtcbiAgICAvLyBob3cgbWFueSBjb2x1bW5zIGRvZXMgdGhpcyBicmljayBzcGFuXG4gICAgdmFyIHJlbWFpbmRlciA9IGl0ZW0uc2l6ZS5vdXRlcldpZHRoICUgdGhpcy5jb2x1bW5XaWR0aDtcbiAgICB2YXIgbWF0aE1ldGhvZCA9IHJlbWFpbmRlciAmJiByZW1haW5kZXIgPCAxID8gJ3JvdW5kJyA6ICdjZWlsJztcbiAgICAvLyByb3VuZCBpZiBvZmYgYnkgMSBwaXhlbCwgb3RoZXJ3aXNlIHVzZSBjZWlsXG4gICAgdmFyIGNvbFNwYW4gPSBNYXRoWyBtYXRoTWV0aG9kIF0oIGl0ZW0uc2l6ZS5vdXRlcldpZHRoIC8gdGhpcy5jb2x1bW5XaWR0aCApO1xuICAgIGNvbFNwYW4gPSBNYXRoLm1pbiggY29sU3BhbiwgdGhpcy5jb2xzICk7XG4gICAgLy8gdXNlIGhvcml6b250YWwgb3IgdG9wIGNvbHVtbiBwb3NpdGlvblxuICAgIHZhciBjb2xQb3NNZXRob2QgPSB0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbE9yZGVyID9cbiAgICAgICdfZ2V0SG9yaXpvbnRhbENvbFBvc2l0aW9uJyA6ICdfZ2V0VG9wQ29sUG9zaXRpb24nO1xuICAgIHZhciBjb2xQb3NpdGlvbiA9IHRoaXNbIGNvbFBvc01ldGhvZCBdKCBjb2xTcGFuLCBpdGVtICk7XG4gICAgLy8gcG9zaXRpb24gdGhlIGJyaWNrXG4gICAgdmFyIHBvc2l0aW9uID0ge1xuICAgICAgeDogdGhpcy5jb2x1bW5XaWR0aCAqIGNvbFBvc2l0aW9uLmNvbCxcbiAgICAgIHk6IGNvbFBvc2l0aW9uLnlcbiAgICB9O1xuICAgIC8vIGFwcGx5IHNldEhlaWdodCB0byBuZWNlc3NhcnkgY29sdW1uc1xuICAgIHZhciBzZXRIZWlnaHQgPSBjb2xQb3NpdGlvbi55ICsgaXRlbS5zaXplLm91dGVySGVpZ2h0O1xuICAgIHZhciBzZXRNYXggPSBjb2xTcGFuICsgY29sUG9zaXRpb24uY29sO1xuICAgIGZvciAoIHZhciBpID0gY29sUG9zaXRpb24uY29sOyBpIDwgc2V0TWF4OyBpKysgKSB7XG4gICAgICB0aGlzLmNvbFlzW2ldID0gc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfTtcblxuICBwcm90by5fZ2V0VG9wQ29sUG9zaXRpb24gPSBmdW5jdGlvbiggY29sU3BhbiApIHtcbiAgICB2YXIgY29sR3JvdXAgPSB0aGlzLl9nZXRUb3BDb2xHcm91cCggY29sU3BhbiApO1xuICAgIC8vIGdldCB0aGUgbWluaW11bSBZIHZhbHVlIGZyb20gdGhlIGNvbHVtbnNcbiAgICB2YXIgbWluaW11bVkgPSBNYXRoLm1pbi5hcHBseSggTWF0aCwgY29sR3JvdXAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb2w6IGNvbEdyb3VwLmluZGV4T2YoIG1pbmltdW1ZICksXG4gICAgICB5OiBtaW5pbXVtWSxcbiAgICB9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge051bWJlcn0gY29sU3BhbiAtIG51bWJlciBvZiBjb2x1bW5zIHRoZSBlbGVtZW50IHNwYW5zXG4gICAqIEByZXR1cm5zIHtBcnJheX0gY29sR3JvdXBcbiAgICovXG4gIHByb3RvLl9nZXRUb3BDb2xHcm91cCA9IGZ1bmN0aW9uKCBjb2xTcGFuICkge1xuICAgIGlmICggY29sU3BhbiA8IDIgKSB7XG4gICAgICAvLyBpZiBicmljayBzcGFucyBvbmx5IG9uZSBjb2x1bW4sIHVzZSBhbGwgdGhlIGNvbHVtbiBZc1xuICAgICAgcmV0dXJuIHRoaXMuY29sWXM7XG4gICAgfVxuXG4gICAgdmFyIGNvbEdyb3VwID0gW107XG4gICAgLy8gaG93IG1hbnkgZGlmZmVyZW50IHBsYWNlcyBjb3VsZCB0aGlzIGJyaWNrIGZpdCBob3Jpem9udGFsbHlcbiAgICB2YXIgZ3JvdXBDb3VudCA9IHRoaXMuY29scyArIDEgLSBjb2xTcGFuO1xuICAgIC8vIGZvciBlYWNoIGdyb3VwIHBvdGVudGlhbCBob3Jpem9udGFsIHBvc2l0aW9uXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgZ3JvdXBDb3VudDsgaSsrICkge1xuICAgICAgY29sR3JvdXBbaV0gPSB0aGlzLl9nZXRDb2xHcm91cFkoIGksIGNvbFNwYW4gKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbEdyb3VwO1xuICB9O1xuXG4gIHByb3RvLl9nZXRDb2xHcm91cFkgPSBmdW5jdGlvbiggY29sLCBjb2xTcGFuICkge1xuICAgIGlmICggY29sU3BhbiA8IDIgKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xZc1sgY29sIF07XG4gICAgfVxuICAgIC8vIG1ha2UgYW4gYXJyYXkgb2YgY29sWSB2YWx1ZXMgZm9yIHRoYXQgb25lIGdyb3VwXG4gICAgdmFyIGdyb3VwQ29sWXMgPSB0aGlzLmNvbFlzLnNsaWNlKCBjb2wsIGNvbCArIGNvbFNwYW4gKTtcbiAgICAvLyBhbmQgZ2V0IHRoZSBtYXggdmFsdWUgb2YgdGhlIGFycmF5XG4gICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KCBNYXRoLCBncm91cENvbFlzICk7XG4gIH07XG5cbiAgLy8gZ2V0IGNvbHVtbiBwb3NpdGlvbiBiYXNlZCBvbiBob3Jpem9udGFsIGluZGV4LiAjODczXG4gIHByb3RvLl9nZXRIb3Jpem9udGFsQ29sUG9zaXRpb24gPSBmdW5jdGlvbiggY29sU3BhbiwgaXRlbSApIHtcbiAgICB2YXIgY29sID0gdGhpcy5ob3Jpem9udGFsQ29sSW5kZXggJSB0aGlzLmNvbHM7XG4gICAgdmFyIGlzT3ZlciA9IGNvbFNwYW4gPiAxICYmIGNvbCArIGNvbFNwYW4gPiB0aGlzLmNvbHM7XG4gICAgLy8gc2hpZnQgdG8gbmV4dCByb3cgaWYgaXRlbSBjYW4ndCBmaXQgb24gY3VycmVudCByb3dcbiAgICBjb2wgPSBpc092ZXIgPyAwIDogY29sO1xuICAgIC8vIGRvbid0IGxldCB6ZXJvLXNpemUgaXRlbXMgdGFrZSB1cCBzcGFjZVxuICAgIHZhciBoYXNTaXplID0gaXRlbS5zaXplLm91dGVyV2lkdGggJiYgaXRlbS5zaXplLm91dGVySGVpZ2h0O1xuICAgIHRoaXMuaG9yaXpvbnRhbENvbEluZGV4ID0gaGFzU2l6ZSA/IGNvbCArIGNvbFNwYW4gOiB0aGlzLmhvcml6b250YWxDb2xJbmRleDtcblxuICAgIHJldHVybiB7XG4gICAgICBjb2w6IGNvbCxcbiAgICAgIHk6IHRoaXMuX2dldENvbEdyb3VwWSggY29sLCBjb2xTcGFuICksXG4gICAgfTtcbiAgfTtcblxuICBwcm90by5fbWFuYWdlU3RhbXAgPSBmdW5jdGlvbiggc3RhbXAgKSB7XG4gICAgdmFyIHN0YW1wU2l6ZSA9IGdldFNpemUoIHN0YW1wICk7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMuX2dldEVsZW1lbnRPZmZzZXQoIHN0YW1wICk7XG4gICAgLy8gZ2V0IHRoZSBjb2x1bW5zIHRoYXQgdGhpcyBzdGFtcCBhZmZlY3RzXG4gICAgdmFyIGlzT3JpZ2luTGVmdCA9IHRoaXMuX2dldE9wdGlvbignb3JpZ2luTGVmdCcpO1xuICAgIHZhciBmaXJzdFggPSBpc09yaWdpbkxlZnQgPyBvZmZzZXQubGVmdCA6IG9mZnNldC5yaWdodDtcbiAgICB2YXIgbGFzdFggPSBmaXJzdFggKyBzdGFtcFNpemUub3V0ZXJXaWR0aDtcbiAgICB2YXIgZmlyc3RDb2wgPSBNYXRoLmZsb29yKCBmaXJzdFggLyB0aGlzLmNvbHVtbldpZHRoICk7XG4gICAgZmlyc3RDb2wgPSBNYXRoLm1heCggMCwgZmlyc3RDb2wgKTtcbiAgICB2YXIgbGFzdENvbCA9IE1hdGguZmxvb3IoIGxhc3RYIC8gdGhpcy5jb2x1bW5XaWR0aCApO1xuICAgIC8vIGxhc3RDb2wgc2hvdWxkIG5vdCBnbyBvdmVyIGlmIG11bHRpcGxlIG9mIGNvbHVtbldpZHRoICM0MjVcbiAgICBsYXN0Q29sIC09IGxhc3RYICUgdGhpcy5jb2x1bW5XaWR0aCA/IDAgOiAxO1xuICAgIGxhc3RDb2wgPSBNYXRoLm1pbiggdGhpcy5jb2xzIC0gMSwgbGFzdENvbCApO1xuICAgIC8vIHNldCBjb2xZcyB0byBib3R0b20gb2YgdGhlIHN0YW1wXG5cbiAgICB2YXIgaXNPcmlnaW5Ub3AgPSB0aGlzLl9nZXRPcHRpb24oJ29yaWdpblRvcCcpO1xuICAgIHZhciBzdGFtcE1heFkgPSAoIGlzT3JpZ2luVG9wID8gb2Zmc2V0LnRvcCA6IG9mZnNldC5ib3R0b20gKSArXG4gICAgICBzdGFtcFNpemUub3V0ZXJIZWlnaHQ7XG4gICAgZm9yICggdmFyIGkgPSBmaXJzdENvbDsgaSA8PSBsYXN0Q29sOyBpKysgKSB7XG4gICAgICB0aGlzLmNvbFlzW2ldID0gTWF0aC5tYXgoIHN0YW1wTWF4WSwgdGhpcy5jb2xZc1tpXSApO1xuICAgIH1cbiAgfTtcblxuICBwcm90by5fZ2V0Q29udGFpbmVyU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubWF4WSA9IE1hdGgubWF4LmFwcGx5KCBNYXRoLCB0aGlzLmNvbFlzICk7XG4gICAgdmFyIHNpemUgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMubWF4WVxuICAgIH07XG5cbiAgICBpZiAoIHRoaXMuX2dldE9wdGlvbignZml0V2lkdGgnKSApIHtcbiAgICAgIHNpemUud2lkdGggPSB0aGlzLl9nZXRDb250YWluZXJGaXRXaWR0aCgpO1xuICAgIH1cblxuICAgIHJldHVybiBzaXplO1xuICB9O1xuXG4gIHByb3RvLl9nZXRDb250YWluZXJGaXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1bnVzZWRDb2xzID0gMDtcbiAgICAvLyBjb3VudCB1bnVzZWQgY29sdW1uc1xuICAgIHZhciBpID0gdGhpcy5jb2xzO1xuICAgIHdoaWxlICggLS1pICkge1xuICAgICAgaWYgKCB0aGlzLmNvbFlzW2ldICE9PSAwICkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHVudXNlZENvbHMrKztcbiAgICB9XG4gICAgLy8gZml0IGNvbnRhaW5lciB0byBjb2x1bW5zIHRoYXQgaGF2ZSBiZWVuIHVzZWRcbiAgICByZXR1cm4gKCB0aGlzLmNvbHMgLSB1bnVzZWRDb2xzICkgKiB0aGlzLmNvbHVtbldpZHRoIC0gdGhpcy5ndXR0ZXI7XG4gIH07XG5cbiAgcHJvdG8ubmVlZHNSZXNpemVMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJldmlvdXNXaWR0aCA9IHRoaXMuY29udGFpbmVyV2lkdGg7XG4gICAgdGhpcy5nZXRDb250YWluZXJXaWR0aCgpO1xuICAgIHJldHVybiBwcmV2aW91c1dpZHRoICE9IHRoaXMuY29udGFpbmVyV2lkdGg7XG4gIH07XG5cbiAgcmV0dXJuIE1hc29ucnk7XG5cbn0pKTtcbiIsIi8qKlxuICogT3V0bGF5ZXIgSXRlbVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZSdcbiAgICAgIF0sXG4gICAgICBmYWN0b3J5XG4gICAgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5PdXRsYXllciA9IHt9O1xuICAgIHdpbmRvdy5PdXRsYXllci5JdGVtID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXIsXG4gICAgICB3aW5kb3cuZ2V0U2l6ZVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBFdkVtaXR0ZXIsIGdldFNpemUgKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tIGhlbHBlcnMgLS0tLS0gLy9cblxuZnVuY3Rpb24gaXNFbXB0eU9iaiggb2JqICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBvYmogKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHByb3AgPSBudWxsO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ1NTMyBzdXBwb3J0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cblxudmFyIGRvY0VsZW1TdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxudmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IHR5cGVvZiBkb2NFbGVtU3R5bGUudHJhbnNpdGlvbiA9PSAnc3RyaW5nJyA/XG4gICd0cmFuc2l0aW9uJyA6ICdXZWJraXRUcmFuc2l0aW9uJztcbnZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IHR5cGVvZiBkb2NFbGVtU3R5bGUudHJhbnNmb3JtID09ICdzdHJpbmcnID9cbiAgJ3RyYW5zZm9ybScgOiAnV2Via2l0VHJhbnNmb3JtJztcblxudmFyIHRyYW5zaXRpb25FbmRFdmVudCA9IHtcbiAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCdcbn1bIHRyYW5zaXRpb25Qcm9wZXJ0eSBdO1xuXG4vLyBjYWNoZSBhbGwgdmVuZG9yIHByb3BlcnRpZXMgdGhhdCBjb3VsZCBoYXZlIHZlbmRvciBwcmVmaXhcbnZhciB2ZW5kb3JQcm9wZXJ0aWVzID0ge1xuICB0cmFuc2Zvcm06IHRyYW5zZm9ybVByb3BlcnR5LFxuICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uUHJvcGVydHksXG4gIHRyYW5zaXRpb25EdXJhdGlvbjogdHJhbnNpdGlvblByb3BlcnR5ICsgJ0R1cmF0aW9uJyxcbiAgdHJhbnNpdGlvblByb3BlcnR5OiB0cmFuc2l0aW9uUHJvcGVydHkgKyAnUHJvcGVydHknLFxuICB0cmFuc2l0aW9uRGVsYXk6IHRyYW5zaXRpb25Qcm9wZXJ0eSArICdEZWxheSdcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW0gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gSXRlbSggZWxlbWVudCwgbGF5b3V0ICkge1xuICBpZiAoICFlbGVtZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIC8vIHBhcmVudCBsYXlvdXQgY2xhc3MsIGkuZS4gTWFzb25yeSwgSXNvdG9wZSwgb3IgUGFja2VyeVxuICB0aGlzLmxheW91dCA9IGxheW91dDtcbiAgdGhpcy5wb3NpdGlvbiA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuLy8gaW5oZXJpdCBFdkVtaXR0ZXJcbnZhciBwcm90byA9IEl0ZW0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xucHJvdG8uY29uc3RydWN0b3IgPSBJdGVtO1xuXG5wcm90by5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHRyYW5zaXRpb24gb2JqZWN0c1xuICB0aGlzLl90cmFuc24gPSB7XG4gICAgaW5nUHJvcGVydGllczoge30sXG4gICAgY2xlYW46IHt9LFxuICAgIG9uRW5kOiB7fVxuICB9O1xuXG4gIHRoaXMuY3NzKHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICB9KTtcbn07XG5cbi8vIHRyaWdnZXIgc3BlY2lmaWVkIGhhbmRsZXIgZm9yIGV2ZW50IHR5cGVcbnByb3RvLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG4vKipcbiAqIGFwcGx5IENTUyBzdHlsZXMgdG8gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKi9cbnByb3RvLmNzcyA9IGZ1bmN0aW9uKCBzdHlsZSApIHtcbiAgdmFyIGVsZW1TdHlsZSA9IHRoaXMuZWxlbWVudC5zdHlsZTtcblxuICBmb3IgKCB2YXIgcHJvcCBpbiBzdHlsZSApIHtcbiAgICAvLyB1c2UgdmVuZG9yIHByb3BlcnR5IGlmIGF2YWlsYWJsZVxuICAgIHZhciBzdXBwb3J0ZWRQcm9wID0gdmVuZG9yUHJvcGVydGllc1sgcHJvcCBdIHx8IHByb3A7XG4gICAgZWxlbVN0eWxlWyBzdXBwb3J0ZWRQcm9wIF0gPSBzdHlsZVsgcHJvcCBdO1xuICB9XG59O1xuXG4gLy8gbWVhc3VyZSBwb3NpdGlvbiwgYW5kIHNldHMgaXRcbnByb3RvLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoIHRoaXMuZWxlbWVudCApO1xuICB2YXIgaXNPcmlnaW5MZWZ0ID0gdGhpcy5sYXlvdXQuX2dldE9wdGlvbignb3JpZ2luTGVmdCcpO1xuICB2YXIgaXNPcmlnaW5Ub3AgPSB0aGlzLmxheW91dC5fZ2V0T3B0aW9uKCdvcmlnaW5Ub3AnKTtcbiAgdmFyIHhWYWx1ZSA9IHN0eWxlWyBpc09yaWdpbkxlZnQgPyAnbGVmdCcgOiAncmlnaHQnIF07XG4gIHZhciB5VmFsdWUgPSBzdHlsZVsgaXNPcmlnaW5Ub3AgPyAndG9wJyA6ICdib3R0b20nIF07XG4gIHZhciB4ID0gcGFyc2VGbG9hdCggeFZhbHVlICk7XG4gIHZhciB5ID0gcGFyc2VGbG9hdCggeVZhbHVlICk7XG4gIC8vIGNvbnZlcnQgcGVyY2VudCB0byBwaXhlbHNcbiAgdmFyIGxheW91dFNpemUgPSB0aGlzLmxheW91dC5zaXplO1xuICBpZiAoIHhWYWx1ZS5pbmRleE9mKCclJykgIT0gLTEgKSB7XG4gICAgeCA9ICggeCAvIDEwMCApICogbGF5b3V0U2l6ZS53aWR0aDtcbiAgfVxuICBpZiAoIHlWYWx1ZS5pbmRleE9mKCclJykgIT0gLTEgKSB7XG4gICAgeSA9ICggeSAvIDEwMCApICogbGF5b3V0U2l6ZS5oZWlnaHQ7XG4gIH1cbiAgLy8gY2xlYW4gdXAgJ2F1dG8nIG9yIG90aGVyIG5vbi1pbnRlZ2VyIHZhbHVlc1xuICB4ID0gaXNOYU4oIHggKSA/IDAgOiB4O1xuICB5ID0gaXNOYU4oIHkgKSA/IDAgOiB5O1xuICAvLyByZW1vdmUgcGFkZGluZyBmcm9tIG1lYXN1cmVtZW50XG4gIHggLT0gaXNPcmlnaW5MZWZ0ID8gbGF5b3V0U2l6ZS5wYWRkaW5nTGVmdCA6IGxheW91dFNpemUucGFkZGluZ1JpZ2h0O1xuICB5IC09IGlzT3JpZ2luVG9wID8gbGF5b3V0U2l6ZS5wYWRkaW5nVG9wIDogbGF5b3V0U2l6ZS5wYWRkaW5nQm90dG9tO1xuXG4gIHRoaXMucG9zaXRpb24ueCA9IHg7XG4gIHRoaXMucG9zaXRpb24ueSA9IHk7XG59O1xuXG4vLyBzZXQgc2V0dGxlZCBwb3NpdGlvbiwgYXBwbHkgcGFkZGluZ1xucHJvdG8ubGF5b3V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxheW91dFNpemUgPSB0aGlzLmxheW91dC5zaXplO1xuICB2YXIgc3R5bGUgPSB7fTtcbiAgdmFyIGlzT3JpZ2luTGVmdCA9IHRoaXMubGF5b3V0Ll9nZXRPcHRpb24oJ29yaWdpbkxlZnQnKTtcbiAgdmFyIGlzT3JpZ2luVG9wID0gdGhpcy5sYXlvdXQuX2dldE9wdGlvbignb3JpZ2luVG9wJyk7XG5cbiAgLy8geFxuICB2YXIgeFBhZGRpbmcgPSBpc09yaWdpbkxlZnQgPyAncGFkZGluZ0xlZnQnIDogJ3BhZGRpbmdSaWdodCc7XG4gIHZhciB4UHJvcGVydHkgPSBpc09yaWdpbkxlZnQgPyAnbGVmdCcgOiAncmlnaHQnO1xuICB2YXIgeFJlc2V0UHJvcGVydHkgPSBpc09yaWdpbkxlZnQgPyAncmlnaHQnIDogJ2xlZnQnO1xuXG4gIHZhciB4ID0gdGhpcy5wb3NpdGlvbi54ICsgbGF5b3V0U2l6ZVsgeFBhZGRpbmcgXTtcbiAgLy8gc2V0IGluIHBlcmNlbnRhZ2Ugb3IgcGl4ZWxzXG4gIHN0eWxlWyB4UHJvcGVydHkgXSA9IHRoaXMuZ2V0WFZhbHVlKCB4ICk7XG4gIC8vIHJlc2V0IG90aGVyIHByb3BlcnR5XG4gIHN0eWxlWyB4UmVzZXRQcm9wZXJ0eSBdID0gJyc7XG5cbiAgLy8geVxuICB2YXIgeVBhZGRpbmcgPSBpc09yaWdpblRvcCA/ICdwYWRkaW5nVG9wJyA6ICdwYWRkaW5nQm90dG9tJztcbiAgdmFyIHlQcm9wZXJ0eSA9IGlzT3JpZ2luVG9wID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgdmFyIHlSZXNldFByb3BlcnR5ID0gaXNPcmlnaW5Ub3AgPyAnYm90dG9tJyA6ICd0b3AnO1xuXG4gIHZhciB5ID0gdGhpcy5wb3NpdGlvbi55ICsgbGF5b3V0U2l6ZVsgeVBhZGRpbmcgXTtcbiAgLy8gc2V0IGluIHBlcmNlbnRhZ2Ugb3IgcGl4ZWxzXG4gIHN0eWxlWyB5UHJvcGVydHkgXSA9IHRoaXMuZ2V0WVZhbHVlKCB5ICk7XG4gIC8vIHJlc2V0IG90aGVyIHByb3BlcnR5XG4gIHN0eWxlWyB5UmVzZXRQcm9wZXJ0eSBdID0gJyc7XG5cbiAgdGhpcy5jc3MoIHN0eWxlICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAnbGF5b3V0JywgWyB0aGlzIF0gKTtcbn07XG5cbnByb3RvLmdldFhWYWx1ZSA9IGZ1bmN0aW9uKCB4ICkge1xuICB2YXIgaXNIb3Jpem9udGFsID0gdGhpcy5sYXlvdXQuX2dldE9wdGlvbignaG9yaXpvbnRhbCcpO1xuICByZXR1cm4gdGhpcy5sYXlvdXQub3B0aW9ucy5wZXJjZW50UG9zaXRpb24gJiYgIWlzSG9yaXpvbnRhbCA/XG4gICAgKCAoIHggLyB0aGlzLmxheW91dC5zaXplLndpZHRoICkgKiAxMDAgKSArICclJyA6IHggKyAncHgnO1xufTtcblxucHJvdG8uZ2V0WVZhbHVlID0gZnVuY3Rpb24oIHkgKSB7XG4gIHZhciBpc0hvcml6b250YWwgPSB0aGlzLmxheW91dC5fZ2V0T3B0aW9uKCdob3Jpem9udGFsJyk7XG4gIHJldHVybiB0aGlzLmxheW91dC5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiAmJiBpc0hvcml6b250YWwgP1xuICAgICggKCB5IC8gdGhpcy5sYXlvdXQuc2l6ZS5oZWlnaHQgKSAqIDEwMCApICsgJyUnIDogeSArICdweCc7XG59O1xuXG5wcm90by5fdHJhbnNpdGlvblRvID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgLy8gZ2V0IGN1cnJlbnQgeCAmIHkgZnJvbSB0b3AvbGVmdFxuICB2YXIgY3VyWCA9IHRoaXMucG9zaXRpb24ueDtcbiAgdmFyIGN1clkgPSB0aGlzLnBvc2l0aW9uLnk7XG5cbiAgdmFyIGRpZE5vdE1vdmUgPSB4ID09IHRoaXMucG9zaXRpb24ueCAmJiB5ID09IHRoaXMucG9zaXRpb24ueTtcblxuICAvLyBzYXZlIGVuZCBwb3NpdGlvblxuICB0aGlzLnNldFBvc2l0aW9uKCB4LCB5ICk7XG5cbiAgLy8gaWYgZGlkIG5vdCBtb3ZlIGFuZCBub3QgdHJhbnNpdGlvbmluZywganVzdCBnbyB0byBsYXlvdXRcbiAgaWYgKCBkaWROb3RNb3ZlICYmICF0aGlzLmlzVHJhbnNpdGlvbmluZyApIHtcbiAgICB0aGlzLmxheW91dFBvc2l0aW9uKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRyYW5zWCA9IHggLSBjdXJYO1xuICB2YXIgdHJhbnNZID0geSAtIGN1clk7XG4gIHZhciB0cmFuc2l0aW9uU3R5bGUgPSB7fTtcbiAgdHJhbnNpdGlvblN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuZ2V0VHJhbnNsYXRlKCB0cmFuc1gsIHRyYW5zWSApO1xuXG4gIHRoaXMudHJhbnNpdGlvbih7XG4gICAgdG86IHRyYW5zaXRpb25TdHlsZSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IHtcbiAgICAgIHRyYW5zZm9ybTogdGhpcy5sYXlvdXRQb3NpdGlvblxuICAgIH0sXG4gICAgaXNDbGVhbmluZzogdHJ1ZVxuICB9KTtcbn07XG5cbnByb3RvLmdldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uKCB4LCB5ICkge1xuICAvLyBmbGlwIGNvb3JpZGluYXRlcyBpZiBvcmlnaW4gb24gcmlnaHQgb3IgYm90dG9tXG4gIHZhciBpc09yaWdpbkxlZnQgPSB0aGlzLmxheW91dC5fZ2V0T3B0aW9uKCdvcmlnaW5MZWZ0Jyk7XG4gIHZhciBpc09yaWdpblRvcCA9IHRoaXMubGF5b3V0Ll9nZXRPcHRpb24oJ29yaWdpblRvcCcpO1xuICB4ID0gaXNPcmlnaW5MZWZ0ID8geCA6IC14O1xuICB5ID0gaXNPcmlnaW5Ub3AgPyB5IDogLXk7XG4gIHJldHVybiAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LCAwKSc7XG59O1xuXG4vLyBub24gdHJhbnNpdGlvbiArIHRyYW5zZm9ybSBzdXBwb3J0XG5wcm90by5nb1RvID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIHRoaXMuc2V0UG9zaXRpb24oIHgsIHkgKTtcbiAgdGhpcy5sYXlvdXRQb3NpdGlvbigpO1xufTtcblxucHJvdG8ubW92ZVRvID0gcHJvdG8uX3RyYW5zaXRpb25UbztcblxucHJvdG8uc2V0UG9zaXRpb24gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5wb3NpdGlvbi54ID0gcGFyc2VGbG9hdCggeCApO1xuICB0aGlzLnBvc2l0aW9uLnkgPSBwYXJzZUZsb2F0KCB5ICk7XG59O1xuXG4vLyAtLS0tLSB0cmFuc2l0aW9uIC0tLS0tIC8vXG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlIC0gQ1NTXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblRyYW5zaXRpb25FbmRcbiAqL1xuXG4vLyBub24gdHJhbnNpdGlvbiwganVzdCB0cmlnZ2VyIGNhbGxiYWNrXG5wcm90by5fbm9uVHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCBhcmdzICkge1xuICB0aGlzLmNzcyggYXJncy50byApO1xuICBpZiAoIGFyZ3MuaXNDbGVhbmluZyApIHtcbiAgICB0aGlzLl9yZW1vdmVTdHlsZXMoIGFyZ3MudG8gKTtcbiAgfVxuICBmb3IgKCB2YXIgcHJvcCBpbiBhcmdzLm9uVHJhbnNpdGlvbkVuZCApIHtcbiAgICBhcmdzLm9uVHJhbnNpdGlvbkVuZFsgcHJvcCBdLmNhbGwoIHRoaXMgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwcm9wZXIgdHJhbnNpdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgLSBhcmd1bWVudHNcbiAqICAgQHBhcmFtIHtPYmplY3R9IHRvIC0gc3R5bGUgdG8gdHJhbnNpdGlvbiB0b1xuICogICBAcGFyYW0ge09iamVjdH0gZnJvbSAtIHN0eWxlIHRvIHN0YXJ0IHRyYW5zaXRpb24gZnJvbVxuICogICBAcGFyYW0ge0Jvb2xlYW59IGlzQ2xlYW5pbmcgLSByZW1vdmVzIHRyYW5zaXRpb24gc3R5bGVzIGFmdGVyIHRyYW5zaXRpb25cbiAqICAgQHBhcmFtIHtGdW5jdGlvbn0gb25UcmFuc2l0aW9uRW5kIC0gY2FsbGJhY2tcbiAqL1xucHJvdG8udHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCBhcmdzICkge1xuICAvLyByZWRpcmVjdCB0byBub25UcmFuc2l0aW9uIGlmIG5vIHRyYW5zaXRpb24gZHVyYXRpb25cbiAgaWYgKCAhcGFyc2VGbG9hdCggdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb24gKSApIHtcbiAgICB0aGlzLl9ub25UcmFuc2l0aW9uKCBhcmdzICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF90cmFuc2l0aW9uID0gdGhpcy5fdHJhbnNuO1xuICAvLyBrZWVwIHRyYWNrIG9mIG9uVHJhbnNpdGlvbkVuZCBjYWxsYmFjayBieSBjc3MgcHJvcGVydHlcbiAgZm9yICggdmFyIHByb3AgaW4gYXJncy5vblRyYW5zaXRpb25FbmQgKSB7XG4gICAgX3RyYW5zaXRpb24ub25FbmRbIHByb3AgXSA9IGFyZ3Mub25UcmFuc2l0aW9uRW5kWyBwcm9wIF07XG4gIH1cbiAgLy8ga2VlcCB0cmFjayBvZiBwcm9wZXJ0aWVzIHRoYXQgYXJlIHRyYW5zaXRpb25pbmdcbiAgZm9yICggcHJvcCBpbiBhcmdzLnRvICkge1xuICAgIF90cmFuc2l0aW9uLmluZ1Byb3BlcnRpZXNbIHByb3AgXSA9IHRydWU7XG4gICAgLy8ga2VlcCB0cmFjayBvZiBwcm9wZXJ0aWVzIHRvIGNsZWFuIHVwIHdoZW4gdHJhbnNpdGlvbiBpcyBkb25lXG4gICAgaWYgKCBhcmdzLmlzQ2xlYW5pbmcgKSB7XG4gICAgICBfdHJhbnNpdGlvbi5jbGVhblsgcHJvcCBdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgZnJvbSBzdHlsZXNcbiAgaWYgKCBhcmdzLmZyb20gKSB7XG4gICAgdGhpcy5jc3MoIGFyZ3MuZnJvbSApO1xuICAgIC8vIGZvcmNlIHJlZHJhdy4gaHR0cDovL2Jsb2cuYWxleG1hY2Nhdy5jb20vY3NzLXRyYW5zaXRpb25zXG4gICAgdmFyIGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIGhhY2sgZm9yIEpTSGludCB0byBodXNoIGFib3V0IHVudXNlZCB2YXJcbiAgICBoID0gbnVsbDtcbiAgfVxuICAvLyBlbmFibGUgdHJhbnNpdGlvblxuICB0aGlzLmVuYWJsZVRyYW5zaXRpb24oIGFyZ3MudG8gKTtcbiAgLy8gc2V0IHN0eWxlcyB0aGF0IGFyZSB0cmFuc2l0aW9uaW5nXG4gIHRoaXMuY3NzKCBhcmdzLnRvICk7XG5cbiAgdGhpcy5pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXG59O1xuXG4vLyBkYXNoIGJlZm9yZSBhbGwgY2FwIGxldHRlcnMsIGluY2x1ZGluZyBmaXJzdCBmb3Jcbi8vIFdlYmtpdFRyYW5zZm9ybSA9PiAtd2Via2l0LXRyYW5zZm9ybVxuZnVuY3Rpb24gdG9EYXNoZWRBbGwoIHN0ciApIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKCAvKFtBLVpdKS9nLCBmdW5jdGlvbiggJDEgKSB7XG4gICAgcmV0dXJuICctJyArICQxLnRvTG93ZXJDYXNlKCk7XG4gIH0pO1xufVxuXG52YXIgdHJhbnNpdGlvblByb3BzID0gJ29wYWNpdHksJyArIHRvRGFzaGVkQWxsKCB0cmFuc2Zvcm1Qcm9wZXJ0eSApO1xuXG5wcm90by5lbmFibGVUcmFuc2l0aW9uID0gZnVuY3Rpb24oLyogc3R5bGUgKi8pIHtcbiAgLy8gSEFDSyBjaGFuZ2luZyB0cmFuc2l0aW9uUHJvcGVydHkgZHVyaW5nIGEgdHJhbnNpdGlvblxuICAvLyB3aWxsIGNhdXNlIHRyYW5zaXRpb24gdG8ganVtcFxuICBpZiAoIHRoaXMuaXNUcmFuc2l0aW9uaW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIG1ha2UgYHRyYW5zaXRpb246IGZvbywgYmFyLCBiYXpgIGZyb20gc3R5bGUgb2JqZWN0XG4gIC8vIEhBQ0sgdW4tY29tbWVudCB0aGlzIHdoZW4gZW5hYmxlVHJhbnNpdGlvbiBjYW4gd29ya1xuICAvLyB3aGlsZSBhIHRyYW5zaXRpb24gaXMgaGFwcGVuaW5nXG4gIC8vIHZhciB0cmFuc2l0aW9uVmFsdWVzID0gW107XG4gIC8vIGZvciAoIHZhciBwcm9wIGluIHN0eWxlICkge1xuICAvLyAgIC8vIGRhc2gtaWZ5IGNhbWVsQ2FzZWQgcHJvcGVydGllcyBsaWtlIFdlYmtpdFRyYW5zaXRpb25cbiAgLy8gICBwcm9wID0gdmVuZG9yUHJvcGVydGllc1sgcHJvcCBdIHx8IHByb3A7XG4gIC8vICAgdHJhbnNpdGlvblZhbHVlcy5wdXNoKCB0b0Rhc2hlZEFsbCggcHJvcCApICk7XG4gIC8vIH1cbiAgLy8gbXVuZ2UgbnVtYmVyIHRvIG1pbGxpc2Vjb25kLCB0byBtYXRjaCBzdGFnZ2VyXG4gIHZhciBkdXJhdGlvbiA9IHRoaXMubGF5b3V0Lm9wdGlvbnMudHJhbnNpdGlvbkR1cmF0aW9uO1xuICBkdXJhdGlvbiA9IHR5cGVvZiBkdXJhdGlvbiA9PSAnbnVtYmVyJyA/IGR1cmF0aW9uICsgJ21zJyA6IGR1cmF0aW9uO1xuICAvLyBlbmFibGUgdHJhbnNpdGlvbiBzdHlsZXNcbiAgdGhpcy5jc3Moe1xuICAgIHRyYW5zaXRpb25Qcm9wZXJ0eTogdHJhbnNpdGlvblByb3BzLFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjogZHVyYXRpb24sXG4gICAgdHJhbnNpdGlvbkRlbGF5OiB0aGlzLnN0YWdnZXJEZWxheSB8fCAwXG4gIH0pO1xuICAvLyBsaXN0ZW4gZm9yIHRyYW5zaXRpb24gZW5kIGV2ZW50XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCB0cmFuc2l0aW9uRW5kRXZlbnQsIHRoaXMsIGZhbHNlICk7XG59O1xuXG4vLyAtLS0tLSBldmVudHMgLS0tLS0gLy9cblxucHJvdG8ub253ZWJraXRUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLm9udHJhbnNpdGlvbmVuZCggZXZlbnQgKTtcbn07XG5cbnByb3RvLm9ub3RyYW5zaXRpb25lbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMub250cmFuc2l0aW9uZW5kKCBldmVudCApO1xufTtcblxuLy8gcHJvcGVydGllcyB0aGF0IEkgbXVuZ2UgdG8gbWFrZSBteSBsaWZlIGVhc2llclxudmFyIGRhc2hlZFZlbmRvclByb3BlcnRpZXMgPSB7XG4gICctd2Via2l0LXRyYW5zZm9ybSc6ICd0cmFuc2Zvcm0nXG59O1xuXG5wcm90by5vbnRyYW5zaXRpb25lbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIGRpc3JlZ2FyZCBidWJibGVkIGV2ZW50cyBmcm9tIGNoaWxkcmVuXG4gIGlmICggZXZlbnQudGFyZ2V0ICE9PSB0aGlzLmVsZW1lbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBfdHJhbnNpdGlvbiA9IHRoaXMuX3RyYW5zbjtcbiAgLy8gZ2V0IHByb3BlcnR5IG5hbWUgb2YgdHJhbnNpdGlvbmVkIHByb3BlcnR5LCBjb252ZXJ0IHRvIHByZWZpeC1mcmVlXG4gIHZhciBwcm9wZXJ0eU5hbWUgPSBkYXNoZWRWZW5kb3JQcm9wZXJ0aWVzWyBldmVudC5wcm9wZXJ0eU5hbWUgXSB8fCBldmVudC5wcm9wZXJ0eU5hbWU7XG5cbiAgLy8gcmVtb3ZlIHByb3BlcnR5IHRoYXQgaGFzIGNvbXBsZXRlZCB0cmFuc2l0aW9uaW5nXG4gIGRlbGV0ZSBfdHJhbnNpdGlvbi5pbmdQcm9wZXJ0aWVzWyBwcm9wZXJ0eU5hbWUgXTtcbiAgLy8gY2hlY2sgaWYgYW55IHByb3BlcnRpZXMgYXJlIHN0aWxsIHRyYW5zaXRpb25pbmdcbiAgaWYgKCBpc0VtcHR5T2JqKCBfdHJhbnNpdGlvbi5pbmdQcm9wZXJ0aWVzICkgKSB7XG4gICAgLy8gYWxsIHByb3BlcnRpZXMgaGF2ZSBjb21wbGV0ZWQgdHJhbnNpdGlvbmluZ1xuICAgIHRoaXMuZGlzYWJsZVRyYW5zaXRpb24oKTtcbiAgfVxuICAvLyBjbGVhbiBzdHlsZVxuICBpZiAoIHByb3BlcnR5TmFtZSBpbiBfdHJhbnNpdGlvbi5jbGVhbiApIHtcbiAgICAvLyBjbGVhbiB1cCBzdHlsZVxuICAgIHRoaXMuZWxlbWVudC5zdHlsZVsgZXZlbnQucHJvcGVydHlOYW1lIF0gPSAnJztcbiAgICBkZWxldGUgX3RyYW5zaXRpb24uY2xlYW5bIHByb3BlcnR5TmFtZSBdO1xuICB9XG4gIC8vIHRyaWdnZXIgb25UcmFuc2l0aW9uRW5kIGNhbGxiYWNrXG4gIGlmICggcHJvcGVydHlOYW1lIGluIF90cmFuc2l0aW9uLm9uRW5kICkge1xuICAgIHZhciBvblRyYW5zaXRpb25FbmQgPSBfdHJhbnNpdGlvbi5vbkVuZFsgcHJvcGVydHlOYW1lIF07XG4gICAgb25UcmFuc2l0aW9uRW5kLmNhbGwoIHRoaXMgKTtcbiAgICBkZWxldGUgX3RyYW5zaXRpb24ub25FbmRbIHByb3BlcnR5TmFtZSBdO1xuICB9XG5cbiAgdGhpcy5lbWl0RXZlbnQoICd0cmFuc2l0aW9uRW5kJywgWyB0aGlzIF0gKTtcbn07XG5cbnByb3RvLmRpc2FibGVUcmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVtb3ZlVHJhbnNpdGlvblN0eWxlcygpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHJhbnNpdGlvbkVuZEV2ZW50LCB0aGlzLCBmYWxzZSApO1xuICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiByZW1vdmVzIHN0eWxlIHByb3BlcnR5IGZyb20gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4qKi9cbnByb3RvLl9yZW1vdmVTdHlsZXMgPSBmdW5jdGlvbiggc3R5bGUgKSB7XG4gIC8vIGNsZWFuIHVwIHRyYW5zaXRpb24gc3R5bGVzXG4gIHZhciBjbGVhblN0eWxlID0ge307XG4gIGZvciAoIHZhciBwcm9wIGluIHN0eWxlICkge1xuICAgIGNsZWFuU3R5bGVbIHByb3AgXSA9ICcnO1xuICB9XG4gIHRoaXMuY3NzKCBjbGVhblN0eWxlICk7XG59O1xuXG52YXIgY2xlYW5UcmFuc2l0aW9uU3R5bGUgPSB7XG4gIHRyYW5zaXRpb25Qcm9wZXJ0eTogJycsXG4gIHRyYW5zaXRpb25EdXJhdGlvbjogJycsXG4gIHRyYW5zaXRpb25EZWxheTogJydcbn07XG5cbnByb3RvLnJlbW92ZVRyYW5zaXRpb25TdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIHRyYW5zaXRpb25cbiAgdGhpcy5jc3MoIGNsZWFuVHJhbnNpdGlvblN0eWxlICk7XG59O1xuXG4vLyAtLS0tLSBzdGFnZ2VyIC0tLS0tIC8vXG5cbnByb3RvLnN0YWdnZXIgPSBmdW5jdGlvbiggZGVsYXkgKSB7XG4gIGRlbGF5ID0gaXNOYU4oIGRlbGF5ICkgPyAwIDogZGVsYXk7XG4gIHRoaXMuc3RhZ2dlckRlbGF5ID0gZGVsYXkgKyAnbXMnO1xufTtcblxuLy8gLS0tLS0gc2hvdy9oaWRlL3JlbW92ZSAtLS0tLSAvL1xuXG4vLyByZW1vdmUgZWxlbWVudCBmcm9tIERPTVxucHJvdG8ucmVtb3ZlRWxlbSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG4gIC8vIHJlbW92ZSBkaXNwbGF5OiBub25lXG4gIHRoaXMuY3NzKHsgZGlzcGxheTogJycgfSk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncmVtb3ZlJywgWyB0aGlzIF0gKTtcbn07XG5cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBqdXN0IHJlbW92ZSBlbGVtZW50IGlmIG5vIHRyYW5zaXRpb24gc3VwcG9ydCBvciBubyB0cmFuc2l0aW9uXG4gIGlmICggIXRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAhcGFyc2VGbG9hdCggdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb24gKSApIHtcbiAgICB0aGlzLnJlbW92ZUVsZW0oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzdGFydCB0cmFuc2l0aW9uXG4gIHRoaXMub25jZSggJ3RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUVsZW0oKTtcbiAgfSk7XG4gIHRoaXMuaGlkZSgpO1xufTtcblxucHJvdG8ucmV2ZWFsID0gZnVuY3Rpb24oKSB7XG4gIGRlbGV0ZSB0aGlzLmlzSGlkZGVuO1xuICAvLyByZW1vdmUgZGlzcGxheTogbm9uZVxuICB0aGlzLmNzcyh7IGRpc3BsYXk6ICcnIH0pO1xuXG4gIHZhciBvcHRpb25zID0gdGhpcy5sYXlvdXQub3B0aW9ucztcblxuICB2YXIgb25UcmFuc2l0aW9uRW5kID0ge307XG4gIHZhciB0cmFuc2l0aW9uRW5kUHJvcGVydHkgPSB0aGlzLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHkoJ3Zpc2libGVTdHlsZScpO1xuICBvblRyYW5zaXRpb25FbmRbIHRyYW5zaXRpb25FbmRQcm9wZXJ0eSBdID0gdGhpcy5vblJldmVhbFRyYW5zaXRpb25FbmQ7XG5cbiAgdGhpcy50cmFuc2l0aW9uKHtcbiAgICBmcm9tOiBvcHRpb25zLmhpZGRlblN0eWxlLFxuICAgIHRvOiBvcHRpb25zLnZpc2libGVTdHlsZSxcbiAgICBpc0NsZWFuaW5nOiB0cnVlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDogb25UcmFuc2l0aW9uRW5kXG4gIH0pO1xufTtcblxucHJvdG8ub25SZXZlYWxUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNoZWNrIGlmIHN0aWxsIHZpc2libGVcbiAgLy8gZHVyaW5nIHRyYW5zaXRpb24sIGl0ZW0gbWF5IGhhdmUgYmVlbiBoaWRkZW5cbiAgaWYgKCAhdGhpcy5pc0hpZGRlbiApIHtcbiAgICB0aGlzLmVtaXRFdmVudCgncmV2ZWFsJyk7XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IHN0eWxlIHByb3BlcnR5IHVzZSBmb3IgaGlkZS9yZXZlYWwgdHJhbnNpdGlvbiBlbmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHlsZVByb3BlcnR5IC0gaGlkZGVuU3R5bGUvdmlzaWJsZVN0eWxlXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5wcm90by5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5ID0gZnVuY3Rpb24oIHN0eWxlUHJvcGVydHkgKSB7XG4gIHZhciBvcHRpb25TdHlsZSA9IHRoaXMubGF5b3V0Lm9wdGlvbnNbIHN0eWxlUHJvcGVydHkgXTtcbiAgLy8gdXNlIG9wYWNpdHlcbiAgaWYgKCBvcHRpb25TdHlsZS5vcGFjaXR5ICkge1xuICAgIHJldHVybiAnb3BhY2l0eSc7XG4gIH1cbiAgLy8gZ2V0IGZpcnN0IHByb3BlcnR5XG4gIGZvciAoIHZhciBwcm9wIGluIG9wdGlvblN0eWxlICkge1xuICAgIHJldHVybiBwcm9wO1xuICB9XG59O1xuXG5wcm90by5oaWRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNldCBmbGFnXG4gIHRoaXMuaXNIaWRkZW4gPSB0cnVlO1xuICAvLyByZW1vdmUgZGlzcGxheTogbm9uZVxuICB0aGlzLmNzcyh7IGRpc3BsYXk6ICcnIH0pO1xuXG4gIHZhciBvcHRpb25zID0gdGhpcy5sYXlvdXQub3B0aW9ucztcblxuICB2YXIgb25UcmFuc2l0aW9uRW5kID0ge307XG4gIHZhciB0cmFuc2l0aW9uRW5kUHJvcGVydHkgPSB0aGlzLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHkoJ2hpZGRlblN0eWxlJyk7XG4gIG9uVHJhbnNpdGlvbkVuZFsgdHJhbnNpdGlvbkVuZFByb3BlcnR5IF0gPSB0aGlzLm9uSGlkZVRyYW5zaXRpb25FbmQ7XG5cbiAgdGhpcy50cmFuc2l0aW9uKHtcbiAgICBmcm9tOiBvcHRpb25zLnZpc2libGVTdHlsZSxcbiAgICB0bzogb3B0aW9ucy5oaWRkZW5TdHlsZSxcbiAgICAvLyBrZWVwIGhpZGRlbiBzdHVmZiBoaWRkZW5cbiAgICBpc0NsZWFuaW5nOiB0cnVlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDogb25UcmFuc2l0aW9uRW5kXG4gIH0pO1xufTtcblxucHJvdG8ub25IaWRlVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBpZiBzdGlsbCBoaWRkZW5cbiAgLy8gZHVyaW5nIHRyYW5zaXRpb24sIGl0ZW0gbWF5IGhhdmUgYmVlbiB1bi1oaWRkZW5cbiAgaWYgKCB0aGlzLmlzSGlkZGVuICkge1xuICAgIHRoaXMuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgIHRoaXMuZW1pdEV2ZW50KCdoaWRlJyk7XG4gIH1cbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jc3Moe1xuICAgIHBvc2l0aW9uOiAnJyxcbiAgICBsZWZ0OiAnJyxcbiAgICByaWdodDogJycsXG4gICAgdG9wOiAnJyxcbiAgICBib3R0b206ICcnLFxuICAgIHRyYW5zaXRpb246ICcnLFxuICAgIHRyYW5zZm9ybTogJydcbiAgfSk7XG59O1xuXG5yZXR1cm4gSXRlbTtcblxufSkpO1xuIiwiLyohXG4gKiBPdXRsYXllciB2Mi4xLjFcbiAqIHRoZSBicmFpbnMgYW5kIGd1dHMgb2YgYSBsYXlvdXQgbGlicmFyeVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZScsXG4gICAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAgICcuL2l0ZW0nXG4gICAgICBdLFxuICAgICAgZnVuY3Rpb24oIEV2RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIEl0ZW0gKSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIEl0ZW0pO1xuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlMgLSBCcm93c2VyaWZ5LCBXZWJwYWNrXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgICByZXF1aXJlKCcuL2l0ZW0nKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuT3V0bGF5ZXIgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIHdpbmRvdy5PdXRsYXllci5JdGVtXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgSXRlbSApIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gdmFycyAtLS0tLSAvL1xuXG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG52YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE91dGxheWVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyc1xudmFyIEdVSUQgPSAwO1xuLy8gaW50ZXJuYWwgc3RvcmUgb2YgYWxsIE91dGxheWVyIGludGFuY2VzXG52YXIgaW5zdGFuY2VzID0ge307XG5cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQsIFN0cmluZ30gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBPdXRsYXllciggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgdmFyIHF1ZXJ5RWxlbWVudCA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuICBpZiAoICFxdWVyeUVsZW1lbnQgKSB7XG4gICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lc3BhY2UgK1xuICAgICAgICAnOiAnICsgKCBxdWVyeUVsZW1lbnQgfHwgZWxlbWVudCApICk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQgPSBxdWVyeUVsZW1lbnQ7XG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cblxuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCgge30sIHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHMgKTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcblxuICAvLyBhZGQgaWQgZm9yIE91dGxheWVyLmdldEZyb21FbGVtZW50XG4gIHZhciBpZCA9ICsrR1VJRDtcbiAgdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRCA9IGlkOyAvLyBleHBhbmRvXG4gIGluc3RhbmNlc1sgaWQgXSA9IHRoaXM7IC8vIGFzc29jaWF0ZSB2aWEgaWRcblxuICAvLyBraWNrIGl0IG9mZlxuICB0aGlzLl9jcmVhdGUoKTtcblxuICB2YXIgaXNJbml0TGF5b3V0ID0gdGhpcy5fZ2V0T3B0aW9uKCdpbml0TGF5b3V0Jyk7XG4gIGlmICggaXNJbml0TGF5b3V0ICkge1xuICAgIHRoaXMubGF5b3V0KCk7XG4gIH1cbn1cblxuLy8gc2V0dGluZ3MgYXJlIGZvciBpbnRlcm5hbCB1c2Ugb25seVxuT3V0bGF5ZXIubmFtZXNwYWNlID0gJ291dGxheWVyJztcbk91dGxheWVyLkl0ZW0gPSBJdGVtO1xuXG4vLyBkZWZhdWx0IG9wdGlvbnNcbk91dGxheWVyLmRlZmF1bHRzID0ge1xuICBjb250YWluZXJTdHlsZToge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gIH0sXG4gIGluaXRMYXlvdXQ6IHRydWUsXG4gIG9yaWdpbkxlZnQ6IHRydWUsXG4gIG9yaWdpblRvcDogdHJ1ZSxcbiAgcmVzaXplOiB0cnVlLFxuICByZXNpemVDb250YWluZXI6IHRydWUsXG4gIC8vIGl0ZW0gb3B0aW9uc1xuICB0cmFuc2l0aW9uRHVyYXRpb246ICcwLjRzJyxcbiAgaGlkZGVuU3R5bGU6IHtcbiAgICBvcGFjaXR5OiAwLFxuICAgIHRyYW5zZm9ybTogJ3NjYWxlKDAuMDAxKSdcbiAgfSxcbiAgdmlzaWJsZVN0eWxlOiB7XG4gICAgb3BhY2l0eTogMSxcbiAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKSdcbiAgfVxufTtcblxudmFyIHByb3RvID0gT3V0bGF5ZXIucHJvdG90eXBlO1xuLy8gaW5oZXJpdCBFdkVtaXR0ZXJcbnV0aWxzLmV4dGVuZCggcHJvdG8sIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuLyoqXG4gKiBzZXQgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xucHJvdG8ub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIHV0aWxzLmV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG4vKipcbiAqIGdldCBiYWNrd2FyZHMgY29tcGF0aWJsZSBvcHRpb24gdmFsdWUsIGNoZWNrIG9sZCBuYW1lXG4gKi9cbnByb3RvLl9nZXRPcHRpb24gPSBmdW5jdGlvbiggb3B0aW9uICkge1xuICB2YXIgb2xkT3B0aW9uID0gdGhpcy5jb25zdHJ1Y3Rvci5jb21wYXRPcHRpb25zWyBvcHRpb24gXTtcbiAgcmV0dXJuIG9sZE9wdGlvbiAmJiB0aGlzLm9wdGlvbnNbIG9sZE9wdGlvbiBdICE9PSB1bmRlZmluZWQgP1xuICAgIHRoaXMub3B0aW9uc1sgb2xkT3B0aW9uIF0gOiB0aGlzLm9wdGlvbnNbIG9wdGlvbiBdO1xufTtcblxuT3V0bGF5ZXIuY29tcGF0T3B0aW9ucyA9IHtcbiAgLy8gY3VycmVudE5hbWU6IG9sZE5hbWVcbiAgaW5pdExheW91dDogJ2lzSW5pdExheW91dCcsXG4gIGhvcml6b250YWw6ICdpc0hvcml6b250YWwnLFxuICBsYXlvdXRJbnN0YW50OiAnaXNMYXlvdXRJbnN0YW50JyxcbiAgb3JpZ2luTGVmdDogJ2lzT3JpZ2luTGVmdCcsXG4gIG9yaWdpblRvcDogJ2lzT3JpZ2luVG9wJyxcbiAgcmVzaXplOiAnaXNSZXNpemVCb3VuZCcsXG4gIHJlc2l6ZUNvbnRhaW5lcjogJ2lzUmVzaXppbmdDb250YWluZXInXG59O1xuXG5wcm90by5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGdldCBpdGVtcyBmcm9tIGNoaWxkcmVuXG4gIHRoaXMucmVsb2FkSXRlbXMoKTtcbiAgLy8gZWxlbWVudHMgdGhhdCBhZmZlY3QgbGF5b3V0LCBidXQgYXJlIG5vdCBsYWlkIG91dFxuICB0aGlzLnN0YW1wcyA9IFtdO1xuICB0aGlzLnN0YW1wKCB0aGlzLm9wdGlvbnMuc3RhbXAgKTtcbiAgLy8gc2V0IGNvbnRhaW5lciBzdHlsZVxuICB1dGlscy5leHRlbmQoIHRoaXMuZWxlbWVudC5zdHlsZSwgdGhpcy5vcHRpb25zLmNvbnRhaW5lclN0eWxlICk7XG5cbiAgLy8gYmluZCByZXNpemUgbWV0aG9kXG4gIHZhciBjYW5CaW5kUmVzaXplID0gdGhpcy5fZ2V0T3B0aW9uKCdyZXNpemUnKTtcbiAgaWYgKCBjYW5CaW5kUmVzaXplICkge1xuICAgIHRoaXMuYmluZFJlc2l6ZSgpO1xuICB9XG59O1xuXG4vLyBnb2VzIHRocm91Z2ggYWxsIGNoaWxkcmVuIGFnYWluIGFuZCBnZXRzIGJyaWNrcyBpbiBwcm9wZXIgb3JkZXJcbnByb3RvLnJlbG9hZEl0ZW1zID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNvbGxlY3Rpb24gb2YgaXRlbSBlbGVtZW50c1xuICB0aGlzLml0ZW1zID0gdGhpcy5faXRlbWl6ZSggdGhpcy5lbGVtZW50LmNoaWxkcmVuICk7XG59O1xuXG5cbi8qKlxuICogdHVybiBlbGVtZW50cyBpbnRvIE91dGxheWVyLkl0ZW1zIHRvIGJlIHVzZWQgaW4gbGF5b3V0XG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEhUTUxFbGVtZW50fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIGNvbGxlY3Rpb24gb2YgbmV3IE91dGxheWVyIEl0ZW1zXG4gKi9cbnByb3RvLl9pdGVtaXplID0gZnVuY3Rpb24oIGVsZW1zICkge1xuXG4gIHZhciBpdGVtRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kSXRlbUVsZW1lbnRzKCBlbGVtcyApO1xuICB2YXIgSXRlbSA9IHRoaXMuY29uc3RydWN0b3IuSXRlbTtcblxuICAvLyBjcmVhdGUgbmV3IE91dGxheWVyIEl0ZW1zIGZvciBjb2xsZWN0aW9uXG4gIHZhciBpdGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgaXRlbUVsZW1zLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBlbGVtID0gaXRlbUVsZW1zW2ldO1xuICAgIHZhciBpdGVtID0gbmV3IEl0ZW0oIGVsZW0sIHRoaXMgKTtcbiAgICBpdGVtcy5wdXNoKCBpdGVtICk7XG4gIH1cblxuICByZXR1cm4gaXRlbXM7XG59O1xuXG4vKipcbiAqIGdldCBpdGVtIGVsZW1lbnRzIHRvIGJlIHVzZWQgaW4gbGF5b3V0XG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEhUTUxFbGVtZW50fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIGl0ZW0gZWxlbWVudHNcbiAqL1xucHJvdG8uX2ZpbHRlckZpbmRJdGVtRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHJldHVybiB1dGlscy5maWx0ZXJGaW5kRWxlbWVudHMoIGVsZW1zLCB0aGlzLm9wdGlvbnMuaXRlbVNlbGVjdG9yICk7XG59O1xuXG4vKipcbiAqIGdldHRlciBtZXRob2QgZm9yIGdldHRpbmcgaXRlbSBlbGVtZW50c1xuICogQHJldHVybnMge0FycmF5fSBlbGVtcyAtIGNvbGxlY3Rpb24gb2YgaXRlbSBlbGVtZW50c1xuICovXG5wcm90by5nZXRJdGVtRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKCBmdW5jdGlvbiggaXRlbSApIHtcbiAgICByZXR1cm4gaXRlbS5lbGVtZW50O1xuICB9KTtcbn07XG5cbi8vIC0tLS0tIGluaXQgJiBsYXlvdXQgLS0tLS0gLy9cblxuLyoqXG4gKiBsYXlzIG91dCBhbGwgaXRlbXNcbiAqL1xucHJvdG8ubGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3Jlc2V0TGF5b3V0KCk7XG4gIHRoaXMuX21hbmFnZVN0YW1wcygpO1xuXG4gIC8vIGRvbid0IGFuaW1hdGUgZmlyc3QgbGF5b3V0XG4gIHZhciBsYXlvdXRJbnN0YW50ID0gdGhpcy5fZ2V0T3B0aW9uKCdsYXlvdXRJbnN0YW50Jyk7XG4gIHZhciBpc0luc3RhbnQgPSBsYXlvdXRJbnN0YW50ICE9PSB1bmRlZmluZWQgP1xuICAgIGxheW91dEluc3RhbnQgOiAhdGhpcy5faXNMYXlvdXRJbml0ZWQ7XG4gIHRoaXMubGF5b3V0SXRlbXMoIHRoaXMuaXRlbXMsIGlzSW5zdGFudCApO1xuXG4gIC8vIGZsYWcgZm9yIGluaXRhbGl6ZWRcbiAgdGhpcy5faXNMYXlvdXRJbml0ZWQgPSB0cnVlO1xufTtcblxuLy8gX2luaXQgaXMgYWxpYXMgZm9yIGxheW91dFxucHJvdG8uX2luaXQgPSBwcm90by5sYXlvdXQ7XG5cbi8qKlxuICogbG9naWMgYmVmb3JlIGFueSBuZXcgbGF5b3V0XG4gKi9cbnByb3RvLl9yZXNldExheW91dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdldFNpemUoKTtcbn07XG5cblxucHJvdG8uZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cbi8qKlxuICogZ2V0IG1lYXN1cmVtZW50IGZyb20gb3B0aW9uLCBmb3IgY29sdW1uV2lkdGgsIHJvd0hlaWdodCwgZ3V0dGVyXG4gKiBpZiBvcHRpb24gaXMgU3RyaW5nIC0+IGdldCBlbGVtZW50IGZyb20gc2VsZWN0b3Igc3RyaW5nLCAmIGdldCBzaXplIG9mIGVsZW1lbnRcbiAqIGlmIG9wdGlvbiBpcyBFbGVtZW50IC0+IGdldCBzaXplIG9mIGVsZW1lbnRcbiAqIGVsc2UgdXNlIG9wdGlvbiBhcyBhIG51bWJlclxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZWFzdXJlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSB3aWR0aCBvciBoZWlnaHRcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9nZXRNZWFzdXJlbWVudCA9IGZ1bmN0aW9uKCBtZWFzdXJlbWVudCwgc2l6ZSApIHtcbiAgdmFyIG9wdGlvbiA9IHRoaXMub3B0aW9uc1sgbWVhc3VyZW1lbnQgXTtcbiAgdmFyIGVsZW07XG4gIGlmICggIW9wdGlvbiApIHtcbiAgICAvLyBkZWZhdWx0IHRvIDBcbiAgICB0aGlzWyBtZWFzdXJlbWVudCBdID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2Ugb3B0aW9uIGFzIGFuIGVsZW1lbnRcbiAgICBpZiAoIHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycgKSB7XG4gICAgICBlbGVtID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoIG9wdGlvbiApO1xuICAgIH0gZWxzZSBpZiAoIG9wdGlvbiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICkge1xuICAgICAgZWxlbSA9IG9wdGlvbjtcbiAgICB9XG4gICAgLy8gdXNlIHNpemUgb2YgZWxlbWVudCwgaWYgZWxlbWVudFxuICAgIHRoaXNbIG1lYXN1cmVtZW50IF0gPSBlbGVtID8gZ2V0U2l6ZSggZWxlbSApWyBzaXplIF0gOiBvcHRpb247XG4gIH1cbn07XG5cbi8qKlxuICogbGF5b3V0IGEgY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5wcm90by5sYXlvdXRJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcywgaXNJbnN0YW50ICkge1xuICBpdGVtcyA9IHRoaXMuX2dldEl0ZW1zRm9yTGF5b3V0KCBpdGVtcyApO1xuXG4gIHRoaXMuX2xheW91dEl0ZW1zKCBpdGVtcywgaXNJbnN0YW50ICk7XG5cbiAgdGhpcy5fcG9zdExheW91dCgpO1xufTtcblxuLyoqXG4gKiBnZXQgdGhlIGl0ZW1zIHRvIGJlIGxhaWQgb3V0XG4gKiB5b3UgbWF5IHdhbnQgdG8gc2tpcCBvdmVyIHNvbWUgaXRlbXNcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zXG4gKi9cbnByb3RvLl9nZXRJdGVtc0ZvckxheW91dCA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcbiAgcmV0dXJuIGl0ZW1zLmZpbHRlciggZnVuY3Rpb24oIGl0ZW0gKSB7XG4gICAgcmV0dXJuICFpdGVtLmlzSWdub3JlZDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGxheW91dCBpdGVtc1xuICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbnN0YW50XG4gKi9cbnByb3RvLl9sYXlvdXRJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcywgaXNJbnN0YW50ICkge1xuICB0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKCAnbGF5b3V0JywgaXRlbXMgKTtcblxuICBpZiAoICFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoICkge1xuICAgIC8vIG5vIGl0ZW1zLCBlbWl0IGV2ZW50IHdpdGggZW1wdHkgYXJyYXlcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcXVldWUgPSBbXTtcblxuICBpdGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSApIHtcbiAgICAvLyBnZXQgeC95IG9iamVjdCBmcm9tIG1ldGhvZFxuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbiggaXRlbSApO1xuICAgIC8vIGVucXVldWVcbiAgICBwb3NpdGlvbi5pdGVtID0gaXRlbTtcbiAgICBwb3NpdGlvbi5pc0luc3RhbnQgPSBpc0luc3RhbnQgfHwgaXRlbS5pc0xheW91dEluc3RhbnQ7XG4gICAgcXVldWUucHVzaCggcG9zaXRpb24gKTtcbiAgfSwgdGhpcyApO1xuXG4gIHRoaXMuX3Byb2Nlc3NMYXlvdXRRdWV1ZSggcXVldWUgKTtcbn07XG5cbi8qKlxuICogZ2V0IGl0ZW0gbGF5b3V0IHBvc2l0aW9uXG4gKiBAcGFyYW0ge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqIEByZXR1cm5zIHtPYmplY3R9IHggYW5kIHkgcG9zaXRpb25cbiAqL1xucHJvdG8uX2dldEl0ZW1MYXlvdXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCAvKiBpdGVtICovICkge1xuICByZXR1cm4ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xufTtcblxuLyoqXG4gKiBpdGVyYXRlIG92ZXIgYXJyYXkgYW5kIHBvc2l0aW9uIGVhY2ggaXRlbVxuICogUmVhc29uIGJlaW5nIC0gc2VwYXJhdGluZyB0aGlzIGxvZ2ljIHByZXZlbnRzICdsYXlvdXQgaW52YWxpZGF0aW9uJ1xuICogdGh4IEBwYXVsX2lyaXNoXG4gKiBAcGFyYW0ge0FycmF5fSBxdWV1ZVxuICovXG5wcm90by5fcHJvY2Vzc0xheW91dFF1ZXVlID0gZnVuY3Rpb24oIHF1ZXVlICkge1xuICB0aGlzLnVwZGF0ZVN0YWdnZXIoKTtcbiAgcXVldWUuZm9yRWFjaCggZnVuY3Rpb24oIG9iaiwgaSApIHtcbiAgICB0aGlzLl9wb3NpdGlvbkl0ZW0oIG9iai5pdGVtLCBvYmoueCwgb2JqLnksIG9iai5pc0luc3RhbnQsIGkgKTtcbiAgfSwgdGhpcyApO1xufTtcblxuLy8gc2V0IHN0YWdnZXIgZnJvbSBvcHRpb24gaW4gbWlsbGlzZWNvbmRzIG51bWJlclxucHJvdG8udXBkYXRlU3RhZ2dlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3RhZ2dlciA9IHRoaXMub3B0aW9ucy5zdGFnZ2VyO1xuICBpZiAoIHN0YWdnZXIgPT09IG51bGwgfHwgc3RhZ2dlciA9PT0gdW5kZWZpbmVkICkge1xuICAgIHRoaXMuc3RhZ2dlciA9IDA7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc3RhZ2dlciA9IGdldE1pbGxpc2Vjb25kcyggc3RhZ2dlciApO1xuICByZXR1cm4gdGhpcy5zdGFnZ2VyO1xufTtcblxuLyoqXG4gKiBTZXRzIHBvc2l0aW9uIG9mIGl0ZW0gaW4gRE9NXG4gKiBAcGFyYW0ge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHkgLSB2ZXJ0aWNhbCBwb3NpdGlvblxuICogQHBhcmFtIHtCb29sZWFufSBpc0luc3RhbnQgLSBkaXNhYmxlcyB0cmFuc2l0aW9uc1xuICovXG5wcm90by5fcG9zaXRpb25JdGVtID0gZnVuY3Rpb24oIGl0ZW0sIHgsIHksIGlzSW5zdGFudCwgaSApIHtcbiAgaWYgKCBpc0luc3RhbnQgKSB7XG4gICAgLy8gaWYgbm90IHRyYW5zaXRpb24sIGp1c3Qgc2V0IENTU1xuICAgIGl0ZW0uZ29UbyggeCwgeSApO1xuICB9IGVsc2Uge1xuICAgIGl0ZW0uc3RhZ2dlciggaSAqIHRoaXMuc3RhZ2dlciApO1xuICAgIGl0ZW0ubW92ZVRvKCB4LCB5ICk7XG4gIH1cbn07XG5cbi8qKlxuICogQW55IGxvZ2ljIHlvdSB3YW50IHRvIGRvIGFmdGVyIGVhY2ggbGF5b3V0LFxuICogaS5lLiBzaXplIHRoZSBjb250YWluZXJcbiAqL1xucHJvdG8uX3Bvc3RMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNpemVDb250YWluZXIoKTtcbn07XG5cbnByb3RvLnJlc2l6ZUNvbnRhaW5lciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXNSZXNpemluZ0NvbnRhaW5lciA9IHRoaXMuX2dldE9wdGlvbigncmVzaXplQ29udGFpbmVyJyk7XG4gIGlmICggIWlzUmVzaXppbmdDb250YWluZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBzaXplID0gdGhpcy5fZ2V0Q29udGFpbmVyU2l6ZSgpO1xuICBpZiAoIHNpemUgKSB7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZSggc2l6ZS53aWR0aCwgdHJ1ZSApO1xuICAgIHRoaXMuX3NldENvbnRhaW5lck1lYXN1cmUoIHNpemUuaGVpZ2h0LCBmYWxzZSApO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHMgd2lkdGggb3IgaGVpZ2h0IG9mIGNvbnRhaW5lciBpZiByZXR1cm5lZFxuICogQHJldHVybnMge09iamVjdH0gc2l6ZVxuICogICBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAqICAgQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICovXG5wcm90by5fZ2V0Q29udGFpbmVyU2l6ZSA9IG5vb3A7XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1lYXN1cmUgLSBzaXplIG9mIHdpZHRoIG9yIGhlaWdodFxuICogQHBhcmFtIHtCb29sZWFufSBpc1dpZHRoXG4gKi9cbnByb3RvLl9zZXRDb250YWluZXJNZWFzdXJlID0gZnVuY3Rpb24oIG1lYXN1cmUsIGlzV2lkdGggKSB7XG4gIGlmICggbWVhc3VyZSA9PT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBlbGVtU2l6ZSA9IHRoaXMuc2l6ZTtcbiAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB3aWR0aCBpZiBib3JkZXIgYm94XG4gIGlmICggZWxlbVNpemUuaXNCb3JkZXJCb3ggKSB7XG4gICAgbWVhc3VyZSArPSBpc1dpZHRoID8gZWxlbVNpemUucGFkZGluZ0xlZnQgKyBlbGVtU2l6ZS5wYWRkaW5nUmlnaHQgK1xuICAgICAgZWxlbVNpemUuYm9yZGVyTGVmdFdpZHRoICsgZWxlbVNpemUuYm9yZGVyUmlnaHRXaWR0aCA6XG4gICAgICBlbGVtU2l6ZS5wYWRkaW5nQm90dG9tICsgZWxlbVNpemUucGFkZGluZ1RvcCArXG4gICAgICBlbGVtU2l6ZS5ib3JkZXJUb3BXaWR0aCArIGVsZW1TaXplLmJvcmRlckJvdHRvbVdpZHRoO1xuICB9XG5cbiAgbWVhc3VyZSA9IE1hdGgubWF4KCBtZWFzdXJlLCAwICk7XG4gIHRoaXMuZWxlbWVudC5zdHlsZVsgaXNXaWR0aCA/ICd3aWR0aCcgOiAnaGVpZ2h0JyBdID0gbWVhc3VyZSArICdweCc7XG59O1xuXG4vKipcbiAqIGVtaXQgZXZlbnRDb21wbGV0ZSBvbiBhIGNvbGxlY3Rpb24gb2YgaXRlbXMgZXZlbnRzXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gKiBAcGFyYW0ge0FycmF5fSBpdGVtcyAtIE91dGxheWVyLkl0ZW1zXG4gKi9cbnByb3RvLl9lbWl0Q29tcGxldGVPbkl0ZW1zID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgaXRlbXMgKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIGZ1bmN0aW9uIG9uQ29tcGxldGUoKSB7XG4gICAgX3RoaXMuZGlzcGF0Y2hFdmVudCggZXZlbnROYW1lICsgJ0NvbXBsZXRlJywgbnVsbCwgWyBpdGVtcyBdICk7XG4gIH1cblxuICB2YXIgY291bnQgPSBpdGVtcy5sZW5ndGg7XG4gIGlmICggIWl0ZW1zIHx8ICFjb3VudCApIHtcbiAgICBvbkNvbXBsZXRlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRvbmVDb3VudCA9IDA7XG4gIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgZG9uZUNvdW50Kys7XG4gICAgaWYgKCBkb25lQ291bnQgPT0gY291bnQgKSB7XG4gICAgICBvbkNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gYmluZCBjYWxsYmFja1xuICBpdGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSApIHtcbiAgICBpdGVtLm9uY2UoIGV2ZW50TmFtZSwgdGljayApO1xuICB9KTtcbn07XG5cbi8qKlxuICogZW1pdHMgZXZlbnRzIHZpYSBFdkVtaXR0ZXIgYW5kIGpRdWVyeSBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gbmFtZSBvZiBldmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBvcmlnaW5hbCBldmVudFxuICogQHBhcmFtIHtBcnJheX0gYXJncyAtIGV4dHJhIGFyZ3VtZW50c1xuICovXG5wcm90by5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oIHR5cGUsIGV2ZW50LCBhcmdzICkge1xuICAvLyBhZGQgb3JpZ2luYWwgZXZlbnQgdG8gYXJndW1lbnRzXG4gIHZhciBlbWl0QXJncyA9IGV2ZW50ID8gWyBldmVudCBdLmNvbmNhdCggYXJncyApIDogYXJncztcbiAgdGhpcy5lbWl0RXZlbnQoIHR5cGUsIGVtaXRBcmdzICk7XG5cbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgLy8gc2V0IHRoaXMuJGVsZW1lbnRcbiAgICB0aGlzLiRlbGVtZW50ID0gdGhpcy4kZWxlbWVudCB8fCBqUXVlcnkoIHRoaXMuZWxlbWVudCApO1xuICAgIGlmICggZXZlbnQgKSB7XG4gICAgICAvLyBjcmVhdGUgalF1ZXJ5IGV2ZW50XG4gICAgICB2YXIgJGV2ZW50ID0galF1ZXJ5LkV2ZW50KCBldmVudCApO1xuICAgICAgJGV2ZW50LnR5cGUgPSB0eXBlO1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCAkZXZlbnQsIGFyZ3MgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8ganVzdCB0cmlnZ2VyIHdpdGggdHlwZSBpZiBubyBldmVudCBhdmFpbGFibGVcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggdHlwZSwgYXJncyApO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaWdub3JlICYgc3RhbXBzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cblxuLyoqXG4gKiBrZWVwIGl0ZW0gaW4gY29sbGVjdGlvbiwgYnV0IGRvIG5vdCBsYXkgaXQgb3V0XG4gKiBpZ25vcmVkIGl0ZW1zIGRvIG5vdCBnZXQgc2tpcHBlZCBpbiBsYXlvdXRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICovXG5wcm90by5pZ25vcmUgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgaWYgKCBpdGVtICkge1xuICAgIGl0ZW0uaXNJZ25vcmVkID0gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiByZXR1cm4gaXRlbSB0byBsYXlvdXQgY29sbGVjdGlvblxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKi9cbnByb3RvLnVuaWdub3JlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIGlmICggaXRlbSApIHtcbiAgICBkZWxldGUgaXRlbS5pc0lnbm9yZWQ7XG4gIH1cbn07XG5cbi8qKlxuICogYWRkcyBlbGVtZW50cyB0byBzdGFtcHNcbiAqIEBwYXJhbSB7Tm9kZUxpc3QsIEFycmF5LCBFbGVtZW50LCBvciBTdHJpbmd9IGVsZW1zXG4gKi9cbnByb3RvLnN0YW1wID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBlbGVtcyA9IHRoaXMuX2ZpbmQoIGVsZW1zICk7XG4gIGlmICggIWVsZW1zICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuc3RhbXBzID0gdGhpcy5zdGFtcHMuY29uY2F0KCBlbGVtcyApO1xuICAvLyBpZ25vcmVcbiAgZWxlbXMuZm9yRWFjaCggdGhpcy5pZ25vcmUsIHRoaXMgKTtcbn07XG5cbi8qKlxuICogcmVtb3ZlcyBlbGVtZW50cyB0byBzdGFtcHNcbiAqIEBwYXJhbSB7Tm9kZUxpc3QsIEFycmF5LCBvciBFbGVtZW50fSBlbGVtc1xuICovXG5wcm90by51bnN0YW1wID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBlbGVtcyA9IHRoaXMuX2ZpbmQoIGVsZW1zICk7XG4gIGlmICggIWVsZW1zICl7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgLy8gZmlsdGVyIG91dCByZW1vdmVkIHN0YW1wIGVsZW1lbnRzXG4gICAgdXRpbHMucmVtb3ZlRnJvbSggdGhpcy5zdGFtcHMsIGVsZW0gKTtcbiAgICB0aGlzLnVuaWdub3JlKCBlbGVtICk7XG4gIH0sIHRoaXMgKTtcbn07XG5cbi8qKlxuICogZmluZHMgY2hpbGQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Tm9kZUxpc3QsIEFycmF5LCBFbGVtZW50LCBvciBTdHJpbmd9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGVsZW1zXG4gKi9cbnByb3RvLl9maW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBpZiAoICFlbGVtcyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gaWYgc3RyaW5nLCB1c2UgYXJndW1lbnQgYXMgc2VsZWN0b3Igc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW1zID09ICdzdHJpbmcnICkge1xuICAgIGVsZW1zID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGVsZW1zICk7XG4gIH1cbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHJldHVybiBlbGVtcztcbn07XG5cbnByb3RvLl9tYW5hZ2VTdGFtcHMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5zdGFtcHMgfHwgIXRoaXMuc3RhbXBzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9nZXRCb3VuZGluZ1JlY3QoKTtcblxuICB0aGlzLnN0YW1wcy5mb3JFYWNoKCB0aGlzLl9tYW5hZ2VTdGFtcCwgdGhpcyApO1xufTtcblxuLy8gdXBkYXRlIGJvdW5kaW5nTGVmdCAvIFRvcFxucHJvdG8uX2dldEJvdW5kaW5nUmVjdCA9IGZ1bmN0aW9uKCkge1xuICAvLyBnZXQgYm91bmRpbmcgcmVjdCBmb3IgY29udGFpbmVyIGVsZW1lbnRcbiAgdmFyIGJvdW5kaW5nUmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNpemUgPSB0aGlzLnNpemU7XG4gIHRoaXMuX2JvdW5kaW5nUmVjdCA9IHtcbiAgICBsZWZ0OiBib3VuZGluZ1JlY3QubGVmdCArIHNpemUucGFkZGluZ0xlZnQgKyBzaXplLmJvcmRlckxlZnRXaWR0aCxcbiAgICB0b3A6IGJvdW5kaW5nUmVjdC50b3AgKyBzaXplLnBhZGRpbmdUb3AgKyBzaXplLmJvcmRlclRvcFdpZHRoLFxuICAgIHJpZ2h0OiBib3VuZGluZ1JlY3QucmlnaHQgLSAoIHNpemUucGFkZGluZ1JpZ2h0ICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoICksXG4gICAgYm90dG9tOiBib3VuZGluZ1JlY3QuYm90dG9tIC0gKCBzaXplLnBhZGRpbmdCb3R0b20gKyBzaXplLmJvcmRlckJvdHRvbVdpZHRoIClcbiAgfTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBzdGFtcFxuKiovXG5wcm90by5fbWFuYWdlU3RhbXAgPSBub29wO1xuXG4vKipcbiAqIGdldCB4L3kgcG9zaXRpb24gb2YgZWxlbWVudCByZWxhdGl2ZSB0byBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvZmZzZXQgLSBoYXMgbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXG4gKi9cbnByb3RvLl9nZXRFbGVtZW50T2Zmc2V0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBib3VuZGluZ1JlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgdGhpc1JlY3QgPSB0aGlzLl9ib3VuZGluZ1JlY3Q7XG4gIHZhciBzaXplID0gZ2V0U2l6ZSggZWxlbSApO1xuICB2YXIgb2Zmc2V0ID0ge1xuICAgIGxlZnQ6IGJvdW5kaW5nUmVjdC5sZWZ0IC0gdGhpc1JlY3QubGVmdCAtIHNpemUubWFyZ2luTGVmdCxcbiAgICB0b3A6IGJvdW5kaW5nUmVjdC50b3AgLSB0aGlzUmVjdC50b3AgLSBzaXplLm1hcmdpblRvcCxcbiAgICByaWdodDogdGhpc1JlY3QucmlnaHQgLSBib3VuZGluZ1JlY3QucmlnaHQgLSBzaXplLm1hcmdpblJpZ2h0LFxuICAgIGJvdHRvbTogdGhpc1JlY3QuYm90dG9tIC0gYm91bmRpbmdSZWN0LmJvdHRvbSAtIHNpemUubWFyZ2luQm90dG9tXG4gIH07XG4gIHJldHVybiBvZmZzZXQ7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSByZXNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZW5hYmxlIGV2ZW50IGhhbmRsZXJzIGZvciBsaXN0ZW5lcnNcbi8vIGkuZS4gcmVzaXplIC0+IG9ucmVzaXplXG5wcm90by5oYW5kbGVFdmVudCA9IHV0aWxzLmhhbmRsZUV2ZW50O1xuXG4vKipcbiAqIEJpbmQgbGF5b3V0IHRvIHdpbmRvdyByZXNpemluZ1xuICovXG5wcm90by5iaW5kUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcyApO1xuICB0aGlzLmlzUmVzaXplQm91bmQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBVbmJpbmQgbGF5b3V0IHRvIHdpbmRvdyByZXNpemluZ1xuICovXG5wcm90by51bmJpbmRSZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIHRoaXMuaXNSZXNpemVCb3VuZCA9IGZhbHNlO1xufTtcblxucHJvdG8ub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZXNpemUoKTtcbn07XG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kKCBPdXRsYXllciwgJ29ucmVzaXplJywgMTAwICk7XG5cbnByb3RvLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBkb24ndCB0cmlnZ2VyIGlmIHNpemUgZGlkIG5vdCBjaGFuZ2VcbiAgLy8gb3IgaWYgcmVzaXplIHdhcyB1bmJvdW5kLiBTZWUgIzlcbiAgaWYgKCAhdGhpcy5pc1Jlc2l6ZUJvdW5kIHx8ICF0aGlzLm5lZWRzUmVzaXplTGF5b3V0KCkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5sYXlvdXQoKTtcbn07XG5cbi8qKlxuICogY2hlY2sgaWYgbGF5b3V0IGlzIG5lZWRlZCBwb3N0IGxheW91dFxuICogQHJldHVybnMgQm9vbGVhblxuICovXG5wcm90by5uZWVkc1Jlc2l6ZUxheW91dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xuICAvLyBjaGVjayB0aGF0IHRoaXMuc2l6ZSBhbmQgc2l6ZSBhcmUgdGhlcmVcbiAgLy8gSUU4IHRyaWdnZXJzIHJlc2l6ZSBvbiBib2R5IHNpemUgY2hhbmdlLCBzbyB0aGV5IG1pZ2h0IG5vdCBiZVxuICB2YXIgaGFzU2l6ZXMgPSB0aGlzLnNpemUgJiYgc2l6ZTtcbiAgcmV0dXJuIGhhc1NpemVzICYmIHNpemUuaW5uZXJXaWR0aCAhPT0gdGhpcy5zaXplLmlubmVyV2lkdGg7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogYWRkIGl0ZW1zIHRvIE91dGxheWVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zIC0gT3V0bGF5ZXIuSXRlbXNcbioqL1xucHJvdG8uYWRkSXRlbXMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBpdGVtcyA9IHRoaXMuX2l0ZW1pemUoIGVsZW1zICk7XG4gIC8vIGFkZCBpdGVtcyB0byBjb2xsZWN0aW9uXG4gIGlmICggaXRlbXMubGVuZ3RoICkge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmNvbmNhdCggaXRlbXMgKTtcbiAgfVxuICByZXR1cm4gaXRlbXM7XG59O1xuXG4vKipcbiAqIExheW91dCBuZXdseS1hcHBlbmRlZCBpdGVtIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbnByb3RvLmFwcGVuZGVkID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgaXRlbXMgPSB0aGlzLmFkZEl0ZW1zKCBlbGVtcyApO1xuICBpZiAoICFpdGVtcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGxheW91dCBhbmQgcmV2ZWFsIGp1c3QgdGhlIG5ldyBpdGVtc1xuICB0aGlzLmxheW91dEl0ZW1zKCBpdGVtcywgdHJ1ZSApO1xuICB0aGlzLnJldmVhbCggaXRlbXMgKTtcbn07XG5cbi8qKlxuICogTGF5b3V0IHByZXBlbmRlZCBlbGVtZW50c1xuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBFbGVtZW50fSBlbGVtc1xuICovXG5wcm90by5wcmVwZW5kZWQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBpdGVtcyA9IHRoaXMuX2l0ZW1pemUoIGVsZW1zICk7XG4gIGlmICggIWl0ZW1zLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYWRkIGl0ZW1zIHRvIGJlZ2lubmluZyBvZiBjb2xsZWN0aW9uXG4gIHZhciBwcmV2aW91c0l0ZW1zID0gdGhpcy5pdGVtcy5zbGljZSgwKTtcbiAgdGhpcy5pdGVtcyA9IGl0ZW1zLmNvbmNhdCggcHJldmlvdXNJdGVtcyApO1xuICAvLyBzdGFydCBuZXcgbGF5b3V0XG4gIHRoaXMuX3Jlc2V0TGF5b3V0KCk7XG4gIHRoaXMuX21hbmFnZVN0YW1wcygpO1xuICAvLyBsYXlvdXQgbmV3IHN0dWZmIHdpdGhvdXQgdHJhbnNpdGlvblxuICB0aGlzLmxheW91dEl0ZW1zKCBpdGVtcywgdHJ1ZSApO1xuICB0aGlzLnJldmVhbCggaXRlbXMgKTtcbiAgLy8gbGF5b3V0IHByZXZpb3VzIGl0ZW1zXG4gIHRoaXMubGF5b3V0SXRlbXMoIHByZXZpb3VzSXRlbXMgKTtcbn07XG5cbi8qKlxuICogcmV2ZWFsIGEgY29sbGVjdGlvbiBvZiBpdGVtc1xuICogQHBhcmFtIHtBcnJheSBvZiBPdXRsYXllci5JdGVtc30gaXRlbXNcbiAqL1xucHJvdG8ucmV2ZWFsID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuICB0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKCAncmV2ZWFsJywgaXRlbXMgKTtcbiAgaWYgKCAhaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHN0YWdnZXIgPSB0aGlzLnVwZGF0ZVN0YWdnZXIoKTtcbiAgaXRlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGl0ZW0sIGkgKSB7XG4gICAgaXRlbS5zdGFnZ2VyKCBpICogc3RhZ2dlciApO1xuICAgIGl0ZW0ucmV2ZWFsKCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBoaWRlIGEgY29sbGVjdGlvbiBvZiBpdGVtc1xuICogQHBhcmFtIHtBcnJheSBvZiBPdXRsYXllci5JdGVtc30gaXRlbXNcbiAqL1xucHJvdG8uaGlkZSA9IGZ1bmN0aW9uKCBpdGVtcyApIHtcbiAgdGhpcy5fZW1pdENvbXBsZXRlT25JdGVtcyggJ2hpZGUnLCBpdGVtcyApO1xuICBpZiAoICFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgc3RhZ2dlciA9IHRoaXMudXBkYXRlU3RhZ2dlcigpO1xuICBpdGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSwgaSApIHtcbiAgICBpdGVtLnN0YWdnZXIoIGkgKiBzdGFnZ2VyICk7XG4gICAgaXRlbS5oaWRlKCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiByZXZlYWwgaXRlbSBlbGVtZW50c1xuICogQHBhcmFtIHtBcnJheX0sIHtFbGVtZW50fSwge05vZGVMaXN0fSBpdGVtc1xuICovXG5wcm90by5yZXZlYWxJdGVtRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXMoIGVsZW1zICk7XG4gIHRoaXMucmV2ZWFsKCBpdGVtcyApO1xufTtcblxuLyoqXG4gKiBoaWRlIGl0ZW0gZWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXl9LCB7RWxlbWVudH0sIHtOb2RlTGlzdH0gaXRlbXNcbiAqL1xucHJvdG8uaGlkZUl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5nZXRJdGVtcyggZWxlbXMgKTtcbiAgdGhpcy5oaWRlKCBpdGVtcyApO1xufTtcblxuLyoqXG4gKiBnZXQgT3V0bGF5ZXIuSXRlbSwgZ2l2ZW4gYW4gRWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqL1xucHJvdG8uZ2V0SXRlbSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBsb29wIHRocm91Z2ggaXRlbXMgdG8gZ2V0IHRoZSBvbmUgdGhhdCBtYXRjaGVzXG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICBpZiAoIGl0ZW0uZWxlbWVudCA9PSBlbGVtICkge1xuICAgICAgLy8gcmV0dXJuIGl0ZW1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgY29sbGVjdGlvbiBvZiBPdXRsYXllci5JdGVtcywgZ2l2ZW4gRWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXl9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zIC0gT3V0bGF5ZXIuSXRlbXNcbiAqL1xucHJvdG8uZ2V0SXRlbXMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgICBpZiAoIGl0ZW0gKSB7XG4gICAgICBpdGVtcy5wdXNoKCBpdGVtICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG5cbiAgcmV0dXJuIGl0ZW1zO1xufTtcblxuLyoqXG4gKiByZW1vdmUgZWxlbWVudChzKSBmcm9tIGluc3RhbmNlIGFuZCBET01cbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqL1xucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgcmVtb3ZlSXRlbXMgPSB0aGlzLmdldEl0ZW1zKCBlbGVtcyApO1xuXG4gIHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoICdyZW1vdmUnLCByZW1vdmVJdGVtcyApO1xuXG4gIC8vIGJhaWwgaWYgbm8gaXRlbXMgdG8gcmVtb3ZlXG4gIGlmICggIXJlbW92ZUl0ZW1zIHx8ICFyZW1vdmVJdGVtcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmVtb3ZlSXRlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGl0ZW0gKSB7XG4gICAgaXRlbS5yZW1vdmUoKTtcbiAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNvbGxlY3Rpb25cbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLml0ZW1zLCBpdGVtICk7XG4gIH0sIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tIGRlc3Ryb3kgLS0tLS0gLy9cblxuLy8gcmVtb3ZlIGFuZCBkaXNhYmxlIE91dGxheWVyIGluc3RhbmNlXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNsZWFuIHVwIGR5bmFtaWMgc3R5bGVzXG4gIHZhciBzdHlsZSA9IHRoaXMuZWxlbWVudC5zdHlsZTtcbiAgc3R5bGUuaGVpZ2h0ID0gJyc7XG4gIHN0eWxlLnBvc2l0aW9uID0gJyc7XG4gIHN0eWxlLndpZHRoID0gJyc7XG4gIC8vIGRlc3Ryb3kgaXRlbXNcbiAgdGhpcy5pdGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSApIHtcbiAgICBpdGVtLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgdGhpcy51bmJpbmRSZXNpemUoKTtcblxuICB2YXIgaWQgPSB0aGlzLmVsZW1lbnQub3V0bGF5ZXJHVUlEO1xuICBkZWxldGUgaW5zdGFuY2VzWyBpZCBdOyAvLyByZW1vdmUgcmVmZXJlbmNlIHRvIGluc3RhbmNlIGJ5IGlkXG4gIGRlbGV0ZSB0aGlzLmVsZW1lbnQub3V0bGF5ZXJHVUlEO1xuICAvLyByZW1vdmUgZGF0YSBmb3IgalF1ZXJ5XG4gIGlmICggalF1ZXJ5ICkge1xuICAgIGpRdWVyeS5yZW1vdmVEYXRhKCB0aGlzLmVsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IubmFtZXNwYWNlICk7XG4gIH1cblxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGF0YSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldCBPdXRsYXllciBpbnN0YW5jZSBmcm9tIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge091dGxheWVyfVxuICovXG5PdXRsYXllci5kYXRhID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGVsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW0gKTtcbiAgdmFyIGlkID0gZWxlbSAmJiBlbGVtLm91dGxheWVyR1VJRDtcbiAgcmV0dXJuIGlkICYmIGluc3RhbmNlc1sgaWQgXTtcbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY3JlYXRlIE91dGxheWVyIGNsYXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogY3JlYXRlIGEgbGF5b3V0IGNsYXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKi9cbk91dGxheWVyLmNyZWF0ZSA9IGZ1bmN0aW9uKCBuYW1lc3BhY2UsIG9wdGlvbnMgKSB7XG4gIC8vIHN1Yi1jbGFzcyBPdXRsYXllclxuICB2YXIgTGF5b3V0ID0gc3ViY2xhc3MoIE91dGxheWVyICk7XG4gIC8vIGFwcGx5IG5ldyBvcHRpb25zIGFuZCBjb21wYXRPcHRpb25zXG4gIExheW91dC5kZWZhdWx0cyA9IHV0aWxzLmV4dGVuZCgge30sIE91dGxheWVyLmRlZmF1bHRzICk7XG4gIHV0aWxzLmV4dGVuZCggTGF5b3V0LmRlZmF1bHRzLCBvcHRpb25zICk7XG4gIExheW91dC5jb21wYXRPcHRpb25zID0gdXRpbHMuZXh0ZW5kKCB7fSwgT3V0bGF5ZXIuY29tcGF0T3B0aW9ucyAgKTtcblxuICBMYXlvdXQubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXG4gIExheW91dC5kYXRhID0gT3V0bGF5ZXIuZGF0YTtcblxuICAvLyBzdWItY2xhc3MgSXRlbVxuICBMYXlvdXQuSXRlbSA9IHN1YmNsYXNzKCBJdGVtICk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGVjbGFyYXRpdmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICB1dGlscy5odG1sSW5pdCggTGF5b3V0LCBuYW1lc3BhY2UgKTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBqUXVlcnkgYnJpZGdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgLy8gbWFrZSBpbnRvIGpRdWVyeSBwbHVnaW5cbiAgaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gICAgalF1ZXJ5LmJyaWRnZXQoIG5hbWVzcGFjZSwgTGF5b3V0ICk7XG4gIH1cblxuICByZXR1cm4gTGF5b3V0O1xufTtcblxuZnVuY3Rpb24gc3ViY2xhc3MoIFBhcmVudCApIHtcbiAgZnVuY3Rpb24gU3ViQ2xhc3MoKSB7XG4gICAgUGFyZW50LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgfVxuXG4gIFN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFBhcmVudC5wcm90b3R5cGUgKTtcbiAgU3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViQ2xhc3M7XG5cbiAgcmV0dXJuIFN1YkNsYXNzO1xufVxuXG4vLyAtLS0tLSBoZWxwZXJzIC0tLS0tIC8vXG5cbi8vIGhvdyBtYW55IG1pbGxpc2Vjb25kcyBhcmUgaW4gZWFjaCB1bml0XG52YXIgbXNVbml0cyA9IHtcbiAgbXM6IDEsXG4gIHM6IDEwMDBcbn07XG5cbi8vIG11bmdlIHRpbWUtbGlrZSBwYXJhbWV0ZXIgaW50byBtaWxsaXNlY29uZCBudW1iZXJcbi8vICcwLjRzJyAtPiA0MFxuZnVuY3Rpb24gZ2V0TWlsbGlzZWNvbmRzKCB0aW1lICkge1xuICBpZiAoIHR5cGVvZiB0aW1lID09ICdudW1iZXInICkge1xuICAgIHJldHVybiB0aW1lO1xuICB9XG4gIHZhciBtYXRjaGVzID0gdGltZS5tYXRjaCggLyheXFxkKlxcLj9cXGQqKShcXHcqKS8gKTtcbiAgdmFyIG51bSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1sxXTtcbiAgdmFyIHVuaXQgPSBtYXRjaGVzICYmIG1hdGNoZXNbMl07XG4gIGlmICggIW51bS5sZW5ndGggKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgbnVtID0gcGFyc2VGbG9hdCggbnVtICk7XG4gIHZhciBtdWx0ID0gbXNVbml0c1sgdW5pdCBdIHx8IDE7XG4gIHJldHVybiBudW0gKiBtdWx0O1xufVxuXG4vLyAtLS0tLSBmaW4gLS0tLS0gLy9cblxuLy8gYmFjayBpbiBnbG9iYWxcbk91dGxheWVyLkl0ZW0gPSBJdGVtO1xuXG5yZXR1cm4gT3V0bGF5ZXI7XG5cbn0pKTtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImZ1bmN0aW9uIF90eXBlb2Yobykge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5leHBvcnQgeyBfdHlwZW9mIGFzIGRlZmF1bHQgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc2Nzcy9zdHlsZS5zY3NzJztcclxuaW1wb3J0IENyZWF0ZSBmcm9tICcuL21vZHVsZXMvY3JlYXRlLmpzJztcclxuaW1wb3J0IFByb2plY3QgZnJvbSAnLi9tb2R1bGVzL3Byb2plY3QuanMnO1xyXG5pbXBvcnQgVG9kbyBmcm9tICcuL21vZHVsZXMvdG9kby5qcyc7XHJcbmltcG9ydCBET00gZnJvbSAnLi9tb2R1bGVzL2RvbS5qcyc7XHJcblxyXG5jb25zdCBkb21DbCA9IG5ldyBET00oKTtcclxuY29uc3QgY3JlYXRlQ2wgPSBuZXcgQ3JlYXRlKCk7XHJcblxyXG5jb25zdCBhcmdzID0ge1xyXG4gIGNyZWF0ZUNsYXNzOiBjcmVhdGVDbCxcclxuICBwcm9qZWN0Q2xhc3M6IFByb2plY3QsXHJcbiAgdG9kb0NsYXNzOiBUb2RvLFxyXG4gIHRvZG9BcnI6IGNyZWF0ZUNsLmZpbHRlclRhc2tzQnlUeXBlKCd0b2RvJyksXHJcbiAgcHJvamVjdEFycjogY3JlYXRlQ2wuZmlsdGVyVGFza3NCeVR5cGUoJ3Byb2plY3QnKSxcclxufTtcclxuXHJcbmRvbUNsLmluaXRpYWxpemVNZXRob2RzKGFyZ3MpO1xyXG4iXSwibmFtZXMiOlsiQ3JlYXRlIiwidGFza3NBcnIiLCJjb25zdHJ1Y3RvciIsImdldExvY2FsRGF0YSIsInN0b3JlRWxlbWVudCIsImVsIiwicHVzaCIsInNhdmVUYXNrc0luTG9jYWwiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvY2FsRGF0YSIsImdldEl0ZW0iLCJwYXJzZSIsImdldFRhc2tzIiwiaXNOdW1iZXIiLCJ2YXJpYWJsZSIsImZpbHRlclRhc2tzQnlUeXBlIiwidHlwZSIsImZpbHRlciIsIm9iaiIsImdldENsaWNrZWRFbGVtZW50IiwiZXYiLCJhcnIiLCJjbG9zZXN0VG9kbyIsInRhcmdldCIsImNsb3Nlc3QiLCJjbG9zZXN0UHJvamVjdCIsInRvZG8iLCJwcm9qZWN0IiwicHJvamVjdERhdGEiLCJmaW5kIiwiaWQiLCJkYXRhc2V0IiwidGFza3MiLCJlbGVtZW50IiwidG9kb0VsIiwicHJvamVjdEVsIiwiZ2V0Q2xpY2tlZEVsZW1lbnRJbmRleCIsImNsaWNrZWRFTCIsInRvZG9JblByb2plY3RJbmRleCIsImZpbmRJbmRleCIsInRvZG9PclByb2plY3RJbmRleCIsInVwZGF0ZUVsZW1lbnRJbkFycmF5IiwibmV3VGFzayIsInRJbmRleCIsInBJbmRleCIsInJlbW92ZUVsZW1lbnRGcm9tQXJyYXkiLCJzcGxpY2UiLCJmaWx0ZXJQcm9qZWN0c0J5RHVlRGF0ZSIsImRhdGVJbnRlcnZhbCIsIm1hcCIsIm5ld1Rhc2tzIiwiZHVlRGF0ZSIsImxlbmd0aCIsImZpbHRlclRvZG9zQnlEdWVEYXRlIiwiaW5zZXJ0SHRtbCIsInBhcmVudEVsIiwiaHRtbCIsImluc2VydEFkamFjZW50SFRNTCIsImlzVG9kYXkiLCJpc1RoaXNXZWVrIiwiZG9tTWFuYWdlciIsIk1hc29ucnkiLCJET00iLCJjbGlja2VkRWxEYXRhIiwibWFzb25yeSIsImFsbEVsZW1lbnRzIiwiaGFuZGxlTWFzb25yeUxheW91dCIsImVsZW1lbnRTZWxlY3RvciIsIm1haW5FbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm0iLCJtb2RhbCIsImFzaWRlRWwiLCJmaWVsZHNldFJhZGlvIiwicHJvamVjdEVMIiwiaW5wdXRTZWxlY3RvciIsImlucHV0UHJvamVjdCIsImlucHV0VG9kbyIsImlucHV0VGl0bGUiLCJpbnB1dENvbnRlbnQiLCJpbnB1dERhdGUiLCJidXR0b25TZWxlY3RvciIsImJ0blNob3dBbGwiLCJidG5Ub2RheSIsImJ0blByb2plY3RUb2RheSIsImJ0blRvZG9Ub2RheSIsImJ0bldlZWsiLCJidG5Qcm9qZWN0V2VlayIsImJ0blRvZG9XZWVrIiwiYnRuT3Blbk1vZGFsIiwiYnRuQ2xvc2VNb2RhbCIsImJ0blN1Ym1pdCIsImJ0bk1vYmlsZU1lbnUiLCJpdGVtU2VsZWN0b3IiLCJjb2x1bW5XaWR0aCIsInBlcmNlbnRQb3NpdGlvbiIsImd1dHRlciIsInRyYW5zaXRpb25EdXJhdGlvbiIsImhhbmRsZUZvcm1DcmVhdGVNb2RlIiwiY3JlYXRlQ2xhc3MiLCJwcm9qZWN0Q2xhc3MiLCJ0b2RvQ2xhc3MiLCJpbnB1dCIsImdldE1vZGFsSW5wdXRWYWx1ZXMiLCJjaGVja2VkIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImRhdGUiLCJwcm9qZWN0SFRNTCIsInRvZG9IVE1MIiwic3RvcmVUb2RvSW5UYXNrcyIsInByZXBlbmRlZCIsImhhbmRsZUZvcm1BZGRUb2RvTW9kZSIsInBEYXRhIiwiZWxEYXRhIiwiaW5kZXgiLCJodG1sRWwiLCJjbGVhck1haW5Db250ZW50IiwiYnRuIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVGb3JtRWRpdE1vZGUiLCJ0b2RvSWQiLCJ0b2RvSW5kZXgiLCJwcm9qZWN0SW5kZXgiLCJ0YXJnZXRFbCIsInVwZGF0ZURPTUVsZW1lbnQiLCJyZW1vdmUiLCJ1cGRhdGVNb2RhbEZvckFkZFRvZG9Nb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ0blR5cGUiLCJsYWJlbHMiLCJjbGFzc0xpc3QiLCJhZGQiLCJ2YWx1ZSIsInNldEF0dHJpYnV0ZSIsInVwZGF0ZU1vZGFsRm9yRWRpdE1vZGUiLCJjb250YWlucyIsInZhbHVlQXNOdW1iZXIiLCJzYXZlQ2xpY2tlZEh0bWxFbERhdGEiLCJjbGFzc0xpc3RBcnJheSIsImhhc0NsYXNzSW5BcnJheSIsImV2ZW50Iiwic29tZSIsIm5hbWUiLCJlbEluZGV4IiwicHJvamVjdEFuZFRvZG8iLCJnZXREZWZpbmVkRW50cmllcyIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsIl9yZWYiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlRm9ybU1vZGVzIiwicHJldmVudERlZmF1bHQiLCJtb2RlIiwibGF5b3V0IiwicmVtb3ZlQ2xpY2tlZEVsZW1lbnQiLCJldlRhcmdldEVsIiwic2V0TWluRGF0ZSIsImN1cnJlbnREYXRlIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwic3BsaXQiLCJkaXNwbGF5VG9kbyIsInRvZG9BcnIiLCJmb3JFYWNoIiwiY29tcGxldGVkIiwiYXBwZW5kZWQiLCJkaXNwbGF5UHJvamVjdCIsInByb2plY3RBcnIiLCJ0YXNrIiwiY2hlY2tib3hFdmVudEhhbmRsZXIiLCJtYWluRUwiLCJkYXRhIiwiY2hhbmdlQ29tcGxldGVkIiwiZGlzcGxheUZpbHRlcmVkQnlUeXBlIiwiZmlsdGVyVG9kbyIsImJ1dHRvbiIsImZpbHRlclByb2plY3QiLCJfcmVmMiIsImZpbHRlcmVkVG9kb3MiLCJfcmVmMyIsImZpbHRlcmVkUHJvamVjdHMiLCJkaXNwbGF5RmlsdGVyQnlUaW1lIiwiZmlsdGVyQnlUaW1lIiwiX3JlZjQiLCJkaXNwbGF5QWxsIiwiYXJyVG9kb3MiLCJhcnJQcm9qZWN0cyIsImluaXRpYWxpemVNZXRob2RzIiwiX3JlZjUiLCJET01NYW5hZ2VyIiwiZWxlbWVudHMiLCJpbml0TWV0aG9kcyIsIm1vZGFsRXZlbnRzTGlzdGVuZXJzIiwidG9nZ2xlTW9iaWxlTWVudSIsImlucHV0U3RhdGVFdmVudExpc3RlbmVyIiwiZmxvYXRMYWJlbHMiLCJ0b2dnbGVBZGRFZGl0VG9kb1Byb3BlcnRpZXMiLCJjaGVja1JhZGlvVmFsaWRpdHkiLCJyZXNldE1vZGFsIiwicmVzZXQiLCJzdHlsZSIsInJlbW92ZVByb3BlcnR5IiwicmVtb3ZlQXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJ3aW5kb3ciLCJlIiwiZGlzcGxheSIsInRvZ2dsZSIsInVwZGF0ZUlucHV0U3RhdGUiLCJiaW5kIiwidXBkYXRlTGFiZWwiLCJjaGFuZ2VQcm9wZXJ0aWVzIiwiYnRuVGV4dCIsInBvaW50ZXJFdmVudHMiLCJyYWRpb3MiLCJjaGFuZ2VSYWRpb1ZhbGlkaXR5IiwiaXNUcnVlIiwicmFkaW8iLCJldkRhdGFTZXQiLCJQcm9qZWN0IiwiZ2V0VGltZSIsImFyZ3VtZW50cyIsImZvcm1hdCIsImlzVGhpc1llYXIiLCJUb2RvIiwiZm9ybWF0dGVkRGF0ZSIsImRvbUNsIiwiY3JlYXRlQ2wiLCJhcmdzIl0sInNvdXJjZVJvb3QiOiIifQ==