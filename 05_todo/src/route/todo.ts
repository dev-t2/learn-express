import { Router } from 'express';

interface ITodo {
  id: number;
  text: string;
  isDone: boolean;
}

const todos: ITodo[] = [];

const router = Router();

router.get('/', (req, res) => {
  res.json({ isSuccess: true, todos });
});

interface ICreateTodo {
  text: string;
}

router.post('/', (req, res) => {
  const { text } = req.body as ICreateTodo;

  const id = (todos[todos.length - 1]?.id ?? 0) + 1;
  const todo: ITodo = { id, text, isDone: false };

  todos.push(todo);

  res.json({ isSuccess: true, todo });
});

interface IUpdateTodo {
  isDone: boolean;
}

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body as IUpdateTodo;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (index >= 0) {
    todos[index].isDone = isDone;

    res.json({ isSuccess: true });
  } else {
    res.json({ isSuccess: false });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (index >= 0) {
    todos.splice(index, 1);

    res.json({ isSuccess: true });
  } else {
    res.json({ isSuccess: false });
  }
});

export default router;
