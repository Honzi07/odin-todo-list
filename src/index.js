import './modules/logic.js';
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

function mouseOver() {
  this.timeout = window.setTimeout(() => {
    projectInputContainer.classList.add('active');
  }, 1000);
}

function mouseLeft() {
  if (this.timeout) {
    window.clearTimeout(this.timeout);
    projectInputContainer.classList.remove('active');
  }
}

const checkbox = document.querySelector('.todo-checkbox');
checkbox.addEventListener('click', logCheckbox);

function logCheckbox() {
  checkbox.checked ? console.log('pipa') : console.log('nincs pipa');
}
