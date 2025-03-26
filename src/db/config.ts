import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
const connectToDatabase = async():Promise<void> => {
  let urlDB:string = process.env.URL_DB || '';
  try {
    await mongoose.connect(urlDB)
    console.log('Connection to the established database');
  } catch (err) {
    console.log(`Error connection to the database ${err}`)
  }
}

connectToDatabase()