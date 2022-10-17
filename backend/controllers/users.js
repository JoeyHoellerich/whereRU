const users = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

module.exports = users