// import { UserData, UserInfo} from '../../types'
import { Request,Response,NextFunction } from "express";
import colors from 'colors';
interface ICustomRequest extends Request {
  user: any; // 
}


//Todo: Miércoles 10 de abril 2024 - Mejorar la logica de este middleware...
export const validateRole = (allowedRoles: string[]) => {
  return (req:ICustomRequest,res:Response,next:NextFunction) => {
    // Verifica si el usuario tiene el rol de adminstrador
    const userRole = req.user?.role; 
    if(userRole === 'administrador') {
      // Si el rol es administrador, se permite el acceso a todas las rutas
      next();
    }else if(allowedRoles.includes(userRole)){
      // Si el rol del usuario esta permitido para la ruta, se permite el acceso
      next();
    }else{
      res.status(403).json({
        msg: 'Acceso denegado, no tienes permisos suficientes'
      }) 
    }
  }
}
