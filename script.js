const el = element => document.querySelector(element);
let todos = [], count = 0;

class Todo {
  constructor({id, text}) {
    this.id = id;
    this.text = text;
  }
  render() {
    return `
      <li>
        <b>${Number(this.id + 1)}</b>
        <input value="${this.text}" oninput="validateSave(this, ${this.id})" />
        <button onclick="saveTodo(this, ${this.id})" disabled>💾</button>
        <button onclick="deleteTodo(${this.id})">❌</button>
      </li>`;
  }
}

const addTodo = () => {
  const todo = { id:count++, text:el('#todo-input').value };
  todos.push(todo);
  el('#container').innerHTML = renderTodoList();
  el('#container > ul').scrollTop = el('#container > ul').scrollHeight;
  el('#reset-button').disabled = false;
};

const deleteTodo = (id) => {
  todos = id === 'all' ? [] : todos.filter(item => item.id !== id);
  el('#container').innerHTML = renderTodoList();
  if (todos.length === 0) {
    el('#reset-button').disabled = true;
    count = 0;
  }
}

const saveTodo = (target, id) => {
  const found = todos.find(item => item.id === id);
  found.text = target.previousElementSibling.value;
  target.disabled = true;
}

const renderTodoList = () => {
  return '<ul>\n' + todos.map((item, index) => {
    return `\t\n<li><b>${Number(item.id + 1)}</b> <input value="${item.text}" oninput="validateSave(this, ${item.id})" /><button onclick="saveTodo(this, ${item.id})" disabled>💾</button><button onclick="deleteTodo(${item.id})">❌</button></li>`;
  }).join(''); + '\n</ul>';
}

const validateSave = (target, id) => {
  const found = todos.find(item => item.id === id);
  target.nextElementSibling.disabled = !target.value.length || target.value === found.text;
}

const validateAdd = (element) => {
  el('#add-button').disabled = element.value.length === 0;
}