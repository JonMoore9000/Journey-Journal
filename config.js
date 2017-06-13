//export default {
  //CONFIG_NAME: 'Default Config',
  //ENV: process.env.NODE_ENV,
  //SAVE_DATA_ENDPOINT: 'http://localhost:8080',
//}

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
						//'mongodb://localhost/journeys';
            'mongodb://jon:allison9@ds149501.mlab.com:49501/capstonethree';
exports.PORT = process.env.PORT || 8080;

exports.SECRET = process.env.SECRET || 'secrettest';
exports.EXPIRATIONTIME = 20000;
