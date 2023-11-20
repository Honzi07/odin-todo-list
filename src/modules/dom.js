const openModalBtn = document.querySelector('.btn-open-modal');
const modal = document.querySelector('.modal');
const modalEl = document.querySelector('.modal-content');
const modalCloseBtn = document.querySelector('.modal-close');
const inputProject = document.querySelector('#project');
const inputTodo = document.querySelector('#todo');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#content');
const inputDate = document.querySelector('#date');
// const submitBtn = document.querySelector('button[type=submit]');

function changeInputsState() {
  if (inputTodo.checked) {
    selectTodo();
  } else {
    selectProject();
  }
}

function selectTodo() {
  inputTitle.removeAttribute('disabled');
  inputTitle.setAttribute('disabled', '');
  inputTitle.classList.add('disabled');
  inputTitle.labels[0].classList.add('disabled');
  inputContent.setAttribute('required', '');
}

function selectProject() {
  inputTitle.removeAttribute('disabled');
  inputTitle.setAttribute('required', '');
  inputTitle.classList.remove('disabled');
  inputTitle.labels[0].classList.remove('disabled');
  inputContent.removeAttribute('required');
  inputContent.setAttribute('required', '');
}

[inputTodo, inputProject].forEach((el) => {
  el.addEventListener('click', changeInputsState);
});

function floatLabel() {
  if (this.value && this.value !== ' ') {
    this.labels[0].classList.add('float-label');
  } else {
    this.labels[0].classList.remove('float-label');
  }
}

[inputTitle, inputContent].forEach((el) => {
  el.addEventListener('input', floatLabel);
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

function currentDate() {
  return new Date().toISOString().split('T')[0];
}

function setMinDate() {
  inputDate.setAttribute('min', currentDate());
}
setMinDate();
