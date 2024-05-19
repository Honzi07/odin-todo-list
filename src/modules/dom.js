export default class DOM {
  constructor() {}

  get elementSelector() {
    const mainEL = document.querySelector('main');
    const form = document.querySelector('#modal-form');
    const inputProject = document.querySelector('#project');
    const inputTodo = document.querySelector('#todo');

    return {
      mainEL,
      form,
      inputProject,
      inputTodo,
    };
  }

  handleFormCreateMode(createClass, projectClass, todoClass) {
    const { mainEL, inputProject, inputTodo } = this.elementSelector;
    const input = this.getModalInputValues();

    if (inputProject.checked) {
      const project = new projectClass(input.title);
      const todo = new todoClass(input.description, input.date);
      project.insertHtml(mainEL, project.projectHTML(todo.todoHTML()));
      project.storeTodoInTasks(todo);
      createClass.storeElement(project);
    }

    if (inputTodo.checked) {
      const todo = new todoClass(input.description, input.date);
      todo.insertHtml(mainEL, todo.todoHTML());
      createClass.storeElement(todo);
    }
  }

  handleCreationForm(createClass, projectClass, todoClass) {
    const form = this.elementSelector.form;

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();

      if (form.dataset.mode === 'create') {
        this.handleFormCreateMode(createClass, projectClass, todoClass);
        createClass.saveTasksInLocal();
      }
      console.log(createClass.getTasks);
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
    const mainEL = document.querySelector('main');
    arr.forEach((el) => {
      const todo = new todoClass(el.description, el.dueDate, el.id);
      todo.insertHtml(mainEL, todo.todoHTML());
    });
  }

  displayProject(arr, projectClass, todoClass) {
    const mainEL = document.querySelector('main');

    arr.forEach((el) => {
      const project = new projectClass(el.title, el.tasks, el.id);
      project.insertHtml(mainEL, project.projectHTML());
      const projectEL = document.querySelector('.project');

      project.tasks.forEach((task) => {
        const todo = new todoClass(task.description, task.dueDate, task.id);
        projectEL.insertAdjacentHTML('beforeend', todo.todoHTML());
      });
    });
  }
}
