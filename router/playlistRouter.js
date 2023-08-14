import { Router } from "express";
import controller from "../controllers/playlistController.js";

const playlistRouter = new Router()

playlistRouter.get('/get', controller.getPlaylists)
playlistRouter.post('/add', controller.addPlaylist)
playlistRouter.delete('/delete/:id', controller.deletePlaylist)
playlistRouter.post('/edit/:id', controller.editPlaylist)

playlistRouter.post('/track/add/:id', controller.addTrack)
playlistRouter.delete('/track/delete/:id', controller.deleteTrack)

export default playlistRouter