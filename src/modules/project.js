import Create from './create';

class Project extends Create {
  constructor(type, name, dueDate) {
    super();
    this.type = type;
    this.name = name;
    this.dueDate = dueDate;
  }
}

const project = new Project();
console.log(project);
project.test();
