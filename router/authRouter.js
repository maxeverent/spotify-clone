import { Router } from "express";
import controller from "../controllers/authController.js";

import { query, body } from 'express-validator'

const authRouter = new Router()

authRouter.post('/reg',
  body('username').notEmpty().withMessage('Поле username пустое'),
  body('fullname').notEmpty().withMessage('Поле fullname пустое'),
  body('email').notEmpty().withMessage('Поле email пустое'),
  body('password').notEmpty().withMessage('Поле password пустое')
, controller.registration)
authRouter.post('/login',
  body('login').notEmpty().withMessage('Поле username пустое'),
  body('password').notEmpty().withMessage('Поле password пустое')
, controller.login)
authRouter.post('/logout', controller.logout)
authRouter.get('/refresh', controller.refresh)

export default authRouter