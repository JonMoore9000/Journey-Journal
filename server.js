const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const app = express();

const {router: adventureRouter} = require('./logs');
const {router: userRouter} = require('./users');

mongoose.Promise = global.Promise;
app.use(bodyParser.json());

app.use(morgan('common'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
  next();
});

const {PORT, DATABASE_URL} = require('./config');

// protected endpoint /main. token authentication

app.use('/logs', adventureRouter);
app.use('/users', userRouter);

app.post('/logs', (req, res) => {
  res.json(res.body);
  });

  app.post('/users', (req, res) => {
    res.json(res.body);
    });

var apiRoutes = express.Router();

// verify token
apiRoutes.use(function(req, res, next) {
  var token = req.response.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

app.use('/main', apiRoutes);

let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
};

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
