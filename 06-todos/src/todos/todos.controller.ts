import { Router } from 'express';

import { createTodo, deleteTodos, findTodos, updateTodo } from './todos.service';

const TodosController = Router();

TodosController.get('/', findTodos);

TodosController.post('/', createTodo);

TodosController.put('/:id', updateTodo);

TodosController.delete('/', deleteTodos);

export default TodosController;
