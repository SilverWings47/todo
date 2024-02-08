const addTaskBtn = document.querySelector(".add-task-btn");
const todoList = document.querySelector(".todo-list");
const usernameField = document.querySelector(".username");
let currentUser;

window.onload = async () => {
  const response = await fetch("http://localhost:3000/profile");
  const data = await response.json();

  currentUser = data.username;
  usernameField.textContent += data.username;
  loadTasks(currentUser);
};

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const template = document.getElementsByTagName("template")[0];
  const taskInputText = document.querySelector(".task-input-text");
  const clone = template.content.cloneNode(true);
  let taskText = taskInputText.value;

  if (!taskInputText.value) return;

  clone.children[0].children[0].textContent = taskText;
  taskInputText.value = "";
  clone.querySelector("div").setAttribute("data-id", generateRandomID());

  const task = {
    taskId: clone.querySelector("div").dataset.id,
    taskText: clone.querySelector("div").children[0].textContent,
    isDone: false,
  };

  todoList.appendChild(clone);

  saveTask(task);
  attachEventListeners();
}

function attachEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const uncheckedButtons = document.querySelectorAll(".unchecked-btn");
  const checkedButtons = document.querySelectorAll(".checked-btn");

  deleteButtons.forEach(function (btn) {
    btn.addEventListener("click", deleteTask);
  });

  uncheckedButtons.forEach(function (btn) {
    btn.addEventListener("click", checkTask);
  });

  checkedButtons.forEach(function (btn) {
    btn.addEventListener("click", uncheckTask);
  });
}

function checkTask() {
  this.parentElement.parentElement.style.setProperty(
    "--animation",
    "loading 200ms linear forwards"
  );
  this.classList.remove("visible");
  this.parentElement.children[2].classList.add("visible");
  this.parentElement.parentElement.children[0].classList.toggle("completed");
}

function uncheckTask() {
  this.classList.remove("visible");
  this.parentElement.children[1].classList.add("visible");
  this.parentElement.parentElement.style.removeProperty("--animation");
  this.parentElement.parentElement.children[0].classList.toggle("completed");
}

function deleteTask() {
  const parentTask = this.parentElement.parentElement;
  todoList.removeChild(parentTask);
  unsaveTask(parentTask.dataset.id);
}

function generateRandomID() {
  return crypto.randomUUID();
}

async function saveTask(task) {
  try {
    const res = await fetch("http://localhost:3000/newTask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUser, ...task }),
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function unsaveTask(taskId) {
  try {
    await fetch("http://localhost:3000/deleteTask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser,
        taskId,
      }),
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function loadTasks(user) {
  const response = await fetch('http://localhost:3000/load-tasks', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({user})
  });
  
  const taskList = await response.json();

  taskList.forEach((task) => {
    const template = document.getElementsByTagName("template")[0];
    const clone = template.content.cloneNode(true);
    clone.children[0].children[0].textContent = task.taskText;
    clone.querySelector("div").setAttribute("data-id", task.taskId);
    clone.querySelector("div").setAttribute("data-status", task.isDone);
    todoList.appendChild(clone);
    attachEventListeners();
  })
}