/* eslint-disable no-undef */

const form = document.querySelector('form');
const ul = document.querySelector('ul');

const todos = [];

ul.childNodes.forEach((li) => {
  const button = li.querySelector('.delete');

  button.addEventListener('click', async () => {
    await axios.delete('/todos');
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('input');

  const { data } = await axios.post('/api/todos', { text: input.value });

  todos.push(data.todo);

  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');

  span.innerText = data.todo.text;
  button.className = 'delete';
  button.innerText = 'Delete';

  button.addEventListener('click', () => {
    console.log('delete');
  });

  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);

  input.value = '';
});
