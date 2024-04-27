import Create from './create';

export default class Project extends Create {
  constructor(title) {
    super();
    this.type = 'project';
    this.title = title;
    this.tasks = [];
    this.id = new Date().getTime();
  }

  storeTodoInTasks(todo) {
    this.tasks.push(todo);
  }

  get getTasks() {
    return this.tasks;
  }
}

// const project = new Project();
// console.log(project);
// project.test();
// // project.storeElement(project);
// console.log(project.getTasks);
