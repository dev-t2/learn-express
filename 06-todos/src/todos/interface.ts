import { Request } from 'express';

export interface ITodo {
  id: number;
  isComplete: boolean;
  content: string;
}

export interface ICreateTodo extends Request {
  body: { content?: string };
}

export interface IDeleteTodos extends Request {
  query: { ids?: string };
}

export interface IUpdateContent extends Request {
  params: { id: string };
  body: { content?: string };
}

export interface IUpdateCompletion extends Request {
  params: { id: string };
  body: { isComplete?: boolean };
}
