import Track from '../models/Track.js'

class TrackService {
  async getTracks() {
    const tracks = await Track.find().populate('genre').populate('artists')
    return tracks
  }

  async addTrack(genreId, name, file, artists) {
    if (!file) throw Error('Выберите аудиофайл')
    if (!name) throw Error('Поле name пустое')
    if (!genreId) throw Error('Поле genreId пустое')
    if (!artists) throw Error('Поле artists пустое')

    if (file.mimetype != 'audio/mpeg') {
      throw Error('Выберите аудиофайл')
    }

    file.mv(`./tracks/${file.name}`)

    const url = `/tracks/${file.name}`

    const track = await Track.create({
      name: name,
      artists: artists,
      genre: genreId,
      url: url
    })

    return track
  }

  async uploadCover(file, trackId) {
    if (!file) throw Error('Выберите изображение')

    if (file.mimetype != 'image/jpeg') {
      throw Error('Выберите изображение')
    }

    file.mv(`./covers/${file.name}`)

    const url = `/covers/${file.name}`

    const track = await Track.findOneAndUpdate({_id: trackId}, {cover: url},  {returnDocument: "after"})
    if (!track) throw Error('Трек не найден')
    return track
  }

  async deleteTrack(id) {
    const track = await Track.findOneAndDelete({_id: id})
    if (!track) throw Error('Трек не найден')
    return track
  }
}

const trackService = new TrackService()
export default trackService