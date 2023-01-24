const { Schema, model } = require('mongoose')




const productSchema = new Schema({
    title: {type: String, index: true},
    modelo: {type: String, index: true},
    precio: Number,
    cantidad: Number,
    imagePath: String,
    categorias: Array,
})


module.exports =  model('Product', productSchema);