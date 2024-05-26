export default class DOM {
  clickedElData;
  constructor() {}

  get elementSelector() {
    const mainEl = document.querySelector('main');
    const form = document.querySelector('#modal-form');
    const inputProject = document.querySelector('#project');
    const inputTodo = document.querySelector('#todo');
    const inputTitle = document.querySelector('#title');

    return {
      mainEl,
      form,
      inputProject,
      inputTodo,
      inputTitle,
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

    project.storeTodoInTasks(todo);
    createClass.getTasks.splice(this.clickedElData.elIndex, 1);
    createClass.storeElement(project);
  }

  saveProjectDataOnClick(createClass) {
    const htmlEl = this.elementSelector;

    htmlEl.mainEl.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('btn-add-project-todo')) {
        const elIndex = createClass.getClickedElementIndex(
          ev,
          createClass.getTasks
        );
        const projectEl = createClass.getTasks[elIndex];
        htmlEl.inputTitle.value = projectEl.title;

        this.clickedElData = {
          project: projectEl,
          elIndex: elIndex,
        };
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
      }

      createClass.saveTasksInLocal();
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
      const todo = new todoClass(el.description, el.dueDate, el.id);
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
        const todo = new todoClass(task.description, task.dueDate, task.id);
        projectEL.insertAdjacentHTML('beforeend', todo.todoHTML());
      });
    });
  }
}
