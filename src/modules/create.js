export default class Create {
  static tasksArr = [];
  constructor() {
    // this.tasksArr = [];
  }

  storeElement(el) {
    Create.tasksArr.push(el);
  }

  get getTasks() {
    return Create.tasksArr;
  }

  clearTasksArr() {
    Create.tasksArr.length = 0;
  }
}

// const create = new Create();
// console.log(create);
// console.log(create.getTasks);
