import Album from "../models/Album.js";
import albumService from "../service/album-service.js";

class AlbumController {
  async getAlbums(req, res, next) {
    try {
      const albums = await Album.find().populate('artist').populate('genre').populate('tracks')
      return res.status(200).json(albums)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }

  async addAlbum(req, res, next) {
    try {
      const {name, description, artist, genre, tracks} = req.body

      const album = await albumService.addAlbum(name, description, artist, genre, tracks)

      return res.status(200).json(album)
    } catch(e) {
      next(e)
    }
  }

  async editDescription(req, res, next) {
    try {
      const {id} = req.params
      const user = req.user
      const {description} = req.body
      const album = await albumService.editDescription(description, user.id, id)
      return res.status(200).json(album)
    } catch(e) {
      next(e)
    }
  }

  async uploadCover(req, res, next) {
    try {
      const {id} = req.params
      const user = req.user
      const file = req.files.image
      const album = await albumService.uploadCover(file, user.id, id)
      return res.status(200).json(album)
    } catch(e) {
      next(e)
    }
  }

  async deleteAlbum(req, res, next) {
    try {
      const {id} = req.params
      const user = req.user

      const album = await albumService.deleteAlbum(id, user.id)
      return res.status(200).json(album)
    } catch(e) {
      next(e)
    }
  }
}

const controller = new AlbumController()
export default controller