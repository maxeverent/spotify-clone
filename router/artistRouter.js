import { Router } from "express";
import controller from "../controllers/artistController.js";

const artistRouter = new Router()

artistRouter.get('/get', controller.getArtists)
artistRouter.post('/add', controller.addArtist)
artistRouter.post('/edit/description', controller.editDescription)
artistRouter.post('/edit/name', controller.editName)
artistRouter.post('/upload/cover', controller.uploadCover)
artistRouter.delete('/delete', controller.deleteArtist)

export default artistRouter