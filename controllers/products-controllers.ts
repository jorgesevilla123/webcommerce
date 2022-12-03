import Product from '../models/product-models'
import {Request, Response} from 'express'


export function getProducts(req: Request, res: Response){
    Product.find( (err, products) => {
        if(err){
            res.send(err)
        }
        else {
            res.json(products)
        }

    })
}









export function searchProducts(req: Request, res: Response){
    let query = req.query.q
    console.log(query)
    let regex = new RegExp(`${query}`, 'gi')
    


    Product.find({$or: [{title: regex}, {modelo: regex}]}).exec(
        (err, products) => {
            if(err){
                res.json({ message: 'Error ocurred getting products', err})
            }
            else {
                res.json(products)
            }
        }
    )

}



















export function decreaseInventory(products: any[]){
    console.log(products)



    products.forEach( (product: { _id: any; cantidad: number }) => {
        Product.updateOne({_id: product._id}, {$inc: {cantidad: -product.cantidad}}, (err: any, products: any) => {
            if(err){
                console.log(err)
            }
            else {
                console.log('Products quantity updated')
            }
        })
    })



    



}


export function increaseInventory(req: Request, res: Response){

}


export function test(req: any, res: { send: (arg0: string) => void }){
    res.send('Hello mothafucka')
}



