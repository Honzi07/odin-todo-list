export default class DOM {
  clickedElData;
  constructor() {}

  get elementSelector() {
    const mainEl = document.querySelector('main');
    const form = document.querySelector('#modal-form');
    const inputProject = document.querySelector('#project');
    const inputTodo = document.querySelector('#todo');
    const inputTitle = document.querySelector('#title');
    const inputContent = document.querySelector('#content');
    const inputDate = document.querySelector('#date');

    return {
      mainEl,
      form,
      inputProject,
      inputTodo,
      inputTitle,
      inputContent,
      inputDate,
    };
  }

  handleFormCreateMode(createClass, projectClass, todoClass) {
    const { mainEl, inputProject, inputTodo } = this.elementSelector;
    const input = this.getModalInputValues();

    if (inputProject.checked) {
      const project = new projectClass(input.title);
      const todo = new todoClass(input.description, input.date);
      project.insertHtml(mainEl, project.projectHTML(todo.todoHTML()));
      project.storeTodoInTasks(todo);
      createClass.storeElement(project);
    }

    if (inputTodo.checked) {
      const todo = new todoClass(input.description, input.date);
      todo.insertHtml(mainEl, todo.todoHTML());
      createClass.storeElement(todo);
    }
  }

  handleFormAddMode(createClass, projectClass, todoClass) {
    const input = this.getModalInputValues();
    const pData = this.clickedElData.project;

    const project = new projectClass(pData.title, pData.tasks, pData.id);
    const todo = new todoClass(input.description, input.date);

    this.clickedElData.htmlEl.projectEl.insertAdjacentHTML(
      'beforeend',
      todo.todoHTML()
    );

    project.storeTodoInTasks(todo);
    createClass.getTasks.splice(this.clickedElData.elIndex, 1);
    createClass.storeElement(project);
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
    createClass.updateElementInArray(todo, arr, todoIndex, projectIndex);
  }

  updateModalForEditMode() {
    const el = this.elementSelector;
    el.mainEl.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('todo-btn-edit')) {
        const elData = this.clickedElData.elData;

        if (elData.project) {
          el.inputTitle.value = elData.project.title;
        }

        el.inputContent.value = elData.todo.description;
        el.inputDate.valueAsNumber = elData.todo.dueDate;
      }
    });
  }

  saveClickedHtmlElData(createClass) {
    const mainEl = this.elementSelector.mainEl;

    const classListArray = [
      'todo-btn-edit',
      'btn-add-project-todo',
      'todo-btn-delete',
      'project-delete',
      'todo-checkbox',
    ];
    const hasClassInArray = (event) =>
      classListArray.some((name) => event.target.classList.contains(name));

    mainEl.addEventListener('click', (ev) => {
      if (hasClassInArray(ev)) {
        const elIndex = createClass.getClickedElementIndex(
          ev,
          createClass.getTasks
        );

        const { element, ...projectAndTodo } = createClass.getClickedElement(
          ev,
          createClass.getTasks
        );

        // const getDefinedEntries = (variable) => {
        //   const testObj = {};
        //   for (const [key, value] of Object.entries(variable)) {
        //     if (value !== undefined && value !== null) {
        //       testObj[key] = value;
        //     }
        //   }
        //   return testObj;
        // };

        const getDefinedEntries = (variable) => {
          return Object.fromEntries(
            Object.entries(variable).filter(
              ([, value]) => value !== undefined && value !== null
            )
          );
        };

        this.clickedElData = {
          index: getDefinedEntries(elIndex),
          elData: getDefinedEntries(projectAndTodo),
          htmlEl: getDefinedEntries(element),
        };
        console.log(this.clickedElData);
      }
    });
  }

  handleCreationForm(createClass, projectClass, todoClass) {
    const form = this.elementSelector.form;

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();

      if (form.dataset.mode === 'create') {
        this.handleFormCreateMode(createClass, projectClass, todoClass);
      } else if (form.dataset.mode === 'add-todo') {
        this.handleFormAddMode(createClass, projectClass, todoClass);
      } else if (form.dataset.mode === 'edit') {
        this.handleFormEditMode(createClass, todoClass);
      }

      createClass.saveTasksInLocal();
    });
  }

  removeClickedElement(createClass, arr) {
    const mainEl = this.elementSelector.mainEl;
    mainEl.addEventListener('click', (ev) => {
      if (
        ev.target.classList.contains('todo-btn-delete') ||
        ev.target.classList.contains('project-delete')
      ) {
        const evTargetEl =
          ev.target.closest('.todo') || ev.target.closest('.project');
        evTargetEl.remove();

        const index = this.clickedElData.index;
        createClass.removeElementFromArray(arr, index.todo, index.project);

        createClass.saveTasksInLocal();
      }
    });
  }

  getModalInputValues() {
    const inputTitle = document.querySelector('#title');
    const inputContent = document.querySelector('#content');
    const inputDate = document.querySelector('#date');

    return {
      title: inputTitle.value,
      description: inputContent.value,
      date: inputDate.valueAsNumber,
    };
  }

  displayTodo(arr, todoClass) {
    const mainEl = document.querySelector('main');
    arr.forEach((el) => {
      const todo = new todoClass(
        el.description,
        el.dueDate,
        el.id,
        el.completed
      );
      todo.insertHtml(mainEl, todo.todoHTML());
    });
  }

  displayProject(arr, projectClass, todoClass) {
    const mainEl = document.querySelector('main');

    arr.forEach((el) => {
      const project = new projectClass(el.title, el.tasks, el.id);
      project.insertHtml(mainEl, project.projectHTML());
      const projectEL = document.querySelector('.project');

      project.tasks.forEach((task) => {
        const todo = new todoClass(
          task.description,
          task.dueDate,
          task.id,
          task.completed
        );
        projectEL.insertAdjacentHTML('beforeend', todo.todoHTML());
      });
    });
  }

  checkboxEventHandler(createClass, todoClass) {
    const mainEL = this.elementSelector.mainEl;

    mainEL.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('todo-checkbox')) {
        const data = this.clickedElData.elData.todo;
        const index = this.clickedElData.index;
        const todoEl = this.clickedElData.htmlEl.todoEl;

        const todo = new todoClass(
          data.description,
          data.dueDate,
          data.id,
          data.completed
        );
        todo.changeCompleted();
        todo.updateDOMElement(todoEl);
        todoEl.insertAdjacentHTML('beforebegin', todo.todoHTML());
        todoEl.remove();

        createClass.updateElementInArray(
          todo,
          createClass.getTasks,
          index.todo,
          index.project
        );

        createClass.saveTasksInLocal();
      }
    });
  }
}
