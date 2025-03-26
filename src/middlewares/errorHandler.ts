import { Request,Response,NextFunction } from "express";

// Middleware de manejo de errores
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  //console.error(err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Ocurrió un error interno',
  });
};