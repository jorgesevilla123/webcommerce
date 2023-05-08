const { createClient } = require('redis')

let redisClient = createClient()



redisClient.connect().then(() => {
    console.log('Client for handling sessions operations connected')
}).catch(err => { console.log(err) })


let session;



function getUsers(req, res) {

    redisClient.set('key', 'value').then(
        val => {
            console.log(val)
        }

    ).catch(
        err => {
            console.log('Error creating user', err)
        }
    )
    console.log('getting users')
    res.send('Hey nigga')
}







function createUser(req, res) {


    let { name, email, password, repeatPassword, contact_phone } = req.body

    console.log(name, email, password, repeatPassword, contact_phone)


    let newUser = {
        name: name,
        email: email,
        contact_phone: contact_phone,
        cart: []
    }

    let passwordsMatch = password === repeatPassword

    if (passwordsMatch) {

        let profile_data = JSON.stringify(newUser)

        redisClient.set('userid', req.session.id).then(
            val => {
                console.log('Id saved')
            }
        ).catch(
            err => {
                console.log('Error saving id ', err)
            }
        )


        redisClient.set('profile', profile_data).then(
            val => {
                console.log('Profile saved')
            }
        ).catch(
            err => {
                console.log('Error saving id ', err)
            }
        )




        session = req.session

        req.session.profile = newUser

        res.json({ profile: req.session.profile, message: 'Usuario creado', created: true })

    }
    else {
        res.json({ message: 'Las contraseñas no coinciden', created: false })
    }
}



function addToCart(req, res) {



    redisClient.get('profile').then(
        profile => {
            if(profile){
                let profile_data = JSON.parse(profile)
                let product = {title: 'motor', id: `ID${profile_data.cart.length}`, cantidad: 5}
                profile_data.cart.push(product)
                console.log(profile_data)
                let parsedProfileData = JSON.stringify(profile_data)
                redisClient.set('profile', parsedProfileData).then(
                    () => {
                        res.json({message: 'Product added to cart'})
                    }
                ).catch(
                    err => {
                        res.json({mesage: 'Error adding product to cart'})
                    }
                )
            }
            else {
                res.json({message: 'There is no user logged'})
            }
        }
    ).catch(
        err => {
            console.log('Redis error in cart function ', err)
        }
    )


}






function loginUser() {

}




function removeFromCart(req, res){
    let id = req.query.id
    console.log(id)

    redisClient.get('profile').then(
        user => {
            let parsedProfile = JSON.parse(user)
            let index = parsedProfile.cart.findIndex( product => product.id === id)
            parsedProfile.cart.splice(index, 1)
            let userString = JSON.stringify(parsedProfile)
            redisClient.set('profile', userString).then(
                () => {
                    res.json({message: 'Product removed from cart', parsedProfile})
                }
            )
        
        }
    )

}





function updateQuantities(req, res){
    let body = req.body
    console.log('line 171 ', body.ids)

    if(body.ids.length > 1){
        ids.forEach(
            id => {
                console.log(id)
            }
        )
    }
    else {

        redisClient.get('profile').then(
            profile => {
                let parsedProfile = JSON.parse(profile)
                console.log('185 ', parsedProfile)
                let index = parsedProfile.cart.findIndex(
                    product => product.id === body.ids

                )
                console.log(index)
                console.log(parsedProfile.cart[index])
            }
        )
        

    }

}




function sessionChecker(req, res, next) {
    redisClient.get('userid').then(
        products => {
            if (products) {
                console.log('user found')
                res.json({ message: 'User found', logged: true })

            }
            else {
                console.log('user not found')
                res.json({ message: 'No user found', logged: false })
            }
        }

    ).catch(
        err => {
            res.json({ message: 'Error in redis ', err })
            console.log('not found')
        }
    )
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


module.exports = { getUsers, sessionChecker, createUser, addToCart, removeFromCart, updateQuantities }
