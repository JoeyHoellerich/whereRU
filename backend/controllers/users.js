const users = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

users.get('/:username', async (req, res) => {
    let username = req.params.username

    const user = await User.findOne()

    if (!user) {
        res.send(false)
    } else {
        res.send(user)
    }
    //res.send("hello")
})

users.post('/', async (req, res) => {
    let doesExist = await User.exists({username: req.body.username})

    if (!doesExist){
        let password = req.body.password
        let user = await User.create({
            username: req.body.username,
            passwordDigest: await bcrypt.hash(password, 10)
        })
        res.json(user)
    } else {
        res.send(false)
    }
})

users.post('/authentication', async (req, res) => {
    let user = User.findOne({
        where: {username: req.body.username}
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: "incorrect username or password"
        })
    }

    else {
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET)
        res.status(200).json({user: user, token: token})
    }
})

users.get("/authentication/profile", async (req, res) => {
    try {
        //Split authorization header into ["Bearer", "Token"]
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        if (authenticationMethod == "Bearer"){
            const result = jwt.verify(token, process.env.JWT_SECRET)

            const { username } = result
            
            let user = await User.findOne({
                where: {
                    username: username
                }
            })
            res.json(user)
        }
    } catch {
        res.json(null)
    }
})

module.exports = users