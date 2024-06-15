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

domCl.saveClickedHtmlElData(createCl);

domCl.updateModalForEditMode();

domCl.removeClickedElement(createCl, createCl.getTasks);

domCl.checkboxEventHandler(createCl, Todo);

domCl.displayFilteredByType(createCl, Project, Todo);

domCl.displayAll(createCl, Project, Todo);

domCl.displayFilterByTime(createCl, Project, Todo);

console.log('taskArray', createCl.getTasks);

function log(ev) {
  console.log('taskArray', createCl.getTasks);
  console.dir(ev.target);
}

document.addEventListener('mouseover', (ev) => {
  if (ev.ctrlKey) {
    log(ev);
  }
});
