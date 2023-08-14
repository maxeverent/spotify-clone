import Favorite from "../models/Favorite.js"

class FavoriteService {
  async addTrack(userId, trackId) {
    const favorite = await Favorite.findOne({user: userId})

    if (!favorite) {
      const currentFavorite = await Favorite.create({user: userId, tracks: [trackId]})
      return currentFavorite
    }
    const tracks = favorite.tracks

    if (tracks.find(el => el == trackId)) {
      throw Error('Данный трек уже добавлен')
    }

    const currentFavorite = await Favorite.findOneAndUpdate({user: userId}, {$push: {tracks: trackId}}, {returnDocument: "after"})

    return currentFavorite
  }

  async deleteTrack(userId, trackId) {
    const favorite = await Favorite.findOne({user: userId})
    if (!favorite) throw Error('Нет добавленных треков')



    const currentFavorite = await Favorite.findOneAndUpdate({user: userId}, {$pull: {tracks: trackId}}, {returnDocument: "after"})

    return currentFavorite
  }
}

const favoriteService = new FavoriteService()
export default favoriteService