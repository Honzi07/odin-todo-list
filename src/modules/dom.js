export default class DOM {
  constructor() {}

  getModalInputValues() {
    const inputTitle = document.querySelector('#title');
    const inputContent = document.querySelector('#content');
    const inputDate = document.querySelector('#date');

    return {
      title: inputTitle.value,
      description: inputContent.value,
      date: inputDate.valueAsNumber,
    };
  }
}
