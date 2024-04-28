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
const form = document.querySelector('#form');

createCl.getLocalData();

function handleFormCreateMode(input) {
  const inputProject = document.querySelector('#project');
  const inputTodo = document.querySelector('#todo');

  if (inputProject.checked) {
    const project = new Project(input.title);
    const todo = new Todo(input.description, input.date);
    project.storeTodoInTasks(todo);
    createCl.storeElement(project);
  }
  if (inputTodo.checked) {
    const todo = new Todo(input.description, input.date);
    createCl.storeElement(todo);
  }
}

form.addEventListener('submit', (e) => {
  const input = domCl.getModalInputValues();

  e.preventDefault();

  if (form.dataset.mode === 'create') {
    handleFormCreateMode(input);
    createCl.saveTasksInLocal();
  }
  console.log(createCl.getTasks);
});

console.log('taskArray', createCl.getTasks);

// setTimeout(() => {
//   create.saveTasksInLocal();
//   console.log('save done');
//   console.log(create.getTasks);
// }, 2000);

// console.log(new Date());
// const date = new Date().getTime();
// // const result = date.getTime();
// console.log(date);

function log() {}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey) log();
});
