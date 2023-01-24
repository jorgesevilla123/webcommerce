const { Router } = require('express')
const { getProducts, searchProducts, getProductsByCategory } =  require("../controllers/products-controllers")

let router = Router()







router.route('/get-products').get(getProducts)



router.route('/search-products').get(searchProducts)



router.route('/get-category/:category/:page').get(getProductsByCategory)





module.exports = router