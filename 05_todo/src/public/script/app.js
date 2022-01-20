/* eslint-disable no-undef */

const form = document.querySelector('form');
const input = form.querySelector('input');
const button = form.querySelector('button');
const deleteAllContainer = document.querySelector('div');
const deleteAllButton = deleteAllContainer.querySelector('button');
const todoList = document.querySelector('ul');

let updateTodoId = '';
let updateTodoContent = null;

const createTodo = (todo) => {
  const todoItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const content = document.createElement('span');
  const deleteButton = document.createElement('button');

  deleteAllContainer.hidden = false;
  checkbox.type = 'checkbox';
  checkbox.checked = todo.isComplete;
  content.innerText = todo.content;
  deleteButton.innerText = 'Delete';

  checkbox.addEventListener('click', async (event) => {
    try {
      const isComplete = event.target.checked;

      const { data } = await axios.put(`/api/todos/${todo.id}`, { isComplete });

      if (!data.isSuccess) {
        checkbox.checked = !event.target.checked;
      }
    } catch (err) {
      console.error(err);
    }
  });

  content.addEventListener('click', async (event) => {
    updateTodoId = todo.id;
    updateTodoContent = content;

    input.value = event.target.innerText;
    button.innerText = 'Update';
  });

  deleteButton.addEventListener('click', async () => {
    try {
      const { data } = await axios.delete(`/api/todos/${todo.id}`);

      if (data.isSuccess) {
        todoList.removeChild(todoItem);

        deleteAllContainer.hidden = todoList.childElementCount === 0;
      }
    } catch (err) {
      console.error(err);
    }
  });

  todoItem.appendChild(checkbox);
  todoItem.appendChild(content);
  todoItem.appendChild(deleteButton);
  todoList.appendChild(todoItem);
};

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    if (button.innerText === 'Create') {
      const { data } = await axios.post('/api/todos', {
        content: input.value,
      });

      if (data.isSuccess) {
        createTodo(data.todo);

        input.value = '';
      }
    }

    if (button.innerText === 'Update') {
      const { data } = await axios.put(`/api/todos/${updateTodoId}`, {
        content: input.value,
      });

      if (data.isSuccess) {
        updateTodoContent.innerText = input.value;

        updateTodoId = '';
        updateTodoContent = null;

        input.value = '';
        button.innerText = 'Create';
      }
    }
  } catch (err) {
    console.error(err);
  }
});

deleteAllButton.addEventListener('click', async () => {
  try {
    const { data } = await axios.delete('/api/todos');

    if (data.isSuccess) {
      deleteAllContainer.hidden = true;
      todoList.innerHTML = '';
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
