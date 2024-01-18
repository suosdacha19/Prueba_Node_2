const router = require('express').Router()

router.use('/', [
  require('./finishTrip.router'),
])

module.exports = router