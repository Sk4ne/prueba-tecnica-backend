import { Request,Response, NextFunction } from "express";
import { IUser } from "../interfaces/IUser/IUser";
import { User } from "../models";
import colors from 'colors';
import bcrypt from 'bcryptjs';
import { generateJWT } from "../helpers/genareJwt";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** Validamoss que exista el email */
    const { password,email } : {password:string, email:string} = req.body
    const user:IUser | null  = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        type: 'incorrectEmail',
        msg: 'El correo proporcionado es incorrecto.'
      });
    }
    console.log(colors.bgGreen('------------DATA DEL USUARIO------------'))
    console.log(user)
    /** Verificamos que el usuario este inactivo*/
    if (!user?.state) {
      return res.status(400).json({
        type: 'disabledUser',
        msg: 'Usuario desactivado.'
      });
    }
    /** Comparamos las contrasenas  */
    const validPass: boolean = user?.password ? bcrypt.compareSync(password, user.password) : false;
    if (!validPass) {
      return res.status(400).json({
        type: 'incorrectPassword',
        msg: 'La contraseña es incorrecta.'
      })
    }
    /** Generar JWT */
    const token:unknown = await generateJWT(user._id, user.name, user.email, user.role);
    res.status(200).json({
      user,
      token
    })
  } catch (err) {
    const error = err as Error
    console.log(colors.bgRed('------------ERROR LOGIN------------'),error)
    console.log(error.message)
    res.status(500).json({

      msg: 'Error interno del servidor durante la autenticación.'
    })
  }
}