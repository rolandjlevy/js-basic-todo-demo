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
  const todosList = el('#todos-container > ul');
  todosList.scrollTop = todosList.scrollHeight;
  el('#reset-button').disabled = false;
};

const deleteTodo = (id) => {
  todos = id === 'all' ? [] : todos.filter(item => item.id !== id);
  console.log(todos)
  el('#todos-container').innerHTML = renderTodoList();
  if (todos.length === 0) {
    el('#reset-button').disabled = true;
    count = 0;
  }
}

const validate = (element) => {
  el('#add-button').disabled = element.value.length === 0;
}