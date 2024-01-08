import { Router } from 'express';

import {
  createTodo,
  deleteTodos,
  findTodos,
  updateComplete,
  updateContent,
  updateOrder,
} from './service';

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

TodosRouter.patch('/:id/complete', (req, res) => {
  return updateComplete(req, res);
});

TodosRouter.patch('/:id/content', (req, res) => {
  return updateContent(req, res);
});

TodosRouter.patch('/:id/order', (req, res) => {
  return updateOrder(req, res);
});

export default TodosRouter;
