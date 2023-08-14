import Artist from "../models/Artist.js"
import artistService from "../service/artist-service.js"

class ArtistController {
  async getArtists(req, res, next) {
    try {
      const artists = await Artist.find()
      return res.status(200).json(artists)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }

  async addArtist(req, res, next) {
    try {
      const user = req.user
      const {name} = req.body
      const artist = await artistService.addArtist(name, user.id)
      return res.status(200).json(artist)
    } catch(e) {
      next(e)
    }
  }

  async editDescription(req, res, next) {
    try {
      const user = req.user
      const {description} = req.body
      const artist = await artistService.editDescription(description, user.id)
      return res.status(200).json(artist)
    } catch(e) {
      next(e)
    }
  }

  async editName(req, res, next) {
    try {
      const user = req.user
      const {name} = req.body
      const artist = await artistService.editName(name, user.id)
      return res.status(200).json(artist)
    } catch(e) {
      next(e)
    }
  }

  async uploadCover(req, res, next) {
    try {
      const user = req.user
      const file = req.files.image
      const artist = await artistService.uploadCover(file, user.id)
      return res.status(200).json(artist)
    } catch(e) {
      next(e)
    }
  }

  async deleteArtist(req, res, next) {
    try {
      const user = req.user
      const artist = await artistService.deleteArtist(user.id)
      return res.status(200).json(artist)
    } catch(e) {
      next(e)
    }
  }
}

const controller = new ArtistController()
export default controller