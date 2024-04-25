import './modules/logic.js';
import './modules/create.js';
import './modules/project.js';
import './modules/todo.js';
import './modules/dom.js';
import './scss/style.scss';
import './scss/reset.scss';

const menuBtn = document.querySelector('.btn-menu');
const asideEL = document.querySelector('aside');
const mainEL = document.querySelector('main');
const createProjectBtn = document.querySelector('.btn-create-project');
const modal = document.querySelector('.modal');
const modalEl = document.querySelector('.modal-content');
const modalCloseBtn = document.querySelector('.modal-close');
const projectEl = document.querySelectorAll('.project');
const projectInputContainer = document.querySelector(
  '.project-input-container'
);

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  asideEL.classList.toggle('active');
  mainEL.classList.toggle('active');
});
