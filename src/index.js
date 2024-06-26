import './scss/style.scss';
import Create from './modules/create.js';
import Project from './modules/project.js';
import Todo from './modules/todo.js';
import DOM from './modules/dom.js';

const domCl = new DOM();
const createCl = new Create();

const args = {
  createClass: createCl,
  projectClass: Project,
  todoClass: Todo,
  todoArr: createCl.filterTasksByType('todo'),
  projectArr: createCl.filterTasksByType('project'),
};

domCl.initializeMethods(args);
