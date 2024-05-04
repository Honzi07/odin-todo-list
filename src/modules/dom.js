export default class DOM {
  constructor() {
    // this.displayTodo(createCL.filterTasksByType('todo'));
    // console.log('dom class');
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

  displayTodo(arr, jsClass) {
    const mainEL = document.querySelector('main');
    arr.forEach((el) => {
      const todo = new jsClass(el.description, el.dueDate, el.id);
      todo.insertHtml(mainEL, todo.todoHTML());
    });
  }
}
