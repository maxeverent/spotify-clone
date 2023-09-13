import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, 'access', {expiresIn: '15s'})
    const refreshToken = jwt.sign(payload, 'refresh', {expiresIn: '30s'})
    return {
      accessToken, refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({user: userId, refreshToken})
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({refreshToken})
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const user = jwt.verify(token, 'access')
      return user
    } catch(e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const user = jwt.verify(token, 'refresh')
      return user
    } catch(e) {
      return null
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({refreshToken})
    return tokenData
  }
}

const tokenService = new TokenService()
export default tokenService