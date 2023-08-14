import 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const url = 'mongodb://127.0.0.1:27017/spotify-clone';
const PORT = 5000;

import authRouter from './router/authRouter.js';
import trackRouter from './router/trackRouter.js';
import genreRouter from './router/genreRouter.js';
import artistRouter from './router/artistRouter.js';
import albumRouter from './router/albumRouter.js';
import favoriteRouter from './router/favoriteRouter.js';
import playlistRouter from './router/playlistRouter.js';
import userRouter from './router/userRouter.js';

import errorMiddleware from './middlewares/error-middleware.js';
import authMiddleware from './middlewares/auth-middleware.js'

const app = express();

app.use(fileUpload({}));
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tracks', express.static('tracks'))
app.use('/covers', express.static('covers'))
app.use('/user', authRouter)
app.use('/track', authMiddleware, trackRouter)
app.use('/genre', authMiddleware, genreRouter)
app.use('/artist', authMiddleware, artistRouter)
app.use('/album', authMiddleware, albumRouter)
app.use('/favorite', authMiddleware, favoriteRouter)
app.use('/playlist', authMiddleware, playlistRouter)
app.use('/user', authMiddleware, userRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log('working');
    });
    await mongoose.connect(url);
  } catch(e) {
    console.log(e)
  }
}

start();

