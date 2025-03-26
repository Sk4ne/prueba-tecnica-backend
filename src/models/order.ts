import mongoose, { Schema, Types } from "mongoose";
import { IOrder } from "../interfaces/IOrder/IOrder";



const OrderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: "User"},
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
      }
    ],
    total: { type: Number },
    status: {
      type: String,
      enum: ["pendiente", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },
    createdAt: { type: Date, default: Date.now },
  },{ versionKey: false, timestamps: true });

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
