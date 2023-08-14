import Genre from '../models/Genre.js'

class GenreController {
  async getGenres(req, res) {
    try {
      const genres = await Genre.find()
      return res.status(200).json(genres)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }

  async addGenre(req, res) {
    try {
      const {name} = req.body
      const genre = await Genre.create({name: name})
      return res.status(200).json(genre)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }

  async editGenre(req, res) {
    try {
      const {id} = req.params
      const {name} = req.body
      const genre = await Genre.findOneAndUpdate({_id: id},{name: name}, {returnDocument: "after"})
      return res.status(200).json(genre)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }

  async deleteGenre(req, res) {
    try {
      const {id} = req.params
      const genre = await Genre.findOneAndDelete({_id: id})
      return res.status(200).json(genre)
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Ошибка"})
    }
  }
}

const controller = new GenreController()
export default controller