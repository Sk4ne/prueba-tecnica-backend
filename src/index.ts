import dotenv from 'dotenv'
dotenv.config()
import './db/config'
import express, { Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'

/* Routes v1 */
import router from './routes/v1'
import { errorHandler } from './middlewares/errorHandler'
const app:Express = express();

app.use(morgan('tiny'));
// config cors
app.use(cors({origin:'*'}));
app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARES ROUTES
app.use('/v1',router);
app.use(express.static('public'));
// const history = require('connect-history-api-fallback');
// app.use(history());

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// connection database

app.listen(process.env.PORT || 3001,()=>{
  console.log(`Listen on port ${process.env.PORT}`)  
})
