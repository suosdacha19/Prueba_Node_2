const usecase = require('../../application/finishTrip.usecase');
module.exports = (req, res, next) => {
    usecase(req).then(({ status, data}) => {
        res.status(status).json(data);
   }).catch((err) => {
        next(err);
   });
}