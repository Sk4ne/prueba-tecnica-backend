import mongoose, { Schema } from 'mongoose'
import { validRole } from '../enums/enumsUserRole';
import { IUser } from '../interfaces/IUser/IUser';

const UserSchema = new Schema<IUser>({
  name: { type: String },
  lastName: { type: String },
  ID: { type: String }, 
  cellPhone: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: validRole },
  state: { type: Boolean, default: true}  
},{ versionKey: false, timestamps:true })


const User = mongoose.model<IUser>('User',UserSchema)

export default User; 