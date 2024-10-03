const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

// Render the todo list when the page loads
document.addEventListener("DOMContentLoaded", renderTodoList);

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function createTodoElement(item) {
  const li = document.createElement("li");
  const taskText = document.createElement("span");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.checked = item.status; // Set checkbox based on status
  taskText.textContent = item.item;
  if (item.status) {
    taskText.style.textDecoration = "line-through";
  }

  const editButton = createButton("Edit", "update-btn", () =>
    updateToDoItem(item.id, taskText)
  );
  const deleteButton = createButton("Delete", "delete-btn", (e) =>
    deleteToDoItem(e, item.id)
  );

  li.appendChild(input);
  li.appendChild(taskText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  // Add event listeners for editing and deleting
  input.addEventListener("click", () => checked(taskText, item.id));
  
  return li;
}

function createButton(text, className, onClickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener("click", onClickHandler);
  return button;
}

function checked(taskText, id) {
  const itemIndex = todo.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    todo[itemIndex].status = !todo[itemIndex].status; // Toggle status
    if (todo[itemIndex].status) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "";
    }
    setLocalStorage();
  }
}

function checked(element, taskText) {
  const itemIndex = todo.findIndex((item) => item.id === element.id);

  if (itemIndex !== -1) {
    // Get the actual item from the todo list using the index
    const item = todo[itemIndex];
    
    item.status = !item.status; // Toggle status
    if (item.status) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "";
    }
    setLocalStorage();
  }
}


// Render the todo list from local storage
function renderTodoList() {
  listItems.innerHTML = "";
  todo.forEach((item) => {
    const li = createTodoElement(item);
    listItems.appendChild(li);
  });
}

function CreateToDoItems() {
  if (todoValue.value.trim() === "") {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
    return;
  }

  const isPresent = todo.some((element) => element.item === todoValue.value);

  if (isPresent) {
    setAlertMessage("This item is already present in the list!");
    return;
  }

  const itemList = {
    id: Date.now(),
    item: todoValue.value,
    status: false,
  };
  todo.push(itemList);
  const newTask = createTodoElement(itemList);
  listItems.appendChild(newTask);

  todoValue.value = "";
  setLocalStorage();
  setAlertMessage("Todo item created successfully!");
}

function updateToDoItem(id, taskText) {
  const newTaskText = prompt("Update the task:", taskText.textContent);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    const itemIndex = todo.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      todo[itemIndex].item = newTaskText;
      taskText.textContent = newTaskText;
      setAlertMessage("Updated successfully!");
      setLocalStorage();
    }
  }
}

function deleteToDoItem(e, id) {
  if (confirm(`Are you sure you want to delete this task?`)) {
    const deleteValue = e.target.parentElement;
    deleteValue.remove();
    todo = todo.filter((item) => item.id !== id);
    setAlertMessage("Deleted successfully!");
    setLocalStorage();
  }
}

function setAlertMessage(message) {
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.innerText = ""; // Clear the alert message after some time
  }, 3000);
}
