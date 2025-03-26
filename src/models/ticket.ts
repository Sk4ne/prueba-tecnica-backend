import mongoose , { Schema } from "mongoose";
import { validPriority, validTicketCategory } from "../enums/enumsTicket";
import { ITicket } from "../interfaces/ITicket/ITicket";

/**
 * De esta forma le indicamos al Schema que debe respetar los tipos definidos en la interface ITicket 
*/
const TicketSchema  = new Schema<ITicket>({
  title: { type: String }, //REQUERIDO
  category : { type: String, enum: validTicketCategory }, //hardware,software,peticionDeServicio,soporte
  subcategory: {type: String }, // Si selecciono hardware se activa en subcategoria por ejemplo: teclado y monitor
  priority: { type: String, enum: validPriority},
  evidence: { type: String }, // La evidencia es una captura de pantalla
  description: { type: String }, //Usar summerNote.js
  state: { type: Boolean, default: true},
  //createdAt: {type: Boolean, default : Date.now, inmutable: true }
},{versionKey:false, timestamps: true})

const Ticket = mongoose.model<ITicket>('Ticket',TicketSchema)

export default Ticket; 