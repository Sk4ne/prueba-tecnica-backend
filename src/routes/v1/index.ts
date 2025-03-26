import express, { Router } from 'express'

import userRouter from './user'
import productRouter from './product'
import orderRouter from './order'

const router:Router = express.Router()

router.use(userRouter)
router.use(productRouter)
router.use(orderRouter)


export default router