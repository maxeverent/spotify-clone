import userService from "../service/user-service.js";

class UserController {
  async follow(req, res, next) {
    try {
      const user = req.user
      const {id} = req.params

      const currentUser = await userService.follow(id, user.id)

      return res.status(200).json(currentUser)

    } catch(e) {
      next(e)
    }
  }

  async unfollow(req, res, next) {
    try {
      const user = req.user
      const {id} = req.params

      const currentUser = await userService.unfollow(id, user.id)

      return res.status(200).json(currentUser)
    } catch(e) {
      next(e)
    }
  }
}

const controller = new UserController
export default controller