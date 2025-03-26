import mongoose, { Schema } from 'mongoose'
import { IProduct } from '../interfaces/IProduct/IProduct';

const ProductSchema = new Schema<IProduct>({
  name: { type: String },
  description: {type: String },
  price: {type: Number },
  category: { type: String },
  brand: {type: String },
  sku: {type: String },
  state: { type: Boolean, default: true}  
  
},{ versionKey: false, timestamps:true })


const Product = mongoose.model<IProduct>('Product',ProductSchema)

export default Product; 