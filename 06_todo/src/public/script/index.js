/* eslint-disable no-undef */

const todos = [];

const createTodo = (todo) => {
  todos.push(todo);

  const ul = document.querySelector('ul');

  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');

  span.innerText = todo.text;

  deleteButton.className = 'delete';
  deleteButton.innerText = 'Delete';

  deleteButton.addEventListener('click', async () => {
    const { data } = await axios.delete(`/api/todos/${todo.id}`);

    if (data.isSuccess) {
      const index = todos.findIndex(({ id }) => id === todo.id);

      todos.splice(index, 1);

      ul.removeChild(li);
    }
  });

  li.appendChild(span);
  li.appendChild(deleteButton);

  ul.appendChild(li);
};

window.addEventListener('load', async () => {
  const form = document.querySelector('form');

  const { data } = await axios.get('/api/todos');

  if (data.isSuccess) {
    data.todos.forEach((todo) => {
      createTodo(todo);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = document.querySelector('input');

    const { data } = await axios.post('/api/todos', { text: input.value });

    if (data.isSuccess) {
      createTodo(data.todo);

      input.value = '';
    }
  });
});
