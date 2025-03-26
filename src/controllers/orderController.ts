import { Request, Response,NextFunction } from "express";
import { IOrder } from "../interfaces/IOrder/IOrder";
import { Order } from "../models/order";
import { HydratedDocument } from "mongoose";
import colors from 'colors';

export const addOrder = async (req: Request, res: Response) => {
  try {
    let body:  IOrder = req.body;
    const { user, products } = body;

    if (!products || products.length === 0) {
      return res.status(400).json({ msg: "Debe incluir al menos un producto en la orden." });
    }

    // Calcular el total de la orden
    const total = products.reduce((acc: number, item: { price: number; quantity: number }) => {
      return acc + item.price * item.quantity;
    }, 0);

    
    const newOrder:HydratedDocument<IOrder> = new Order({
      user,
      products,
      total,
      status: "pendiente",
    });

    await newOrder.save();

    res.status(201).json({
      msg: "Orden creada exitosamente",
      order: newOrder,
    });

  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({
      msg: "Error interno del servidor al crear la orden.",
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    //Populamos user y product
    let orders: IOrder[] = await Order.find({})
      .populate({ path: 'user', select: 'name lastName email'})
      .populate({ path: 'products.product', select: 'name category'})
      .sort({createdAt: -1})
    res.status(201).json({
      order:orders,
    });

  } catch (error) {
    console.log(colors.bgRed('------------ERROR LISTAR ORDERS------------'))
    console.log(error)
    res.status(500).json({
      msg: "Error interno del servidor ",
    });
  }
};

export const getOrderById = async (req:Request, res:Response, next:NextFunction) => { 
  try {
    let id:string  = req.params.id;
    const orderById:IOrder | null  = await Order.findById(id)
    
    if (!orderById) {
      return res.status(404).json({
        msg:`No existe una orden con el _id: ${id}`
      })
    }
    return res.status(200).json({
      orderById
    })
  } catch (err) {
    const error = err as Error; 
    res.status(500).json({
      msg: error.message
    })
  }
}