// assign variables to DOM elements
const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-button');
const resetButton = document.querySelector('#reset-button');
const todosContainer = document.querySelector('#todos-container');

// data for the todos
let todos = [];

// counter for the ids
let count = 0;

// generate the html for the list of todos
const renderTodoList = () => {
  // generate and return a string by looping through the todos array
  let html = '<ul>\n';
  todos.forEach((item, index) => {
    // delete button with id passed to the deleteTodo function 
    const deleteBtn = `<button onclick="deleteTodo(${item.id})">×</button>`;
    html += `\t<li><span><b>${Number(item.id + 1)}</b>. ${item.text}</span>${deleteBtn}</li>\n`;
  });
  html += '</ul>';
  return html;
}

// add a todo to the todo array then rerender the todos container
const addTodo = () => {
  todos.push({ id:count++, text:todoInput.value });
  todosContainer.innerHTML = renderTodoList();
  scrollToLast();
  resetButton.disabled = false;
};

// Remove all of the todos then rerender
const resetTodos = () => {
  todos = [];
  todosContainer.innerHTML = renderTodoList();
  resetButton.disabled = true;
  count = 0;
};

// Delete a single todo then rerender
const deleteTodo = (id) => {
  todos = todos.filter(item => item.id !== id);
  todosContainer.innerHTML = renderTodoList();
  if (todos.length === 0) {
    resetButton.disabled = true;
    count = 0;
  }
}

// make the scrollbar move to the end of the todos container
const scrollToLast = () => {
  const todosList = document.querySelector('#todos-container > ul');
  todosList.scrollTop = todosList.scrollHeight;
}

// Enable or disable the add button
const validate = (el) => {
  addButton.disabled = el.value.length === 0;
}