const el = element => document.querySelector(element);
let todos = [], count = 0;

const addTodo = () => {
  const todo = { id:count++, text:el('#todo-input').value };
  todos.push(todo);
  el('#container').innerHTML = renderTodos();
  el('#container > ul').scrollTop = el('#container > ul').scrollHeight;
  el('#reset-button').disabled = false;
};

const deleteTodo = (id) => {
  todos = id === 'all' ? [] : todos.filter(item => item.id !== id);
  el('#container').innerHTML = renderTodos();
  if (todos.length === 0) {
    el('#reset-button').disabled = true;
    count = 0;
  }
}

const renderTodos = () => {
  return '<ul>' + todos.map((item, index) => {
    return `<li><b>${Number(item.id + 1)}</b> <input value="${item.text}" oninput="validateSave(this, ${item.id})" /><button onclick="saveTodo(this, ${item.id})" disabled>💾</button><button onclick="deleteTodo(${item.id})">❌</button></li>`;
  }).join(''); + '</ul>';
}

const saveTodo = (target, id) => {
  getOne(id).text = target.previousElementSibling.value;
  target.disabled = true;
}
const validateSave = (target, id) => {
  target.nextElementSibling.disabled = !target.value.length || target.value === getOne(id).text;
}

const getOne = (id) => todos.find(item => item.id === id);

const validateAdd = (element) => {
  el('#add-button').disabled = element.value.length === 0;
}