import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const genreSchema = new Schema({
  name: {type: String, required: true},
});

const Genre = model('Genre', genreSchema);
export default Genre;