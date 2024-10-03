const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

document.addEventListener("DOMContentLoaded", renderTodoList);

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function createTodoElement(item) {
  const li = document.createElement("li");
  const taskText = document.createElement("span");
  li.appendChild(taskText);
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  // input.checked = item.status; // Set checkbox based on status
  taskText.textContent = item.item; // Set the task text

  const editButton = createButton("Edit", "update-btn", () =>
    updateToDoItem(item)
  );
  const deleteButton = createButton("Delete", "delete-btn", (e) =>
    deleteToDoItem(e, item)
  );

  li.appendChild(taskText);
  li.appendChild(input);

  li.appendChild(editButton);
  li.appendChild(deleteButton);

  // Add event listeners for editing and deleting
  input.addEventListener("click", () => checked(item, taskText));
  return li;
}

function createButton(text, className, onClickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener("click", onClickHandler);
  return button;
}

function checked(element, taskText) {
  const itemIndex = todo.findIndex((item) => item.id === element.id);

  // console.log(itemIndex);

  if (itemIndex !== -1) {
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

// Function to render the todo list from local storage
function renderTodoList() {
  // Clear existing list items
  listItems.innerHTML = "";
  // Iterate over todo items and create list elements
  todo.forEach((item) => {
    const li = createTodoElement(item);
    listItems.appendChild(li);
  });
}

function CreateToDoItems() {
  if (todoValue.value === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();

    setTimeout(() => {
      todoAlert.innerText = "";
    }, 3000);
  } else {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });

    if (IsPresent) {
      todoAlert.innerText = "This item already present in the list!";
      return;
    }

    let itemList = {
      id: Date.now(),
      item: todoValue.value,
      status: false,
    };
    todo.push(itemList);
    const newTask = createTodoElement(itemList);
    listItems.appendChild(newTask);

    todoValue.value = "";
    setLocalStorage();
    setAlertMessage("Todo item Created Successfully!");
  }
}

function updateToDoItem(element) {
  const newText = prompt("Update the task:", element.item);
  if (newText !== null && newText.trim() !== "") {
    const itemIndex = todo.findIndex((item) => item.id === element.id);
    if (itemIndex !== -1) {
      todo[itemIndex].item = newText;
      renderTodoList();
      setAlertMessage("Updated Successfully");
      setLocalStorage();
    }
  }
}

function deleteToDoItem(e, element) {
  let deleteValue = e.target.parentElement;
  if (confirm(`Are you sure. Due you want to delete this ${element.item}!`)) {
    deleteValue.remove();
    todo = todo.filter((item) => item.id !== element.id);
    setAlertMessage(`Deleted ${element.item} Successfully`);
    setLocalStorage();
  }
}

function setAlertMessage(message) {
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.innerText = ""; // Clear the alert message after some time
  }, 3000);
}
