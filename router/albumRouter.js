import { Router } from "express";
import controller from "../controllers/albumController.js";

const albumRouter = new Router()

albumRouter.get('/get', controller.getAlbums)
albumRouter.post('/add', controller.addAlbum)
albumRouter.post('/upload/cover/:id', controller.uploadCover)
albumRouter.post('/edit/description/:id', controller.editDescription)
albumRouter.delete('/delete/:id', controller.deleteAlbum)

export default albumRouter