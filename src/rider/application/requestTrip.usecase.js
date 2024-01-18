const repository = require('../infrastructure/repositories/requestTrip.repository');
module.exports = async (req) => {
 return repository(req)
}