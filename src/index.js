import './scss/style.scss';
import './scss/reset.scss';

const menuBtn = document.querySelector('.btn-menu');
const asideEL = document.querySelector('aside');
const mainEL = document.querySelector('main');
const projectEl = document.querySelector('.project');
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

projectEl.addEventListener('click', () => {
  projectInputContainer.classList.add('active');
});

projectEl.addEventListener('mouseenter', mouseOver);
projectEl.addEventListener('mouseleave', mouseLeft);
