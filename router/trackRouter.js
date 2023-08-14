import { Router } from "express";
import controller from "../controllers/trackController.js";

const trackRouter = new Router()

trackRouter.get('/get', controller.getTracks)
trackRouter.post('/add', controller.addTrack)
trackRouter.post('/upload/cover/:id', controller.uploadCover)
trackRouter.delete('/delete/:id', controller.deleteTrack)

export default trackRouter