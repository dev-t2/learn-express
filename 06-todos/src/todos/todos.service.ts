import { Request, Response } from 'express';

import {
  IRequestCreateTodo,
  IRequestDeleteTodos,
  IRequestUpdateTodo,
  ITodo,
} from './todos.interface';

let todos: ITodo[] = [];

export const findTodoIndex = (id: number) => {
  return todos.findIndex((todo) => todo.id === id);
};

export const findTodos = (req: Request, res: Response) => {
  return res.json({ todos });
};

export const createTodo = (req: IRequestCreateTodo, res: Response) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send('Bad Request');
  }

  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const todo: ITodo = { id, content, isComplete: false };

  todos = [...todos, todo];

  return res.status(201).json(todo);
};

export const updateTodo = (req: IRequestUpdateTodo, res: Response) => {
  const id = Number(req.params.id);
  const { content, isComplete } = req.body;

  if (isNaN(id) || (!content && !isComplete)) {
    return res.status(400).send('Bad Request');
  }

  const index = findTodoIndex(id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  const todo = {
    ...todos[index],
    content: content ?? todos[index].content,
    isComplete: isComplete ?? todos[index].isComplete,
  };

  todos[index] = todo;

  return res.status(204).json({});
};

export const deleteTodos = (req: IRequestDeleteTodos, res: Response) => {
  const queryIds = req.query.ids?.split(',');

  if (queryIds) {
    const ids = todos.reduce((result: number[], todo) => {
      return queryIds.includes(`${todo.id}`) ? [...result, todo.id] : result;
    }, []);

    if (queryIds.length !== ids.length) {
      return res.status(400).send('Bad Request');
    }

    todos = todos.filter((todo) => ids.includes(todo.id));
  } else {
    todos.length = 0;
  }

  return res.status(204).json({});
};
