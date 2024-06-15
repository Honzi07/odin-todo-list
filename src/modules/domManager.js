export default class DOMManager {
  constructor(elements) {
    this.allElements = elements;
    this.initMethods();
  }

  initMethods() {
    this.modalEvents();
  }

  resetModal() {
    form.reset();
    form.dataset.mode = 'create';
    radioFieldset.style.removeProperty('pointer-events');
    inputTitle.removeAttribute('disabled');
    inputContent.labels[0].classList.remove('float-label');
    modalSubmitBtn.textContent = 'Create';
  }

  modalEvents() {
    const modal = this.allElements.modal;

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    this.allElements.btnCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    this.allElements.btnOpenModal.addEventListener('click', () => {
      modal.style.display = 'flex';
      // resetModal();
    });
  }
}
