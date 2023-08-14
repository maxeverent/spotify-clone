import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const playlistSchema = new Schema({
  name: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  isPublic: {type: Boolean, default: true},
  tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}]
});

const Playlist = model('Playlist', playlistSchema);
export default Playlist;