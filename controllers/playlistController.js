import Playlist from "../models/Playlist.js"
import playlistService from "../service/playlist-service.js"

class PlaylistController {
  async getPlaylists(req, res, next) {
    try {
      const user = req.user

      const playlists = await Playlist.find({user: user.id}).populate('tracks')

      return res.status(200).json(playlists)
    } catch(e) {
      next(e)
    }
  }

  async addPlaylist(req, res, next) {
    try {
      const user = req.user
      const {name, isPublic} = req.body

      const playlist = await playlistService.addPlaylist(name, isPublic, user.id)

      return res.status(200).json(playlist)

    } catch(e) {
      next(e)
    }
  }

  async editPlaylist(req, res, next) {
    try {
      const {name, isPublic} = req.body
      const user = req.user
      const {id} = req.params

      const playlist = await playlistService.editPlaylist(name, isPublic, id, user.id)

      return res.status(200).json(playlist)
    } catch(e) {
      next(e)
    }
  }

  async deletePlaylist(req, res, next) {
    try {
      const {id} = req.params
      const user = req.user

      const playlist = await playlistService.deletePlaylist(id, user.id)

      return res.status(200).json(playlist)

    } catch(e) {
      next(e)
    }
  }

  async addTrack(req, res, next) {
    try {
      const user = req.user
      const {id} = req.params
      const {track} = req.body

      const playlist = await playlistService.addTrack(track, id, user.id)

      return res.status(200).json(playlist)
    } catch(e) {
      next(e)
    }
  }

  async deleteTrack(req, res, next) {
    try {
      const user = req.user
      const {id} = req.params
      const {track} = req.body

      const playlist = await playlistService.deleteTrack(track, id, user.id)

      return res.status(200).json(playlist)
    } catch(e) {
      next(e)
    }
  }
}

const controller = new PlaylistController()
export default controller