import { Request } from 'express';

export interface IUser {
  id: number;
  nickname: string;
}

export interface IRequestFindUser extends Request {
  params: { id: string };
}

export interface IRequestCreateUser extends Request {
  body: { nickname?: string };
}

export interface IRequestUpdateUser extends Request {
  params: { id: string };
  body: { nickname?: string };
}

export interface IRequestDeleteUser extends Request {
  params: { id: string };
}
