import { Request } from 'express';

export interface ITodo {
  id: number;
  isComplete: boolean;
  content: string;
  order: number;
}

export interface ICreateTodo extends Request {
  body: { content?: string };
}

export interface IDeleteTodos extends Request {
  query: { ids?: string };
}

export interface IUpdateComplete extends Request {
  params: { id: string };
  body: { isComplete?: boolean };
}

export interface IUpdateContent extends Request {
  params: { id: string };
  body: { content?: string };
}

export interface IUpdateOrder extends Request {
  params: { id: string };
  body: { direction?: 'up' | 'down' };
}
