const openModalBtn = document.querySelector('.btn-open-modal');
const modal = document.querySelector('.modal');
const modalEl = document.querySelector('.modal-content');
const modalCloseBtn = document.querySelector('.modal-close');
const radioFieldset = document.querySelector('.input-radio');
const inputProject = document.querySelector('#project');
const inputTodo = document.querySelector('#todo');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#content');
const inputDate = document.querySelector('#date');
const modalSubmitBtn = document.querySelector('button[type=submit]');
const modalForm = document.querySelector('.modal-content form');

const btnAddProjectTodo = document.querySelector('.btn-add-project-todo');

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

function showEditModal() {
  modalEl.dataset.mode = 'edit';
  modal.style.display = 'flex';
  radioFieldset.style.pointerEvents = 'none';
  inputTodo.checked = true;
  inputTitle.setAttribute('disabled', '');
  inputContent.labels[0].classList.add('float-label');
  modalSubmitBtn.textContent = 'Save';
}

function showAddTodoModal() {
  modalEl.dataset.mode = 'add-todo';
  modal.style.display = 'flex';
  radioFieldset.style.pointerEvents = 'none';
  inputTodo.checked = true;
  inputTitle.setAttribute('disabled', '');
  modalSubmitBtn.textContent = 'Add';
}

function resetModal() {
  modalForm.reset();
  modalEl.dataset.mode = 'create';
  radioFieldset.style.removeProperty('pointer-events');
  inputTitle.removeAttribute('disabled');
  inputContent.labels[0].classList.remove('float-label');
  modalSubmitBtn.textContent = 'Create';
}

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
  resetModal();
});

document.querySelector('main').addEventListener('click', (e) => {
  const btn = e.target;

  if (btn.className === 'todo-btn-edit') {
    showEditModal();
  } else if (btn.classList.contains('btn-add-project-todo')) {
    showAddTodoModal();
  }
});

function currentDate() {
  return new Date().toISOString().split('T')[0];
}

function setMinDate() {
  inputDate.setAttribute('min', currentDate());
}
setMinDate();
