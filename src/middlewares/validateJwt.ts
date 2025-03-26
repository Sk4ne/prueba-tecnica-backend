import dotenv from 'dotenv';
dotenv.config();
import { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import colors from 'colors';
import { IDataToken, IUser } from '../interfaces/IUser/IUser';


export const validateJwt = async(req:Request, res:Response, next: NextFunction) => {
    /** Read token in the headers */
    const token = req.header('x-token');
    if(!token){
     return res.status(401).json({
        msg: 'No token in the request'
     })
    }

   try {
    /** VERIFICAMOS SI EL TOKEN ES VALIDO */
    let privateKey:string | undefined = process.env.SECRET_OR_PRIVATE_KEY;
    const dataReturn : string | jwt.JwtPayload = jwt.verify(token, privateKey as string );
    if (typeof dataReturn === "string") {
      throw new Error("El token decodificado es un string inesperado.");
    }
    const { _id } = dataReturn;
    
    const user:IUser | null = await User.findById(_id);
    if(!user){
      return res.status(401).json({
        msg: 'There are not users in DB / token no valid'  
      })  
    }
    
    if(!user.state){
      return res.status(401).json({
        msg: 'Token no valid - user with state:false'  
      })  
    }
    
    /* req.user  = user;  */
    (req as any).user = user;
    next();

   } catch (err) {
      res.status(401).json({
        msg: 'Token no valid'  
      }) 
   } 
}
