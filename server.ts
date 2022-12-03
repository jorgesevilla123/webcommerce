import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { startConnection } from './db';
import * as cors from 'cors';

import productRoutes from "./routes/products-routes";

import { exec } from 'child_process'


dotenv.config()


var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));






//routes for the API

app.use('/api/products', productRoutes);



 function runServer(){



    // implement redis server when intializing the server

    // exec('redis-server', (err, result) => {
    //     if(err){
    //         console.log('Could not execute the command', err)
    //     }
    //     else {
    //         console.log('Result: \n', result)
    //     }
    // })
    

    // let redisClient = redis.createClient();




    // redisClient.on('error', (err) => {
    //     console.log('Error connecting', err)
    // })


    const port = process.env['PORT'] || 4000

    startConnection();

    app.listen(port, () => {
        console.log('Node server running good on port: ', port)
    })


}


//run with npm run server:test
runServer();











