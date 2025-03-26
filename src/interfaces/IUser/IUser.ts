import { ObjectId } from 'mongoose';
import { validRole } from '../../enums/enumsUserRole';



export interface IUser {
  _id: ObjectId | string; 
  name: string;
  lastName?: string;
  ID?: string;
  cellPhone?: string;
  email: string;
  password: string;
  role: typeof validRole.values[number];
  state: boolean;
}