import { Request } from 'express';

export interface ICreateUserRequest extends Request {
  body: {
    email: string;
    nickname: string;
  };
}

export interface IUpdateUserRequest extends Request {
  params: {
    id: string;
  };
  body: {
    nickname: string;
  };
}
