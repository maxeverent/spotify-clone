import Playlist from "../models/Playlist.js";

class PlaylistService {
  async addPlaylist(name, isPublic, userId) {
    const currentName = await Playlist.findOne({name: name})

    if (currentName) throw Error('Плейлист с таким именем уже существует')

    const playlist = await Playlist.create({name: name, isPublic: isPublic, user: userId})

    return playlist
  }

  async editPlaylist(name, isPublic, id, userId) {
    if (!name) throw Error('Поле name пустое')

    const currentPlaylist = await Playlist.findOne({_id: id})

    if (!currentPlaylist) {
      throw Error('Плейлист не найден')
    }

    if (!currentPlaylist.user.equals(userId)) {
      throw Error('Нет прав')
    }

    const playlist = await Playlist.findOneAndUpdate({_id: id}, {name: name, isPublic: isPublic}, {returnDocument: "after"})

    return playlist
  }

  async deletePlaylist(id, userId) {
    const currentPlaylist = await Playlist.findOne({_id: id})

    if (!currentPlaylist) {
      throw Error('Плейлист не найден')
    }

    if (!currentPlaylist.user.equals(userId)) {
      throw Error('Нет прав')
    }

    const playlist = await Playlist.findOneAndDelete({_id: id})

    return playlist
  }

  async addTrack(track, id, userId) {
    const currentPlaylist = await Playlist.findOne({_id: id})

    if (!currentPlaylist) {
      throw Error('Плейлист не найден')
    }

    if (!currentPlaylist.user.equals(userId)) {
      throw Error('Нет прав')
    }

    const tracks = currentPlaylist.tracks

    if (tracks.find(el => el == track)) {
      throw Error('Данный трек уже добавлен')
    }

    tracks.push(track)

    const playlist = await Playlist.findOneAndUpdate({_id: id}, {tracks: tracks}, {returnDocument: "after"})

    return playlist
  }

  async deleteTrack(track, id, userId) {
    const currentPlaylist = await Playlist.findOne({_id: id})

    if (!currentPlaylist) {
      throw Error('Плейлист не найден')
    }

    if (!currentPlaylist.user.equals(userId)) {
      throw Error('Нет прав')
    }

    const tracks = currentPlaylist.tracks

    tracks.find((el, i) => {
      if (el == track) {
        tracks.splice(i, 1)
        return currentPlaylist
      }
    })

    const playlist = await Playlist.findOneAndUpdate({_id: id}, {tracks: tracks}, {returnDocument: "after"})

    return playlist
  }
}

const playlistService = new PlaylistService()
export default playlistService