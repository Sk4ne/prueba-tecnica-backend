import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateJWT = (_id:string | Types.ObjectId = '', name?:string, email?: string,role?:string) => {
   return new Promise((resolve,reject)=>{
       const payload = { _id,name,email,role };
       jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY as string,{
         expiresIn: '1d'
       },(err,token)=>{
          if(err){
            console.log(err);
            reject('No se pudo generar el token');  
          }else{
            resolve(token);  
          } 
       })
   })
}

