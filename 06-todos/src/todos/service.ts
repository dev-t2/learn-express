import { Request, Response } from 'express';

import { ICreateTodo, IDeleteTodos, ITodo, IUpdateTodo } from './interface';

let todos: ITodo[] = [];

export const findTodos = (req: Request, res: Response) => {
  return res.json({ todos });
};

export const createTodo = (req: ICreateTodo, res: Response) => {
  const content = req.body.content?.trim();

  if (content === undefined) {
    return res.status(400).send('Bad Request');
  }

  const id = todos.length ? todos[todos.length - 1].id + 1 : 1;

  const todo: ITodo = { id, content, isComplete: false };

  todos = [...todos, todo];

  return res.status(201).json(todo);
};

export const deleteTodos = (req: IDeleteTodos, res: Response) => {
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
};

export const updateTodo = (req: IUpdateTodo, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const content = req.body.content?.trim();

  if (content === undefined) {
    return res.status(400).send('Bad Request');
  }

  const { isComplete } = req.body;

  if (isComplete === undefined) {
    return res.status(400).send('Bad Request');
  }

  const findTodo = todos.find((todo) => todo.id === id);

  if (!findTodo) {
    return res.status(404).send('Not Found');
  }

  todos = todos.map((todo) => {
    return todo.id === findTodo.id ? { ...todo, content, isComplete } : todo;
  });

  return res.status(204).json({});
};
