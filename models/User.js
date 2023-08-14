import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  following: [{type: Schema.Types.ObjectId, ref: 'User'}],
  cover: String
});

const User = model('Users', userSchema);
export default User;