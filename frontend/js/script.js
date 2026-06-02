const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "./login.html";
}

let tasks = [];

let selectedTaskId = null;

function addTodo(status) {
  let inputEle;
  let descriptionEle;

  if (status === "todo") {
    inputEle = document.querySelector(".js-input-todo");

    descriptionEle = document.querySelector(".js-description-todo");
  } else if (status === "in-progress") {
    inputEle = document.querySelector(".js-input-inprogress");

    descriptionEle = document.querySelector(".js-description-inprogress");
  } else if (status === "review") {
    inputEle = document.querySelector(".js-input-review");

    descriptionEle = document.querySelector(".js-description-review");
  } else if (status === "done") {
    inputEle = document.querySelector(".js-input-done");

    descriptionEle = document.querySelector(".js-description-done");
  }

  const title = inputEle.value.trim();

  const description = descriptionEle.value.trim();

  if (title === "") return;

  tasks.push({
    id: Date.now(),

    title: title,

    description: description,

    status: status,
  });

  inputEle.value = "";
  descriptionEle.value = "";

  clearContainers();
  renderTask(tasks);
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id != id;
  });

  clearContainers();
  renderTask(tasks);
}

const todoContainer = document.querySelector(".task-container-todo");
const inprogressContainer = document.querySelector(
  ".task-container-inprogress",
);
const reviewContainer = document.querySelector(".task-container-review");
const doneContainer = document.querySelector(".task-container-done");

function renderTask(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    const title = tasks[i].title;
    const description = tasks[i].description;

    const taskCard = document.createElement("div");

    taskCard.classList.add("task-card");

    taskCard.setAttribute("draggable", true);

    const deleteBut = document.createElement("button");
    deleteBut.addEventListener("click", function () {
      deleteTask(tasks[i].id);
    });
    deleteBut.classList.add("delete-button");
    deleteBut.innerHTML = "Delete";

    const titleCard = document.createElement("h3");
    const descriptionCard = document.createElement("p");

    titleCard.innerHTML = title;
    descriptionCard.innerHTML = description;

    taskCard.appendChild(titleCard);
    taskCard.appendChild(descriptionCard);
    taskCard.appendChild(deleteBut);

    taskCard.addEventListener("dragstart", function () {
      selectedTaskId = tasks[i].id;

      taskCard.classList.add("dragging");
    });

    taskCard.addEventListener("dragend", function () {
      taskCard.classList.remove("dragging");
    });

    if (tasks[i].status === "todo") {
      todoContainer.appendChild(taskCard);
    } else if (tasks[i].status === "in-progress") {
      inprogressContainer.appendChild(taskCard);
    } else if (tasks[i].status === "review") {
      reviewContainer.appendChild(taskCard);
    } else if (tasks[i].status === "done") {
      doneContainer.appendChild(taskCard);
    }
  }
}

renderTask(tasks);

// COLUMN EVENTS

todoContainer.addEventListener("dragover", function (e) {
  e.preventDefault();

  todoContainer.parentElement.classList.add("active-drop-zone");
});

todoContainer.addEventListener("dragleave", function () {
  todoContainer.parentElement.classList.remove("active-drop-zone");
});

todoContainer.addEventListener("drop", function () {
  for (let i = 0; i < tasks.length; i++) {
    if (selectedTaskId == tasks[i].id) {
      tasks[i].status = "todo";
    }
  }

  clearContainers();
  renderTask(tasks);

  todoContainer.parentElement.classList.remove("active-drop-zone");

  selectedTaskId = null;
});

inprogressContainer.addEventListener("dragover", function (e) {
  e.preventDefault();

  inprogressContainer.parentElement.classList.add("active-drop-zone");
});

inprogressContainer.addEventListener("dragleave", function () {
  inprogressContainer.parentElement.classList.remove("active-drop-zone");
});

inprogressContainer.addEventListener("drop", function () {
  for (let i = 0; i < tasks.length; i++) {
    if (selectedTaskId == tasks[i].id) {
      tasks[i].status = "in-progress";
    }
  }

  clearContainers();
  renderTask(tasks);

  inprogressContainer.parentElement.classList.remove("active-drop-zone");

  selectedTaskId = null;
});

reviewContainer.addEventListener("dragover", function (e) {
  e.preventDefault();

  reviewContainer.parentElement.classList.add("active-drop-zone");
});

reviewContainer.addEventListener("dragleave", function () {
  reviewContainer.parentElement.classList.remove("active-drop-zone");
});

reviewContainer.addEventListener("drop", function () {
  for (let i = 0; i < tasks.length; i++) {
    if (selectedTaskId == tasks[i].id) {
      tasks[i].status = "review";
    }
  }

  clearContainers();
  renderTask(tasks);

  reviewContainer.parentElement.classList.remove("active-drop-zone");

  selectedTaskId = null;
});

doneContainer.addEventListener("dragover", function (e) {
  e.preventDefault();

  doneContainer.parentElement.classList.add("active-drop-zone");
});

doneContainer.addEventListener("dragleave", function () {
  doneContainer.parentElement.classList.remove("active-drop-zone");
});

doneContainer.addEventListener("drop", function () {
  for (let i = 0; i < tasks.length; i++) {
    if (selectedTaskId == tasks[i].id) {
      tasks[i].status = "done";
    }
  }

  clearContainers();
  renderTask(tasks);

  doneContainer.parentElement.classList.remove("active-drop-zone");

  selectedTaskId = null;
});

function clearContainers() {
  todoContainer.innerHTML = "";
  inprogressContainer.innerHTML = "";
  reviewContainer.innerHTML = "";
  doneContainer.innerHTML = "";
}
