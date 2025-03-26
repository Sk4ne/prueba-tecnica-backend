// import { Request, Response, NextFunction } from "express";
// import  colors from "colors";
// import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
// import 'dayjs/locale/es'
// import { Error as MongooseError } from 'mongoose';
// import { ITicket } from "../interfaces/ITicket/ITicket";
// import { Ticket } from "../models";

// dayjs.locale("es");
// // Extiende dayjs con los plugins
// dayjs.extend(timezone);
// dayjs.extend(utc);  //dayjs(ticket.createdAt).tz('America/Bogota').locale('es').format('HH:mm:ss A')


// export const addTicket = async (req:Request,res:Response, next: NextFunction) => {
//   try {
//     //TODO: Para usar formData en postman debes configurar multer
//     const body: ITicket = req.body;
//     let ticket:ITicket = await Ticket.create(body);
//     res.status(201).json(ticket);
//   } catch (err) { 
//     let error: unknown = err; 
//     if (err instanceof MongooseError.ValidationError) { // De esta forma validamos si err es del tipo ValidationError
//       const errorMessage: any = Object.values(err.errors).map((error: any) => error.message)
//       for (let msg of errorMessage) {
//         return res.status(422).json({
//           msg
//         })
//       }
//     }
//     return res.status(500).json({
//       msg : (error as Error).message
//     })
//     /* next(err); */ //TODO: Usar sino manejas el status code 500 - PARA ESO DEBES TENER UN MIDDLEWARE PARA EL MANEJO DE ERRORES.
//     /* const error = new Error('Este es un error existente');
//     throw error; // Lanza el error previamente creado */
//   }
// }


// export const getTickets = async(req:Request,res:Response,next:NextFunction) => {
//   try {
//     //Pagination
//     let limit : number = Number(req.query.limit) || 5;
//     let skip: number = Number(req.query.skip) || 0;  //</Pagination>
//     const tickets: ITicket[] = await Ticket.find({})
//       .skip(skip)
//       .limit(limit)
//       .sort({createdAt: -1})
//     return res.status(200).json({
//       tickets: tickets
//     })
//   } catch (err) {
//     next(err)
//   }
// }