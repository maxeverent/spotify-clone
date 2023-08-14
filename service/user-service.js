import User from '../models/User.js';
import bcrypt from 'bcrypt';
import tokenService from './token-service.js';

class UserService {
  async registration(fullname, username, email, password) {
    const currentEmail = await User.findOne({email})
    if (currentEmail) {
      throw new Error('Данный email уже используется')
    }
    const currentUser = await User.findOne({username})
    if (currentUser) {
      throw new Error('Данный username уже используется')
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({fullname, email, username, password: hashPassword})
    const payload = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      username: user.username
    }
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens, payload
    }
  }

  async login(login, password) {
    const user = await User.findOne({$or: [{username: login}, {email: login}]})
    if (!user) throw new Error('Пользователь не найден')
    const isEquals = await bcrypt.compare(password, user.password)
    if (!isEquals) throw new Error('Пароль неверный')
    const payload = {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.username
    }
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens, payload
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw Error('Пользователь не авторизован')
    const user = tokenService.validateRefreshToken(refreshToken)
    const token = await tokenService.findToken(refreshToken)
    if (!user || !token) throw Error('Пользователь не авторизован')
    const currentUser = await User.findById(user.id)
    const payload = {
      id: currentUser.id,
      fullname: currentUser.fullname,
      username: currentUser.username,
      email: currentUser.username
    }
    const tokens = tokenService.generateTokens(payload)
    await tokenService.saveToken(user.id, tokens.refreshToken)
    return {
      ...tokens, payload
    }
  }

  async follow(followId, userId) {
    const followingUser = await User.findById(userId);

    if (followingUser.following.includes(followId)) throw Error('Уже отслеживает')

    const user = await User.findByIdAndUpdate({_id: userId}, {$push: {following: followId}}, {returnDocument: "after"})

    return user
  }

  async unfollow(followId, userId) {
    const followingUser = await User.findById(userId);

    if (!followingUser.following.includes(followId)) throw Error('Не отслеживает')

    const user = await User.findByIdAndUpdate({_id: userId}, {$pull: {following: followId}}, {returnDocument: "after"})

    return user
  }
}

const userService = new UserService()
export default userService