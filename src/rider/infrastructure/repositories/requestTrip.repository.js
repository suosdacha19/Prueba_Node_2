const { ride, sequelize } = require('../../../../database/postgres/models');
module.exports = async ({ body: { latitude, longitude } }) => {
    if (!latitude) throw new Error('Latitude is required');
    if (!longitude) throw new Error('Longitude is required');
    try {
        return sequelize.transaction(async (transaction) => {
            const valid = await ride.findOne({ where: { status: true }});
            console.log();
            if (valid) return { status: 409 , data: { message: 'You already have an active trip.' }};
            await ride.create({
                latitudeInit: latitude,
                longitudeInit: longitude,
                status: true
            }, { transaction });
            return {
                status: 201,
                data: {
                    message: 'Correctly requested trip.',
                    driver: {
                        name: 'Juan',
                        lastname: 'Perez',
                        car: 'Audi',
                        plate: 'ABC123'
                    }
                }
            };
        });
    } catch (error) {
        throw error;
    }
  }
  