const { Router } = require('express')
const { getUsers, sessionChecker, createUser } = require('../controllers/session-controllers')








let sessionRouter = Router()


sessionRouter.route('/get-session').get(getUsers)





sessionRouter.route('/create-user').post(createUser)


sessionRouter.route('/check-session').get(sessionChecker)


sessionRouter.route('/add-to-cart').post()


module.exports = sessionRouter