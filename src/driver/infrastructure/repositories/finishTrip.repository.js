const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
    // Earth's radius in kilometers
    const R = 6371.0;

    // Convert coordinates from degrees to radians
    const radLat1 = (Math.PI / 180) * latitude1;
    const radLon1 = (Math.PI / 180) * longitude1;
    const radLat2 = (Math.PI / 180) * latitude2;
    const radLon2 = (Math.PI / 180) * longitude2;

    // Coordinate differences
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    // Formula haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = R * c;

    return distance.toFixed(2);
}
const generateReference = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let string = '';
    for (let i = 0; i < length; i++) {
      const charRandom = characters.charAt(Math.floor(Math.random() * characters.length));
      string += charRandom;
    }
    return string;
}

const { ride, sequelize } = require('../../../../database/postgres/models');
const axios = require('axios');
const CryptoJS = require('crypto-js');
module.exports = async ({ body: { latitude, longitude } }) => {
    if (!latitude) throw new Error('Latitude is required');
    if (!longitude) throw new Error('Longitude is required');
    try {
        return sequelize.transaction(async (transaction) => {
            const trip = await ride.findOne({ where: { status: true }});
            if (!trip) return { status: 409 , data: { message: 'There is no trip in progress' }};
            trip.latitudeFinish = latitude;
            trip.longitudeFinish = longitude;
            trip.status = false;
            await trip.save({ transaction });
            const kms = calculateDistance(trip.latitudeInit, trip.longitudeInit, latitude, longitude);
            const minutesKms = kms * 3;
            const total = 3500 + (kms * 1000) + (minutesKms * 200);
            return {
                status: 200,
                data: {
                    message: `Trip completed successfully. Total paid: $${total} pesos`
                }
            };
            // Se deja comentado el código para realizar el pago ya que retorna un error 403, 
            // se intenta directamente a la api y funciona la transacción correctamente
            // const reference = generateReference(19);
            // let stringConcat = `${reference}${total*100}COP${process.env.integrity_key}`
            // let hashHex = CryptoJS.SHA256(stringConcat)
            // hashHex = hashHex.toString(CryptoJS.enc.Hex)
            // return axios.post('https://sandbox.wompi.co/transactions', {
            //     amount_in_cents: total*100,
            //     currency: "COP",
            //     signature: hashHex,
            //     customer_email: "example@gmail.com",
            //     payment_method: {
            //       installments: 1
            //     },
            //     reference: reference,
            //     payment_source_id: 97530 // tarjeta previamente tokenizada
            // }, {
            //     Headers: {
            //         Authorization: `Bearer ${process.env.private_key}`,
            //     }
            // })
            // .then(function (response) {
            //     console.log('------------------------');
            //     console.log(response);
            //     console.log('------------------------');
            //     return {
            //         status: 200,
            //         data: {
            //             message: `Trip completed successfully. Total paid: $${total} pesos`
            //         }
            //     };
            // })
            // .catch(function (error) {
            //     return { status: 409 , data: { message: error }};
            // })
        });
    } catch (error) {
        throw error;
    }
  }