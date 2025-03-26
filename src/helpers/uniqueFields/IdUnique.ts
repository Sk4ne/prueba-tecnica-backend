import { User } from "../../models";
import colors from 'colors';


export const IDUnique =  async(ID:string) => {
  /* IDUser es la cedula */
  if(ID){
    const IDUser = await User.findOne({ID});
    if(IDUser){
      throw new Error(`Cedula ${ID} ya esta en uso!!`)
    }
  }
}