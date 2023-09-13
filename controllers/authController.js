import userService from '../service/user-service.js'
import { validationResult } from 'express-validator'

class AuthController {
  async registration(req, res, next) {
    try {
      const { fullname, username, email, password } = req.body

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw Error(errors.array()[0].msg)
      }
      const user = await userService.registration(fullname, email, username, password)

      res.cookie('refreshToken', user.refreshToken, {maxAge: 30*1000, httpOnly: true})
      return res.status(200).json(user)
    } catch(e) {
      console.log(e)
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw Error(errors.array()[0].msg)
      }

      const user = await userService.login(login, password)
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30*1000, httpOnly: true})
      return res.status(200).json(user)
    } catch(e) {
      console.log(e)
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch(e) {
      console.log(e)
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const user = await userService.refresh(refreshToken)
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
      return res.status(200).json(user)
    } catch(e) {
      console.log(e)
      next(e)
    }
  }
}

const controller = new AuthController
export default controller