let express = require('express')
let path = require('path')
let app = express()
const { startConnection } = require('./db')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const productsRoutes = require('./routes/products-routes');




dotenv.config()

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));





app.use(express.static(__dirname + '/dist/refri-web'))



app.use('/api/products', productsRoutes);






app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+
    '/dist/refri-web/index.html'));});










function runServer(){

    startConnection();

    let port = process.env.PORT || 4300

    
    app.listen(port, () => {
        console.log('Node server running good on port: ', port)
    })

    
}


runServer()

