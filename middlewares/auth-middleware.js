import tokenService from "../service/token-service.js"

const errorMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) next(Error('Пользователь не авторизован'))
    const accessToken = token.split(' ')[1]
    if (!accessToken) next(Error('Пользователь не авторизован'))
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) next(Error('Пользователь не авторизован'))
    req.user = userData
    next()
  } catch(e) {
    return next()
  }
}

export default errorMiddleware