import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const trackSchema = new Schema({
  name: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}],
  artists: [{type: Schema.Types.ObjectId, ref: 'Artist', required: true}],
  url: {type: String, required: true},
  cover: String
});

const Track = model('Track', trackSchema);
export default Track;