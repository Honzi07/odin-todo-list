export default class Create {
  static tasksArr = [];
  constructor() {
    // this.tasksArr = [];
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

  clearTasksArr() {
    Create.tasksArr.length = 0;
  }

  insertHtml(parentEl, html) {
    parentEl.insertAdjacentHTML('afterbegin', html);
  }
}

// const create = new Create();
// console.log(create);
// console.log(create.getTasks);
