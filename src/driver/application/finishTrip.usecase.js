const repository = require('../infrastructure/repositories/finishTrip.repository');
module.exports = async (req) => {
 return repository(req)
}