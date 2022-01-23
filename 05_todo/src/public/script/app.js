/* eslint-disable no-undef */

const todos = [];

const todoForm = document.querySelector('form');
const todoFormInput = todoForm.querySelector('input');
const todoFormButton = todoForm.querySelector('button');
const deleteSelectionButton = document.querySelector('.selection');
const deleteAllButton = document.querySelector('.all');
const todoList = document.querySelector('ul');

const createTodo = (todo) => {
  todos.push({ ...todo, isUpdate: false });

  deleteAllButton.hidden = false;

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');

  checkbox.type = 'checkbox';
  checkbox.checked = todo.isComplete;
  span.innerText = todo.content;
  button.innerText = 'Delete';

  checkbox.addEventListener('click', async (event) => {
    try {
      const isComplete = event.target.checked;

      const { data } = await axios.put(`/api/todos/${todo.id}`, { isComplete });

      if (data.isSuccess) {
        const index = todos.findIndex(({ id }) => id === todo.id);

        todos[index].isComplete = isComplete;

        deleteSelectionButton.hidden = !todos.some((todo) => todo.isComplete);
      }
    } catch (err) {
      console.error(err);
    }
  });

  span.addEventListener('click', (event) => {
    todos.forEach(({ id }, index) => {
      const isUpdate = id === todo.id;

      todos[index].isUpdate = isUpdate;
    });

    todoFormInput.value = event.target.innerText;
    todoFormButton.innerText = 'Update';
  });

  button.addEventListener('click', async () => {
    try {
      const { data } = await axios.delete(`/api/todos?ids=${todo.id}`);

      if (data.isSuccess) {
        const index = todos.findIndex(({ id }) => id === todo.id);

        todos.splice(index, 1);

        deleteSelectionButton.hidden = !todos.some((todo) => todo.isComplete);
        deleteAllButton.hidden = todos.length === 0;

        todoList.removeChild(li);
      }
    } catch (err) {
      console.error(err);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
};

todoForm.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const content = todoFormInput.value.trim();

    const todo = todos.find((todo) => todo.isUpdate);

    if (content && !todo) {
      const { data } = await axios.post('/api/todos', { content });

      if (data.isSuccess) {
        createTodo(data.todo);

        todoFormInput.value = '';
      }
    }

    if (content && todo) {
      const { data } = await axios.put(`/api/todos/${todo.id}`, { content });

      if (data.isSuccess) {
        const index = todos.findIndex(({ id }) => id === todo.id);

        todos[index].content = content;

        todoFormInput.value = '';
        todoFormButton.innerText = 'Create';

        const span = todoList.childNodes[index].querySelector('span');

        span.innerText = content;
      }
    }
  } catch (err) {
    console.error(err);
  }
});

deleteSelectionButton.addEventListener('click', async () => {
  try {
    const ids = todos.reduce((ids, todo) => {
      if (todo.isComplete) {
        return [...ids, todo.id];
      }

      return ids;
    }, []);

    const { data } = await axios.delete(`/api/todos?ids=${ids.join(',')}`);

    if (data.isSuccess) {
      const indexes = todos.reduce((indexes, todo, index) => {
        if (ids.includes(todo.id)) {
          return [index, ...indexes];
        }

        return indexes;
      }, []);

      indexes.forEach((index) => {
        todos.splice(index, 1);

        todoList.childNodes[index].remove();
      });

      deleteSelectionButton.hidden = !todos.some((todo) => todo.isComplete);
      deleteAllButton.hidden = todos.length === 0;
    }
  } catch (err) {
    console.error(err);
  }
});

deleteAllButton.addEventListener('click', async () => {
  try {
    const { data } = await axios.delete('/api/todos');

    if (data.isSuccess) {
      todos.length = 0;

      deleteSelectionButton.hidden = true;
      deleteAllButton.hidden = true;

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

      deleteSelectionButton.hidden = !todos.some((todo) => todo.isComplete);
    }
  } catch (err) {
    console.error(err);
  }
};

app();
