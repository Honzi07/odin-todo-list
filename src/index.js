import './modules/logic.js';
import './modules/dom_o.js';
import './scss/style.scss';
import './scss/reset.scss';
import Create from './modules/create.js';
import Project from './modules/project.js';
import Todo from './modules/todo.js';
import DOM from './modules/dom.js';

const domCl = new DOM();
const createCl = new Create();

domCl.handleCreationForm(createCl, Project, Todo);

domCl.displayProject(createCl.filterTasksByType('project'), Project, Todo);
domCl.displayTodo(createCl.filterTasksByType('todo'), Todo);

domCl.saveProjectDataOnClick(createCl);

console.log('taskArray', createCl.getTasks);

const mainEL = document.querySelector('main');
mainEL.addEventListener('click', function (ev) {});

function log() {}

document.addEventListener('keydown', (ev) => {
  if (ev.ctrlKey) log();
});
