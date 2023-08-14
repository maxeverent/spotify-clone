import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}],
});

const Favorite = model('Favorite', favoriteSchema);
export default Favorite;