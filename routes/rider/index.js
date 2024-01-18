const router = require('express').Router()

router.use('/', [
  require('./requestTrip.router'),
])

module.exports = router