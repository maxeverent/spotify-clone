import { Router } from "express";
import controller from "../controllers/authController.js";

const authRouter = new Router()

authRouter.post('/reg', controller.registration)
authRouter.post('/login', controller.login)
authRouter.post('/logout', controller.logout)
authRouter.get('/refresh', controller.refresh)

export default authRouter