import userControllerInstance from "../controllers/userController.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { validate } from "../middlewares/userValidation.js";
import { createUserSchema, userIdParamsSchema, loginSchema, updateUserSchema } from "../schemas/userSchema.js";

const router = Router()
const secretKey = process.env.JWT_SECRET
if(!secretKey){
    throw new Error('A chave secreta JWT nao esta definida nas variaveis de ambiente.');
}

router.post('/registrar', validate(createUserSchema), (req, res) => userControllerInstance.createUserController(req, res));
router.post('/login', validate(loginSchema), (req, res) => userControllerInstance.loginUserController(req, res));
router.use(authMiddleware); // Aplica o middleware de autenticação a todas as rotas abaixo
router.get('/users', (req, res) => userControllerInstance.getAllUsersController(req, res)); // Corrigido o nome do método
router.get('/users/email/:email', (req, res) => userControllerInstance.getUserByEmail(req, res));
router.get('/users/:id',validate(userIdParamsSchema), (req, res) => userControllerInstance.getUserById(req, res));
router.put('/users/:id',validate(updateUserSchema), validate(userIdParamsSchema), (req, res) => userControllerInstance.updateUserController(req, res)); // Corrigido o nome do método
router.delete('/users/:id',validate(userIdParamsSchema), (req, res) => userControllerInstance.deleteUserController(req, res)); // Corrigido o nome do método


export default router;
// Registration route
//router.post('/registrar', (req, res) => userController.register(req, res));