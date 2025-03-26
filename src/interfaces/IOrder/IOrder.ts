import { Types } from "mongoose";
import { OrderStatus } from "../../typeAlias/globalTypes";


export interface IOrder {
  user: Types.ObjectId; // Referencia al usuario que realiza la compra
  products: {
    product: Types.ObjectId; // Referencia al producto
    quantity: number; // Cantidad comprada
    price: number; // Precio unitario al momento de la compra
  }[];
  total: number; // Total de la orden
  status: OrderStatus; // Estado de la orden
  createdAt: Date; // Fecha de creación
}