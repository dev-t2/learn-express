import { Request, Router } from 'express';

interface ITodo {
  id: number;
  content: string;
  isComplete: boolean;
}

let todos: ITodo[] = [];

interface IRequestCreateTodo extends Request {
  body: { content?: string };
}

interface IRequestUpdateTodo extends Request {
  params: { id: string };
  body: { content?: string; isComplete?: boolean };
}

interface IRequestDeleteTodos extends Request {
  query: { ids?: string };
}

const TodosRouter = Router();

TodosRouter.get('/', (req, res) => {
  return res.json({ todos });
});

TodosRouter.post('/', (req: IRequestCreateTodo, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send('Bad Request');
  }

  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const todo: ITodo = { id, content, isComplete: false };

  todos = [...todos, todo];

  return res.status(201).json(todo);
});

TodosRouter.put('/:id', (req: IRequestUpdateTodo, res) => {
  const id = Number(req.params.id);
  const { content, isComplete } = req.body;

  if (isNaN(id) || (!content && !isComplete)) {
    return res.status(400).send('Bad Request');
  }

  const index = todos.findIndex((todo) => todo.id === id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  const todo: ITodo = {
    ...todos[index],
    content: content ?? todos[index].content,
    isComplete: isComplete ?? todos[index].isComplete,
  };

  todos[index] = todo;

  return res.status(204).json({});
});

TodosRouter.delete('/', (req: IRequestDeleteTodos, res) => {
  const queryIds = req.query.ids?.split(',');

  if (queryIds) {
    const ids = todos.reduce((result: number[], todo) => {
      return queryIds.includes(`${todo.id}`) ? [...result, todo.id] : result;
    }, []);

    if (queryIds.length !== ids.length) {
      return res.status(400).send('Bad Request');
    }

    todos = todos.filter((todo) => !ids.includes(todo.id));

    return res.status(204).json({});
  }

  todos.length = 0;

  return res.status(204).json({});
});

export default TodosRouter;
