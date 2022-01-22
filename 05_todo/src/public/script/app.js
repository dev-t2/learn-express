/* eslint-disable no-undef */

let todos = [];

const form = document.querySelector('form');
const input = form.querySelector('input');
const button = form.querySelector('button');
const selected = document.querySelector('.selected');
const all = document.querySelector('.all');
const ul = document.querySelector('ul');

const createTodo = ({ id, content, isComplete }) => {
  todos = [...todos, { id, content, isComplete, isUpdate: false }];

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');

  all.hidden = false;
  checkbox.type = 'checkbox';
  checkbox.checked = isComplete;
  span.innerText = content;
  deleteButton.innerText = 'Delete';

  checkbox.addEventListener('click', async (event) => {
    try {
      const { data } = await axios.put(`/api/todos/${id}/isComplete`, {
        isComplete: event.target.checked,
      });

      if (data.isSuccess) {
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isComplete: event.target.checked };
          }

          return todo;
        });

        selected.hidden = !todos.some((todo) => todo.isComplete);
      }
    } catch (err) {
      console.error(err);
    }
  });

  span.addEventListener('click', (event) => {
    todos = todos.map((todo) => {
      return { ...todo, isUpdate: todo.id === id };
    });

    input.value = event.target.innerText;
    button.innerText = 'Update';
  });

  deleteButton.addEventListener('click', async () => {
    try {
      const { data } = await axios.delete(`/api/todos?id=${id}`);

      if (data.isSuccess) {
        todos = todos.filter((todo) => todo.id !== id);

        selected.hidden = !todos.some((todo) => todo.isComplete);
        all.hidden = todos.length === 0;

        ul.removeChild(li);
      }
    } catch (err) {
      console.error(err);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  ul.appendChild(li);
};

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const status = button.innerText;
    const content = input.value.trim();

    if (status === 'Create' && content) {
      const { data } = await axios.post('/api/todos', { content });

      if (data.isSuccess) {
        createTodo(data.todo);

        input.value = '';
      }
    }

    if (status === 'Update' && content) {
      const index = todos.findIndex((todo) => todo.isUpdate);
      const { id } = todos[index];

      const { data } = await axios.put(`/api/todos/${id}/content`, { content });

      if (data.isSuccess) {
        todos = todos.map((todo) => {
          if (todo.id === id) {
            const span = ul.childNodes[index].querySelector('span');

            span.innerText = content;

            return { ...todo, content, isUpdate: false };
          }

          return todo;
        });

        button.innerText = 'Create';
        input.value = '';
      }
    }
  } catch (err) {
    console.error(err);
  }
});

selected.addEventListener('click', async () => {
  try {
    const ids = todos.reduce((id, todo) => {
      if (todo.isComplete) {
        return [...id, todo.id];
      }

      return id;
    }, []);

    const { data } = await axios.delete(`/api/todos?id=${ids.join('&id=')}`);

    if (data.isSuccess) {
      todos = todos.filter((todo) => !ids.includes(todo.id));

      selected.hidden = !todos.some((todo) => todo.isComplete);
      all.hidden = todos.length === 0;

      const list = [...ul.childNodes].filter((li) => {
        const checkbox = li.querySelector('input');

        return checkbox.checked;
      });

      list.forEach((li) => li.remove());
    }
  } catch (err) {
    console.error(err);
  }
});

all.addEventListener('click', async () => {
  try {
    const { data } = await axios.delete('/api/todos');

    if (data.isSuccess) {
      todos = [];

      selected.hidden = true;
      all.hidden = true;
      ul.innerHTML = '';
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
