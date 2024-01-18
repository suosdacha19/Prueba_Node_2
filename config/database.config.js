module.exports = {
  development: {
    username: process.env.DEV_DB_PG_USERNAME,
    password: process.env.DEV_DB_PG_PASSWORD,
    database: process.env.DEV_DB_PG_NAME,
    schema: process.env.DEV_DB_PG_SCHEMA,
    host: process.env.DEV_DB_PG_HOSTNAME,
    port: process.env.DEV_DB_PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: console.log
  },
  test: {
    username: process.env.TEST_DB_PG_USERNAME,
    password: process.env.TEST_DB_PG_PASSWORD,
    database: process.env.TEST_DB_PG_NAME,
    schema: process.env.TEST_DB_PG_SCHEMA,
    host: process.env.TEST_DB_PG_HOSTNAME,
    port: process.env.TEST_DB_PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    },
    logging: console.log
  },
  production: {
    username: process.env.PROD_DB_PG_USERNAME,
    password: process.env.PROD_DB_PG_PASSWORD,
    database: process.env.PROD_DB_PG_NAME,
    schema: process.env.PROD_DB_PG_SCHEMA,
    host: process.env.PROD_DB_PG_HOSTNAME,
    port: process.env.PROD_DB_PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    },
    logging: console.log
  }
}
