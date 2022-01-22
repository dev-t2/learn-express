/* eslint-disable no-undef */

const todos = [];

const form = document.querySelector('form');
const input = form.querySelector('input');

const createTodo = (todo) => {
  todos.push(todo);

  const ul = document.querySelector('ul');

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');

  checkbox.type = 'checkbox';
  checkbox.checked = todo.isComplete;
  span.innerText = todo.content;
  button.innerText = 'Delete';

  checkbox.addEventListener('click', async () => {
    try {
      const isComplete = checkbox.checked;

      const { data } = await axios.patch(`/api/todos/${todo.id}/isComplete`, {
        isComplete,
      });

      if (data.isSuccess) {
        const index = todos.findIndex(({ id }) => id === todo.id);

        todos[index].isComplete = checkbox.checked;
      }
    } catch (err) {
      console.error(err);
    }
  });

  button.addEventListener('click', async () => {
    try {
      const { data } = await axios.delete(`/api/todos/${todo.id}`);

      if (data.isSuccess) {
        const index = todos.findIndex(({ id }) => id === todo.id);

        todos.splice(index, 1);

        ul.removeChild(li);
      }
    } catch (err) {
      console.error(err);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);
};

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    if (input.value.trim()) {
      const { data } = await axios.post('/api/todos', { content: input.value });

      if (data.isSuccess) {
        createTodo(data.todo);

        input.value = '';
      }
    }
  } catch (err) {
    console.error(err);
  }
});

const app = async () => {
  try {
    const { data } = await axios.get('/api/todos');

    if (data.isSuccess) {
      data.todos.forEach((todo) => {
        createTodo(todo);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

app();
