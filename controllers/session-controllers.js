const { client } = require('../server')






let session;



function getUsers(req, res){
    console.log('getting users')
    res.send('Hey nigga')
}







function createUser(req, res){
  
    let {name, email, password, repeatPassword, contact_phone } = req.body
    
    console.log(name, email, password, repeatPassword,contact_phone)
    
    
    let newUser = {
        name: name,
        email: email,
        contact_phone: contact_phone,
        cart: []
    }

    let passwordsMatch = password === repeatPassword

    if(passwordsMatch){
        
    
    session = req.session

    req.session.profile = newUser

    res.json({profile: req.session.profile, message: 'Usuario creado', created: true})

    }
    else {
        res.json({message: 'Las contraseñas no coinciden', created: false})
    }
    

}



function addToCart(){
    console.log(req.body)
    console.log(session.profile.cart)

}






function loginUser(){
    
}    




function sessionChecker(req, res, next){
    console.log(session.id)
    // console.log(`Session Checker: ${req.session.id}`.green);
    // console.log(req.session);
    // if (req.session.profile) {
    //     console.log(`Found User Session`.green);
    //     next();
    // } else {
    //     console.log(`No User Session Found`.red);
    //     res.json({message: 'There is no user motherfucker'});
    // }

}


module.exports = { getUsers, sessionChecker, createUser }