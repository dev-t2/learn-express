import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';

import './css/reset.css';
import './css/style.css';

interface ITodo {
  id: string;
  content: string;
  isComplete: boolean;
}

const url = 'http://localhost:8080/api/todos';

const App = () => {
  const [content, setContent] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [targetId, setTargetId] = useState('');

  const isSomeComplete = useMemo(() => {
    return todos.some((todo) => todo.isComplete);
  }, [todos]);

  const isTodos = useMemo(() => {
    return todos.length > 0;
  }, [todos.length]);

  useLayoutEffect(() => {
    (async () => {
      const { data } = await axios.get(url);

      if (data.isSuccess) {
        setTodos(data.todos);
      }
    })();
  }, []);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (content.trim() && !targetId) {
        const { data } = await axios.post(url, { content });

        if (data.isSuccess) {
          setContent('');
          setTodos((prev) => [...prev, data.todo]);
        }
      }

      if (content.trim() && targetId) {
        const { data } = await axios.put(`${url}/${targetId}`, { content });

        if (data.isSuccess) {
          const updatedTodos = todos.map((todo) => {
            return todo.id === targetId ? { ...todo, content } : todo;
          });

          setTargetId('');
          setContent('');
          setTodos(updatedTodos);
        }
      }
    },
    [content, targetId, todos]
  );

  const onContent = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }, []);

  const onDeleteSelection = useCallback(async () => {
    const selectedTodos = todos.reduce((result: string[], todo) => {
      return todo.isComplete ? [...result, todo.id] : result;
    }, []);

    const ids = selectedTodos.join(',');

    const { data } = await axios.delete(`${url}?ids=${ids}`);

    if (data.isSuccess) {
      const filteredTodos = todos.filter((todo) => !todo.isComplete);

      setTodos(filteredTodos);
    }
  }, [todos]);

  const onDeleteAll = useCallback(async () => {
    const { data } = await axios.delete(url);

    if (data.isSuccess) {
      setTodos([]);
    }
  }, []);

  const onComplete = useCallback(
    (id: string) => async (event: ChangeEvent<HTMLInputElement>) => {
      const isComplete = event.target.checked;

      const { data } = await axios.put(`${url}/${id}`, { isComplete });

      if (data.isSuccess) {
        const updatedTodos = todos.map((todo) => {
          return todo.id === id ? { ...todo, isComplete } : todo;
        });

        setTodos(updatedTodos);
      }
    },
    [todos]
  );

  const onUpdate = useCallback(
    (id: string) => () => {
      const todo = todos.find((todo) => todo.id === id);

      if (todo) {
        setTargetId(todo.id);
        setContent(todo.content);
      }
    },
    [todos]
  );

  const onDelete = useCallback(
    (id: string) => async () => {
      const { data } = await axios.delete(`${url}?ids=${id}`);

      if (data.isSuccess) {
        const filteredTodos = todos.filter((todo) => todo.id !== id);

        setTodos(filteredTodos);
      }
    },
    [todos]
  );

  return (
    <div className="container">
      <h1>Todo</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Please enter what to do"
          required
          value={content}
          onChange={onContent}
        />

        <button>{targetId ? 'Update' : 'Create'}</button>
      </form>

      <div className="button-container">
        {isSomeComplete && (
          <button className="selection" onClick={onDeleteSelection}>
            Delete Selection
          </button>
        )}

        {isTodos && (
          <button className="all" onClick={onDeleteAll}>
            Delete All
          </button>
        )}
      </div>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                defaultChecked={todo.isComplete}
                onChange={onComplete(todo.id)}
              />

              <span onClick={onUpdate(todo.id)}>{todo.content}</span>

              <button onClick={onDelete(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(App);
