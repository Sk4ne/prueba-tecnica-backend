import { User } from "../../models";


export const existEmail = async( email:string) => {
   if(email){
     const uniqueEmail = await User.findOne({ email });
     if(uniqueEmail){
        throw new Error(`El correo ${email } ya esta en uso`)
     }
   }
}
