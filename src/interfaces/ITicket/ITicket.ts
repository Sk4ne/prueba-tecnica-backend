import { ObjectId } from "mongoose";
import { validPriority, validTicketCategory } from "../../enums/enumsTicket";


export interface ITicket {
  _id: ObjectId | string; 
  title: string;
  category: typeof validTicketCategory.values[number];
  subcategory: string;
  priority: typeof validPriority.values[number];
  evidence: string;
  description: string;
  state: boolean;
  createdAt?: Date; 
}