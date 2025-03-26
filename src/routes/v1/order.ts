import { Router } from "express";
import { login } from "../../controllers/loginController";
import { validateJwt } from "../../middlewares/validateJwt";
import { validateRole } from "../../middlewares/validateRoles";
import { addOrder, getOrderById, getOrders } from "../../controllers/orderController";

const router:Router = Router();

router.get('/orders',[validateJwt],validateRole(['administrador']),getOrders)
router.get('/orders/:id',[validateJwt],validateRole(['administrador','cliente']),getOrderById)
router.post('/orders', [
  validateJwt,validateRole(['cliente']),
],addOrder)


export default router; 