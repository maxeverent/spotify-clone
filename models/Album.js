import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const albumSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  artist: {type: Schema.Types.ObjectId, ref: 'Artist', required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
  tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}],
  cover: String
});

const Album = model('Album', albumSchema);
export default Album;