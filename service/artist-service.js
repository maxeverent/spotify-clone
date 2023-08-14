import Artist from "../models/Artist.js"

class ArtistService {
  async addArtist(name, userId) {
    if (!name) throw Error('Поле name пустое')
    const artist = await Artist.create({name: name, owner: userId})
    return artist
  }

  async editDescription(description, userId) {
    if (!description) throw Error('Поле description пустое')
    const artist = await Artist.findOneAndUpdate({owner: userId}, {description: description},  {returnDocument: "after"})
    return artist
  }

  async editName(name, userId) {
    if (!name) throw Error('Поле name пустое')
    const artist = await Artist.findOneAndUpdate({owner: userId}, {name: name}, {returnDocument: "after"})
    return artist
  }

  async uploadCover(file, userId) {
    if (!file) throw Error('Выберите файл')

    if (file.mimetype != 'image/jpeg') {
      throw Error('Выберите изображение')
    }

    file.mv(`./covers/${file.name}`)

    const url = `/covers/${file.name}`
    const artist = await Artist.findOneAndUpdate({owner: userId}, {cover: url},  {returnDocument: "after"})
    return artist
  }

  async deleteArtist(id) {
    const artist = await Artist.findOneAndDelete({owner: id})
    if (!artist) throw Error('Исполнитель не найден')
    return artist
  }
}

const artistService = new ArtistService()
export default artistService