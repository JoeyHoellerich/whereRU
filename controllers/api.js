const router = require ('express').Router()

router.use('/places', require("./places"))

module.exports = router