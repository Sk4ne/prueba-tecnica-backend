import { IUser } from "../interfaces/IUser/IUser";
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { User } from "../models";
import colors from 'colors';


export const addUser = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const body:IUser = req.body;
    body.password = await bcrypt.hashSync(body.password,10);
    const user:IUser = await User.create(body);
    res.status(201).json({
      user
    })
  } catch (err) {
    const error = err as Error; 
    if (error.name === 'ValidationError') {
      const errorMessage : string [] = Object.values( ( err as any).errors).map((error: any ) => error.message );
      return res.status(422).json({
        msg: errorMessage
      })
    }
    res.status(500).json({
      msg: error.message
    })
  }
}

export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const users:IUser[] = await User.find({})
      .sort({createdAt: -1})
    // ContarDocumentos
    const totalUsers:number = await User.find({}).countDocuments();
    res.status(200).json({
      totalUsers,
      users
    });
  } catch (err) {
    res.status(500).send({
      msg: `An error ocurred ${err}`
    })
    // next(err);
  }
}
