export default class Create {
  static tasksArr = [];
  constructor() {
    this.getLocalData();
  }

  storeElement(el) {
    Create.tasksArr.push(el);
  }

  saveTasksInLocal() {
    localStorage.setItem('tasks', JSON.stringify(Create.tasksArr));
  }

  getLocalData() {
    const localData = localStorage.getItem('tasks');

    if (localData) {
      Create.tasksArr = JSON.parse(localData);
    }
  }

  get getTasks() {
    return Create.tasksArr;
  }

  filterTasksByType(type) {
    return Create.tasksArr.filter((obj) => obj.type === type);
  }

  getClickedElement(ev, arr) {
    const closestTodo = ev.target.closest('.todo');
    const closestProject = ev.target.closest('.project');

    let todo;
    let project;

    if (closestTodo && closestProject) {
      const projectData = arr.find(
        (el) => el.id === +closestProject.dataset.id
      );
      if (projectData) {
        project = projectData;
        todo = project.tasks.find((el) => el.id === +closestTodo.dataset.id);
      }
    } else if (closestTodo) {
      todo = arr.find((el) => el.id === +closestTodo.dataset.id);
    } else if (closestProject) {
      project = arr.find((el) => el.id === +closestProject.dataset.id);
    }

    return {
      todo,
      project,
      element: {
        todoEl: closestTodo,
        projectEl: closestProject,
      },
    };
  }

  insertHtml(parentEl, html) {
    parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
