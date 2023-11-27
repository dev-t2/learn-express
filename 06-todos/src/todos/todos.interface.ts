import { Request } from 'express';

export interface ITodo {
  id: number;
  content: string;
  isComplete: boolean;
}

export interface IRequestCreateTodo extends Request {
  body: { content?: string };
}

export interface IRequestUpdateTodo extends Request {
  params: { id: string };
  body: { content?: string; isComplete?: boolean };
}

export interface IRequestDeleteTodos extends Request {
  query: { ids?: string };
}
