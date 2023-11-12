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

// console.log(projectEl, projectInputContainer);
console.log(modalCloseBtn);

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  asideEL.classList.toggle('active');
  mainEL.classList.toggle('active');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

createProjectBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
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

// projectEl.addEventListener('click', () => {
//   projectInputContainer.classList.add('active');
// });

// projectEl.addEventListener('mouseenter', mouseOver);
// projectEl.addEventListener('mouseleave', mouseLeft);

const checkbox = document.querySelector('.todo-checkbox');
checkbox.addEventListener('click', logCheckbox);

function logCheckbox() {
  // if (checkbox.checked) {
  //   console.log('pipa');
  // } else console.log('nincs pipa');

  checkbox.checked ? console.log('pipa') : console.log('nincs pipa');
}

// const input = document.querySelectorAll('.modal input[type=text]');
// const label = document.querySelector('form div label');

// console.log(input, input.nextElementSibling);

// function floatLabel() {
//   if (input.value.length > 0) {
//     input.nextElementSibling.classList.add('float-label');
//   } else {
//     input.nextElementSibling.classList.remove('float-label');
//   }
// }

// input.forEach((el) => el.addEventListener('input', floatLabel));
