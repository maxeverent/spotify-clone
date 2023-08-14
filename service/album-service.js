import Album from "../models/Album.js"
import Artist from "../models/Artist.js"

class AlbumService {
  async addAlbum(name, description, artist, genre, tracks) {
    if (!name) throw Error('Поле name пустое')
    if (!artist) throw Error('Поле artist пустое')

    const currentName = await Album.findOne({name})

    if (currentName) throw Error('Альбом с таким именем существует')
    if (!tracks) throw Error('Поле tracks пустое')

    const album = {
      name: name,
      description: description,
      artist: artist,
      genre: genre,
      tracks: tracks
    }

    const currentAlbum = await Album.create(album)
    return currentAlbum
  }

  async uploadCover(file, userId, albumId) {
    if (!file) throw Error('Выберите изображение')

    const currentAlbum = await Album.findById(albumId)

    if (!currentAlbum) throw Error('Альбом не найден')

    const artist = await Artist.findOne({owner: userId})

    if (!(currentAlbum.artist.equals(artist._id))) {
      throw Error('Нет прав')
    }

    if (file.mimetype != 'image/jpeg') {
      throw Error('Выберите изображение')
    }

    file.mv(`./covers/${file.name}`)

    const url = `/covers/${file.name}`
    const album = await Album.findOneAndUpdate({_id: albumId}, {cover: url}, {returnDocument: "after"})
    return album
  }

  async editDescription(description, userId, albumId) {
    if (!description) throw Error('Поле description пустое')

    const currentAlbum = await Album.findById(albumId)

    if (!currentAlbum) throw Error('Альбом не найден')

    const artist = await Artist.findOne({owner: userId})

    if (!(currentAlbum.artist.equals(artist._id))) {
      throw Error('Нет прав')
    }

    const album = await Album.findOneAndUpdate({_id: albumId}, {description: description}, {returnDocument: "after"})

    return album
  }

  async deleteAlbum(albumId, userId) {
    const currentAlbum = await Album.findById(albumId)

    if (!currentAlbum) throw Error('Альбом не найден')

    const artist = await Artist.findOne({owner: userId})

    if (!(currentAlbum.artist.equals(artist._id))) {
      throw Error('Нет прав')
    }

    const album = await Album.findOneAndDelete({_id: albumId})

    return album
  }
}

const albumService = new AlbumService()
export default albumService