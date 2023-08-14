import { Router } from "express";
import controller from "../controllers/userController.js";

const userRouter = new Router()

userRouter.post('/follow/:id', controller.follow)
userRouter.post('/unfollow/:id', controller.unfollow)

export default userRouter