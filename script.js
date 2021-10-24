const el = element => document.querySelector(element);
let todos = [], count = 0;

const addTodo = () => {
  todos.push({ id:count++, text:el('#todo-input').value });
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

const renderTodoList = () => {
  return '<ul>\n' + todos.map((item, index) => {
    return `\t\n<li><span><b>${Number(item.id + 1)}</b>. ${item.text}</span><button onclick="deleteTodo(${item.id})">×</button></li>`;
  }).join(''); + '\n</ul>';
}

const validate = (element) => {
  el('#add-button').disabled = element.value.length === 0;
}