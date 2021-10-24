const el = element => document.querySelector(element)
let todos = [];
let count = 0;

const renderTodoList = () => {
  let html = '<ul>\n';
  html += todos.map((item, index) => {
    const deleteBtn = `<button onclick="deleteTodo(${item.id})">×</button>`;
    return `<li><span><b>${Number(item.id + 1)}</b>. ${item.text}</span>${deleteBtn}</li>`;
  }).join('');
  html += '\n</ul>';
  return html;
}

const addTodo = () => {
  todos.push({ id:count++, text:el('#todo-input').value });
  el('#todos-container').innerHTML = renderTodoList();
  scrollToLast();
  el('#reset-button').disabled = false;
};

const resetTodos = () => {
  todos = [];
  el('#todos-container').innerHTML = renderTodoList();
  el('#reset-button').disabled = true;
  count = 0;
};

const deleteTodo = (id) => {
  todos = todos.filter(item => item.id !== id);
  el('#todos-container').innerHTML = renderTodoList();
  if (todos.length === 0) {
    el('#reset-button').disabled = true;
    count = 0;
  }
}

const scrollToLast = () => {
  const todosList = el('#todos-container > ul');
  todosList.scrollTop = todosList.scrollHeight;
}

const validate = (element) => {
  el('#add-button').disabled = element.value.length === 0;
}