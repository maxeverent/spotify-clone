import Favorite from "../models/Favorite.js"
import favoriteService from "../service/favorite-service.js"

class FavoriteController {
  async getTracks(req, res, next) {
    try {
      const user = req.user
      const tracks = await Favorite.findOne({user: user.id}).populate('tracks')
      if (!tracks) return res.status(200).json([])
      return res.status(200).json(tracks)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }

  async addTrack(req, res, next) {
    try {
      const user = req.user
      const {id} = req.params

      const track = await favoriteService.addTrack(user.id, id)

      return res.status(200).json(track)
    } catch(e) {
      next(e)
    }
  }

  async deleteTrack(req, res, next) {
    try {
      const user = req.user
      const {id} = req.params

      const track = await favoriteService.deleteTrack(user.id, id)

      return res.status(200).json(track)
    } catch(e) {
      next(e)
    }
  }
}

const favoriteController = new FavoriteController()
export default favoriteController