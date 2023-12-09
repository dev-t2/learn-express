import { Request } from 'express';

export interface ITodo {
  id: number;
  content: string;
  isComplete: boolean;
}

export interface ICreateTodo extends Request {
  body: { content?: string };
}

export interface IDeleteTodos extends Request {
  query: { ids?: string };
}

export interface IUpdateTodo extends Request {
  params: { id: string };
  body: { content?: string; isComplete?: boolean };
}
