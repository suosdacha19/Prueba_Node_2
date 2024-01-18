const router = require('express').Router()
const controller = require('../../src/driver/infrastructure/controllers/finishTrip.controller')
module.exports = router.post('/finish-trip', controller)
