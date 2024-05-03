export default class Create {
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

  filterTasksByType(type) {
    return Create.tasksArr.filter((obj) => obj.type === type);
  }

  insertHtml(parentEl, html) {
    parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
