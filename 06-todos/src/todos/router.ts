import { Router } from 'express';

import { createTodo, deleteTodos, findTodos, updateCompletion, updateContent } from './service';

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

TodosRouter.patch('/:id/completion', (req, res) => {
  return updateCompletion(req, res);
});

TodosRouter.patch('/:id/content', (req, res) => {
  return updateContent(req, res);
});

export default TodosRouter;
