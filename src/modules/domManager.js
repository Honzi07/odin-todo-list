export default class DOMManager {
  constructor(elements) {
    this.allElements = elements;
    this.initMethods();
  }

  initMethods() {
    this.modalEventsListeners();
    this.toggleMobileMenu();
    this.inputStateEventListener();
    this.floatLabels();
    this.toggleAddEditTodoProperties();
    this.checkRadioValidity();
  }

  resetModal() {
    const { form, fieldsetRadio, inputTitle, inputContent, btnSubmit } =
      this.allElements;
    form.reset();
    form.dataset.mode = 'create';
    fieldsetRadio.style.removeProperty('pointer-events');
    inputTitle.removeAttribute('disabled');
    inputContent.labels[0].classList.remove('float-label');
    btnSubmit.textContent = 'Create';
  }

  modalEventsListeners() {
    const modal = this.allElements.modal;

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    this.allElements.btnCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
      this.resetModal();
    });

    this.allElements.btnOpenModal.addEventListener('click', () => {
      modal.style.display = 'flex';
      this.resetModal();
    });
  }

  toggleMobileMenu() {
    const { btnMobileMenu, asideEl, mainEl } = this.allElements;
    btnMobileMenu.addEventListener('click', () => {
      btnMobileMenu.classList.toggle('active');
      asideEl.classList.toggle('active');
      mainEl.classList.toggle('active');
    });
  }

  inputStateEventListener() {
    const { inputTodo, inputProject } = this.allElements;

    [inputTodo, inputProject].forEach((el) => {
      el.addEventListener('click', this.updateInputState.bind(this));
    });
  }

  updateInputState() {
    const { inputTodo, inputTitle, inputContent } = this.allElements;

    if (inputTodo.checked) {
      inputTitle.removeAttribute('disabled');
      inputTitle.setAttribute('disabled', '');
      inputTitle.classList.add('disabled');
      inputTitle.labels[0].classList.add('disabled');
      inputContent.setAttribute('required', '');
    } else {
      inputTitle.removeAttribute('disabled');
      inputTitle.setAttribute('required', '');
      inputTitle.classList.remove('disabled');
      inputTitle.labels[0].classList.remove('disabled');
      inputContent.removeAttribute('required');
      inputContent.setAttribute('required', '');
    }
  }

  floatLabels() {
    const { inputTitle, inputContent } = this.allElements;

    const updateLabel = function () {
      if (this.value && this.value !== ' ') {
        this.labels[0].classList.add('float-label');
      } else {
        this.labels[0].classList.remove('float-label');
      }
    };

    [inputTitle, inputContent].forEach((el) => {
      el.addEventListener('input', updateLabel);
    });
  }

  toggleAddEditTodoProperties() {
    const el = this.allElements;

    const changeProperties = (mode, btnText) => {
      el.form.dataset.mode = mode;
      el.btnSubmit.textContent = btnText;
      el.modal.style.display = 'flex';
      el.fieldsetRadio.style.pointerEvents = 'none';
      el.inputTodo.checked = true;
      el.inputTitle.setAttribute('disabled', '');
    };

    el.mainEl.addEventListener('click', (e) => {
      const btn = e.target;
      if (btn.dataset.btnType === 'edit') {
        changeProperties('edit', 'Save');
        el.inputContent.labels[0].classList.add('float-label');
        el.inputTitle.labels[0].classList.add('float-label');
      } else if (btn.dataset.btnType === 'add-todo') {
        changeProperties('add-todo', 'Add');
      }
    });
  }

  checkRadioValidity() {
    const el = this.allElements;
    const radios = [el.inputProject, el.inputTodo];

    const changeRadioValidity = () => {
      const isTrue = radios.some((radio) => radio.checked);

      isTrue
        ? el.fieldsetRadio.classList.remove('invalid')
        : el.fieldsetRadio.classList.add('invalid');
    };
    changeRadioValidity();

    radios.forEach((radio) =>
      radio.addEventListener('change', changeRadioValidity)
    );

    el.mainEl.addEventListener('click', (ev) => {
      const evDataSet = ev.target.dataset.btnType;
      if (
        evDataSet === 'add-todo' ||
        evDataSet === 'open-modal' ||
        evDataSet === 'edit'
      ) {
        changeRadioValidity();
      }
    });
  }
}
