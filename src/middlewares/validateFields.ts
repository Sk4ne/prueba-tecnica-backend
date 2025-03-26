

// Este middleware se usa para validar los mensajes de errores en campos requeridos etc

import { Request,Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export const validateFields = (req:Request, res:Response, next: NextFunction) => {
  const errors = validationResult(req) //Nos permite obtener los errores de la validacion
  if(!errors.isEmpty()){
    return res.status(400).json(errors)
  }

  next();
}