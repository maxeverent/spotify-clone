import trackService from "../service/track-service.js";

class TrackController {
  async getTracks(req, res, next) {
    try {
      const tracks = await trackService.getTracks()
      return res.status(200).json(tracks)
    } catch(e) {
      console.log(e)
      return res.status(200).json({message: "Ошибка"})
    }
  }

  async addTrack(req, res, next) {
    try {
      const file = req.files.audio
      const {name, artists, genreId} = req.body
      const track = await trackService.addTrack(genreId, name, file, artists)

      return res.status(200).json(track)
    } catch(e) {
      next(e)
    }
  }

  async uploadCover(req, res, next) {
    try {
      const {id} = req.params
      const file = req.files.image
      const track = await trackService.uploadCover(file, id)

      return res.status(200).json(track)
    } catch(e) {
      next(e)
    }
  }

  async deleteTrack(req, res, next) {
    try {
      const {id} = req.params
      const track = await trackService.deleteTrack(id)
      return res.status(200).json(track)
    } catch(e) {
      next(e)
    }
  }
}

const controller = new TrackController()
export default controller