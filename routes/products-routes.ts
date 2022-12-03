import  { Router } from 'express'
import { getProducts, searchProducts, test } from "../controllers/products-controllers";

const router = Router();





router.route('/').get(test)

router.route('/get-products').get(getProducts)



router.route('/search-products').get(searchProducts)



router.route('/decrease-inventory').put()


router.route('/increase-inventory').put()


export default router