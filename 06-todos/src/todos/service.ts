import { Request, Response } from 'express';

import {
  ICreateTodo,
  IDeleteTodos,
  ITodo,
  IUpdateComplete,
  IUpdateContent,
  IUpdateOrder,
} from './interface';

let todos: ITodo[] = [];

export const findTodos = (req: Request, res: Response) => {
  const sortedTodos = [...todos].sort((t1, t2) => t1.order - t2.order);

  return res.json({ todos: sortedTodos });
};

export const createTodo = (req: ICreateTodo, res: Response) => {
  const content = req.body.content?.trim();

  if (content === undefined) {
    return res.status(400).send('Bad Request');
  }

  const id = todos.length ? todos[todos.length - 1].id + 1 : 1;

  const order = todos.reduce((result, todo) => {
    return result <= todo.order ? todo.order + 1 : result;
  }, 0);

  const todo: ITodo = { id, isComplete: false, content, order };

  todos = [...todos, todo];

  return res.status(201).json(todo);
};

export const deleteTodos = (req: IDeleteTodos, res: Response) => {
  const ids = req.query.ids?.split(',');

  if (ids === undefined || ids[0].trim() === '') {
    todos = [];

    return res.status(204).json({});
  }

  const deleteIds = todos.reduce((result: number[], todo) => {
    return ids.includes(`${todo.id}`) ? [...result, todo.id] : result;
  }, []);

  if (ids.length !== deleteIds.length) {
    return res.status(400).send('Bad Request');
  }

  todos = todos.filter((todo) => !deleteIds.includes(todo.id));

  return res.status(204).json({});
};

export const updateComplete = (req: IUpdateComplete, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
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
    return todo.id === findTodo.id ? { ...todo, isComplete } : todo;
  });

  return res.status(204).json({});
};

export const updateContent = (req: IUpdateContent, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const content = req.body.content?.trim();

  if (content === undefined) {
    return res.status(400).send('Bad Request');
  }

  const findTodo = todos.find((todo) => todo.id === id);

  if (!findTodo) {
    return res.status(404).send('Not Found');
  }

  todos = todos.map((todo) => {
    return todo.id === findTodo.id ? { ...todo, content } : todo;
  });

  return res.status(204).json({});
};

export const updateOrder = (req: IUpdateOrder, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const direction = req.body.direction?.trim();

  if (direction === undefined) {
    return res.status(400).send('Bad Request');
  }

  todos.sort((t1, t2) => t1.order - t2.order);

  const index = todos.findIndex((todo) => todo.id === id);

  if (direction === 'up' && index <= 0) {
    return res.status(400).send('Bad Request');
  }

  if (direction === 'down' && index >= todos.length - 1) {
    return res.status(400).send('Bad Request');
  }

  if (direction === 'up') {
    const prevTodo = todos[index - 1];
    const targetTodo = todos[index];

    todos[index - 1] = { ...prevTodo, order: targetTodo.order };
    todos[index] = { ...targetTodo, order: prevTodo.order };
  }

  if (direction === 'down') {
    const targetTodo = todos[index];
    const nextTodo = todos[index + 1];

    todos[index] = { ...targetTodo, order: nextTodo.order };
    todos[index + 1] = { ...nextTodo, order: targetTodo.order };
  }

  todos.sort((t1, t2) => t1.id - t2.id);

  return res.status(204).json({});
};
