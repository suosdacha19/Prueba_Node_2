const router = require('express').Router()
const controller = require('../../src/rider/infrastructure/controllers/requestTrip.controller')
module.exports = router.post('/request-trip', controller)
