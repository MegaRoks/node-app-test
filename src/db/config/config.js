require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DEV_URL_DB,
        dialect: 'postgres',
        dialectOptions: {
            ssl: true,
        },
    },
};
