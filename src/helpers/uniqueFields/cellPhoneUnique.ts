import { User } from "../../models";



export const cellPhoneUnique =  async(cellPhone:string) => {
  if(cellPhone){
    const cellPhoneUser = await User.findOne({cellPhone});
    if(cellPhoneUser){
      throw new Error(`Celular ${cellPhone} ya esta en uso!!`)
    }
  }
}
