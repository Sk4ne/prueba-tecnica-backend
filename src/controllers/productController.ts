import { IUser } from "../interfaces/IUser/IUser";
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import { User } from "../models";
import colors from 'colors';
import { IProduct } from "../interfaces/IProduct/IProduct";
import Product from "../models/product";
import { ObjectId, Types } from 'mongoose';


export const addProduct = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const body:IProduct = req.body;
    let product: IProduct = await Product.create(body)
    res.status(201).json({
      product
    })
  } catch (err) {
    const error = err as Error; 
    res.status(500).json({
      msg: error.message
    })
  }
}

export const getProducts = async(req:Request,res:Response,next:NextFunction) => {
  try {
    let products:IProduct[] = await Product.find({});
    let totalProducts: number = products.length;
    res.status(200).json({
      totalProducts,
      products
    })
  } catch (err) {
    const error = err as Error; 
    res.status(500).json({
      msg: error.message
    })
  }
}
export const getProductById = async (req:Request, res:Response, next:NextFunction) => { 
  try {
    let id:string  = req.params.id;
    const productById:IProduct | null  = await Product.findById(id)
    
    if (!productById) {
      return res.status(404).json({
        msg:`No existe un producto con el _id: ${id}`
      })
    }
    return res.status(200).json({
      productById
    })
  } catch (err) {
    const error = err as Error; 
    res.status(500).json({
      msg: error.message
    })
  }
}

export const updateProduct = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params as { id: string | Types.ObjectId}
    if (!Types.ObjectId.isValid(id.toString())) {
      return res.status(400).json({
        success: false,
        message: 'No es un _id valido'
      });
    }
    /**
     * ? Partial<IProduct> crea un nuevo tipo donde todas las propiedades de IProduct son opcionales.
    */
    const dataBody: Partial<IProduct> = req.body;
    const updatedProduct:IProduct | null = await Product.findByIdAndUpdate(id, dataBody, {new: true});
    if (!updatedProduct) {
      return res.status(404).json({
        msg: "Producto no encontrado",
      });
    }
    return res.status(200).json({
      msg: "Producto actualizado correctamente",
      updatedProduct
    })
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      msg: error.message
    })
  }
}

export const deleteProduct = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id: string = req.params.id;
    const deleteProduct:IProduct | null = await Product.findByIdAndUpdate(id, { state: false }, { new: true });
    if(!deleteProduct){
      return res.status(404).json({
        msg: `No existe un producto con el _id suministrado :${id}`
      })
    }
    res.status(200).json({ 
      msg: 'Producto eliminado / estado false',
      deleteProduct 
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      msg: error.message
    })
  }
}