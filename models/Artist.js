import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const artistSchema = new Schema({
  name: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  description: {type: String},
  cover: String
});

const Artist = model('Artist', artistSchema);
export default Artist;