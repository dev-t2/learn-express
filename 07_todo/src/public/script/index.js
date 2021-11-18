/* eslint-disable no-undef */

const form = document.querySelector('form');
const ul = document.querySelector('ul');

const todos = [];

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('input');

  const { data } = await axios.post('/api/todos', { text: input.value });

  todos.push(data.todo);

  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');

  span.innerText = data.todo.text;
  button.innerText = 'Delete';

  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);

  input.value = '';
});
