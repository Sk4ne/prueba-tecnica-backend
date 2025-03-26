import { Router } from "express";
import { check } from "express-validator";
import { addUser, getUsers } from "../../controllers/userController";
import { validateFields } from "../../middlewares/validateFields";
import { IDUnique } from "../../helpers/uniqueFields/IdUnique";
import { cellPhoneUnique } from "../../helpers/uniqueFields/cellPhoneUnique";
import { existEmail } from "../../helpers/uniqueFields/existsEmailUser";
import { validPass } from "../../helpers/regexPass";
import { login } from "../../controllers/loginController";
import { validateJwt } from "../../middlewares/validateJwt";
import { validateRole } from "../../middlewares/validateRoles";

const router:Router = Router();

router.get('/users',[validateJwt],validateRole(['administrador','cliente']),getUsers)
router.post('/auth/register', [
  validateJwt,validateRole(['administrador','cliente']),
  check('name')
    .notEmpty()
    .withMessage('El nombre del usuario es requerido'),
  check('ID') 
    .custom(IDUnique),
  check('cellPhone') 
    .custom(cellPhoneUnique),
  check('cellPhone')
    .notEmpty()
    .withMessage('El celular del usuario es requerido'),
  check('email')
    .custom(existEmail),
  check('email','El correo no es valido!!')
    .isEmail(),
  check('password')
    .custom(validPass)
    .isLength({ min:7 })
    .withMessage('La contrasena debe tener mas de 7 caracteres'),
  check('role')
    .notEmpty()
    .withMessage('El rol es requerido!!'),
  validateFields
],addUser)
router.post('/auth/login',login);


export default router; 