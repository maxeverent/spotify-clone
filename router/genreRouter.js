import { Router } from "express";
import controller from "../controllers/genreController.js";

const genreRouter = new Router()

genreRouter.get('/get', controller.getGenres)
genreRouter.post('/add', controller.addGenre)
genreRouter.post('/edit/:id', controller.editGenre)
genreRouter.delete('/delete/:id', controller.deleteGenre)


export default genreRouter