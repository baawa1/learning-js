const todoInput = document.getElementById("new-todo");
const addTodo = document.getElementById("add-todo");
const todoListParentWrap = document.getElementById("todo-list");
let todoListItems = document.querySelectorAll(".todo-item");
const allFilterBtn = document.querySelector("[data-filter='all']");
const activeFilterBtn = document.querySelector("[data-filter='active']");
const completedFilterBtn = document.querySelector("[data-filter='completed']");

let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

//Get Todo from input and add it to TodoArray
addTodo.addEventListener("click", (e) => {
  e.preventDefault;
  todoInputValue = todoInput.value.trim();
  if (todoInputValue !== "") {
    //create todo object
    let todoItem = {
      id: new Date().getTime(),
      value: todoInputValue,
      status: "active",
    };

    // push todo object to the todoArray
    todoArray.push(todoItem);

    //call render funtion
    rendertodo(todoArray);

    //clear the input
    todoInput.value = "";

    // set local storage
    saveLocal();
  }
});

//Render Todo array
const rendertodo = (customArray) => {
  todoListParentWrap.innerHTML = "";
  customArray.forEach((todoItem) => {
    //create todo item wrap
    todoItemWrap = document.createElement("div");
    const classesList =
      todoItem.status === "active" ? "todo-item" : `todo-item completed`;
    todoItemWrap.classList = classesList;
    todoItemWrap.id = todoItem.id;

    //append todo content to the wrap
    todoItemWrap.innerHTML = `
        <div class="todo-text">
          <div class="custom-checkbox"></div>
          <span class="text">${todoItem.value}</span>
        </div>
        <div class="todo-actions">
          <button class="action-btn edit" title="Edit">✎</button>
          <button class="action-btn delete" title="Delete">×</button>
        </div>`;

    //append and render todo item on the dom
    todoListParentWrap.appendChild(todoItemWrap);

    //Update NTML Node
    todoListItems = document.querySelectorAll(".todo-item");

    //add event listener to to todo item
    //delete button
    let deleteBtn = todoItemWrap.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteItem);

    //edit button
    let editBtn = todoItemWrap.querySelector(".edit");
    editBtn.addEventListener("click", editItem);

    //delete checkbox
    let checkbox = todoItemWrap.querySelector(".custom-checkbox");
    checkbox.addEventListener("click", completeTodo);
  });
};

//delete todo
const deleteItem = (e) => {
  // get the parent list item and its ID
  let parentItem = e.target.closest(".todo-item");
  parentItemId = Number(parentItem.id);

  // get item index
  const itemIdex = todoArray.findIndex((item) => item.id === parentItemId);

  // remove item from the totAray and upadte it
  removedItem = todoArray.splice(itemIdex, 1);

  rendertodo(todoArray);

  // set local storage
  saveLocal();
};

//edit todo
const editItem = (e) => {
  // get the parent list item and its ID
  let parentItem = e.target.closest(".todo-item");
  let parentItemId = Number(parentItem.id);
  let parentItemTextContent = parentItem.querySelector(".text");

  // get item index
  const itemIdex = todoArray.findIndex((item) => item.id === parentItemId);

  //alart the vlaue for update
  result = window.prompt("Edit your todo", `${todoArray[itemIdex].value}`);

  //update the array with the new value
  todoArray[itemIdex].value = result || todoArray[itemIdex].value;

  rendertodo(todoArray);

  // set local storage
  saveLocal();
};

//complete todo
const completeTodo = (e) => {
  // get the parent list item and its ID
  let parentItem = e.target.closest(".todo-item");
  let parentItemId = Number(parentItem.id);

  // get item index
  const itemIdex = todoArray.findIndex((item) => item.id === parentItemId);

  let itemStatus = todoArray[itemIdex].status;

  if (itemStatus === "active") {
    todoArray[itemIdex].status = "completed";
    // parentItem.classList = "todo-item completed";
  } else {
    todoArray[itemIdex].status = "active";
    // parentItem.classList = "todo-item";
  }
  rendertodo(todoArray);

  // set local storage
  saveLocal();
};

// Filter buttons

//all filter button
allFilterBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    return;
  } else {
    //remove active class from other filter buttons
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");

    //add filter button to the clicked filter button
    e.target.classList.add("active");

    rendertodo(todoArray);
  }
});

//active filter button
activeFilterBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    return;
  } else {
    activeArray = todoArray.filter((item) => {
      return item.status === "active";
    });

    //remove active class from other filter buttons
    allFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");

    //add filter button to the clicked filter button
    e.target.classList.add("active");

    rendertodo(activeArray);
  }
});

//completed filter button
completedFilterBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    return;
  } else {
    completedArray = todoArray.filter((item) => {
      return item.status === "completed";
    });

    //remove active class from other filter buttons
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");

    //add filter button to the clicked filter button
    e.target.classList.add("active");

    rendertodo(completedArray);
  }
});

// Save to local storage
const saveLocal = () => {
  localStorage.clear;
  stringArray = JSON.stringify(todoArray);
  localStorage.setItem("todoArray", stringArray);
};

// render items in local storage on page load
rendertodo(todoArray);
