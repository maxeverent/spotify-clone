import { Router } from "express";
import controller from "../controllers/favoriteController.js";

const favoriteRouter = new Router()

favoriteRouter.get('/get', controller.getTracks)
favoriteRouter.post('/add/:id', controller.addTrack)
favoriteRouter.delete('/delete/:id', controller.deleteTrack)

export default favoriteRouter