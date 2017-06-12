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
app.get('/main',
  jwt({secret: 'shhhhhhared-secret'}),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });

  jwt({ secret: 'shhhhhhared-secret',
  audience: '/main',
  issuer: '/login' })

app.use('/logs', adventureRouter);
app.use('/users', userRouter);

app.post('/logs', (req, res) => {
  res.json(res.body);
  });

  app.post('/users', (req, res) => {
    res.json(res.body);
    });

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
