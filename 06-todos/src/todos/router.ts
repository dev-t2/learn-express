import { Router } from 'express';

import { createTodo, deleteTodos, findTodos, updateTodo } from './service';

const TodosRouter = Router();

TodosRouter.get('/', (req, res) => {
  return findTodos(req, res);
});

TodosRouter.post('/', (req, res) => {
  return createTodo(req, res);
});

TodosRouter.delete('/', (req, res) => {
  return deleteTodos(req, res);
});

TodosRouter.put('/:id', (req, res) => {
  return updateTodo(req, res);
});

export default TodosRouter;
