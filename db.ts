import { connect } from 'mongoose';





export function startConnection(){
    connect('mongodb://localhost/Refridb').then( db => console.log('Db successfullt connected'))
    .catch( err => console.log('Unexpected error ', err))

}

