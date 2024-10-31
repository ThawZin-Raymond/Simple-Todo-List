const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    li.addEventListener("click", completeTask);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTask);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasksToLocalStorage();
  }
};

completeTask = (event) => {
  if (event.target.tagName !== "BUTTON") {
    const li = event.currentTarget;
    const span = li.querySelector("span");
    span.classList.toggle("completed-text");
    saveTasksToLocalStorage();
  }
};

deleteTask = (event) => {
  event.stopPropagation();
  const li = event.currentTarget.parentElement;
  taskList.removeChild(li);
  saveTasksToLocalStorage();
};

saveTasksToLocalStorage = () => {
  const tasks = [];
  const taskItems = taskList.getElementsByTagName("li");

  for (let i = 0; i < taskItems.length; i++) {
    const taskText = taskItems[i].getElementsByTagName("span")[0].textContent;
    const completed = taskItems[i].classList.contains("completed");
    tasks.push({
      text: taskText,
      completed: completed,
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

loadTaskFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.forEach((taskObj) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = taskObj.text;
      li.appendChild(span);

      if (taskObj.completed) {
        li.classList.add("completed");
      }

      li.addEventListener("click", completeTask);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", deleteTask);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  }
};

loadTaskFromLocalStorage();
