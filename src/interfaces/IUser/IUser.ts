import { Types } from 'mongoose';
import { validRole } from '../../enums/enumsUserRole';

export interface IDataToken {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IUser {
  _id: Types.ObjectId | string; 
  name: string;
  lastName?: string;
  ID?: string;
  cellPhone?: string;
  email: string;
  password: string;
  role: typeof validRole.values[number];
  state: boolean;
}