const { Router } = require('express')
const { getUsers, sessionChecker, createUser, addToCart, removeFromCart, updateQuantities } = require('../controllers/session-controllers')








let sessionRouter = Router()


sessionRouter.route('/get-session').get(getUsers)





sessionRouter.route('/create-user').post(createUser)




sessionRouter.route('/check-session').get(sessionChecker)




sessionRouter.route('/add-to-cart').post(addToCart)




sessionRouter.route('/remove-from-cart').delete(removeFromCart)


sessionRouter.route('/update-quantities').put(updateQuantities)



module.exports = sessionRouter