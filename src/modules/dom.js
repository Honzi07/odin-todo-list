export default class DOM {
  constructor() {}

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

      project.tasks.forEach((task) => {
        const todo = new todoClass(task.description, task.dueDate, task.id);
        project.insertHtml(mainEL, project.projectHTML(todo.todoHTML()));
      });
    });
  }
}
