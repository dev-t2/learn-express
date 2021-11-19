/* eslint-disable no-undef */
const ul = document.querySelector('ul');

const todos = [];

const deleteTodo = (id, li) => {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index >= 0) {
    todos.splice(index, 1);

    ul.removeChild(li);
  }
};

const createTodo = (todo) => {
  todos.push(todo);

  const li = document.createElement('li');
  const span = document.createElement('span');
  const updateButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  span.innerText = todo.text;
  updateButton.innerText = 'Update';
  deleteButton.innerText = 'Delete';

  updateButton.addEventListener('click', () => {
    console.log('update');
  });

  deleteButton.addEventListener('click', async () => {
    const { data } = await axios.delete(`/api/todos/${todo.id}`);

    if (data.isSuccess) {
      deleteTodo(todo.id, li);
    }
  });

  li.appendChild(span);
  li.appendChild(updateButton);
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

    const { data } = await axios.post('/api/todos', {
      text: input.value.trim(),
    });

    if (data.isSuccess) {
      createTodo(data.todo);

      input.value = '';
    }
  });
});
