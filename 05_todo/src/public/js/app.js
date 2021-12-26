/* eslint-disable no-undef */

const todos = [];

const createTodo = (ul, todo) => {
  todos.push(todo);

  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');
  const li = document.createElement('li');

  checkbox.type = 'checkbox';
  checkbox.checked = todo.isDone;
  span.innerText = todo.text;
  button.innerText = 'Delete';

  checkbox.addEventListener('click', async (event) => {
    const isDone = event.target.checked;

    const { data } = await axios.put(`/api/todo/${todo.id}`, { isDone });

    if (data.isSuccess) {
      const index = todos.findIndex(({ id }) => id === todo.id);

      todos[index].isDone = isDone;
    }
  });

  button.addEventListener('click', async () => {
    const { data } = await axios.delete(`/api/todo/${todo.id}`);

    if (data.isSuccess) {
      const index = todos.findIndex(({ id }) => id === todo.id);

      todos.splice(index, 1);

      ul.removeChild(li);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);
};

window.addEventListener('load', async () => {
  const form = document.querySelector('form');
  const ul = document.querySelector('ul');

  const { data } = await axios.get('/api/todo');

  if (data.isSuccess) {
    data.todos.forEach((todo) => {
      createTodo(ul, todo);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = form.querySelector('input');

    const { data } = await axios.post('/api/todo', { text: input.value });

    if (data.isSuccess) {
      createTodo(ul, data.todo);

      input.value = '';
    }
  });
});
