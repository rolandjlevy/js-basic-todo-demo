const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-button');
const resetButton = document.querySelector('#reset-button');
const todosContainer = document.querySelector('#todos-container');

let todos = [];
let count = 0;

const renderTodoList = () => {
  let html = '<ul>\n';
  todos.forEach((item, index) => {
    const deleteBtn = `<button id="delete-${item.id}" onclick="deleteTodo(${item.id})">×</button>`;
    html += `\t<li><span><b>${Number(item.id + 1)}</b>. ${item.text}</span>${deleteBtn}</li>\n`;
  });
  html += '</ul>';
  return html;
}

const addTodo = () => {
  todos.push({ id:count++, text:todoInput.value });
  todosContainer.innerHTML = renderTodoList();
  resetButton.disabled = false;
};

const resetTodos = () => {
  todos = [];
  todosContainer.innerHTML = renderTodoList();
  resetButton.disabled = true;
  count = 0;
};

const deleteTodo = (id) => {
  todos = todos.filter(item => item.id !== id);
  todosContainer.innerHTML = renderTodoList();
  if (todos.length === 0) {
    resetButton.disabled = true;
    count = 0;
  }
}

const validate = (el) => {
  addButton.disabled = el.value.length === 0;
}