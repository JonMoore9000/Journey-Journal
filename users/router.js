const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('./models');

const { SECRET, EXPIRATIONTIME } = require('../config');

const router = express.Router();

router.use(jsonParser);

const strategy = new BasicStrategy(
  (username, password, cb) => {
    User
      .findOne({username})
      .exec()
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect username'
          });
        }
        if (user.password !== password) {
          return cb(null, false, 'Incorrect password');
        }
        return cb(null, user);
      })
      .catch(err => cb(err))
});

passport.use(strategy);

// new user
router.post('/', function (req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: `No request body`
        });
    }
    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.staus(422).json({
            message: 'Incorrect field length: username'
        });
    }

    var password = req.body.password;

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        })
    }

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    if (password.length < 6 || password.length > 15) {
        return res.status(422).json({
            message: 'Password needs to be at least 6 characters and not more than 15'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    return User
        .find({
            username
        })
        .count()
        .exec()
        .then(count => {
            if (count > 0) {
                return res.status(422).json({
                    message: 'username already taken'
                });
            }

            return User.hashPassword(password)
        })
        .then(hash => {
            return User
                .create({
                    username: username,
                    password: hash
                })
        })
        .then(user => {
            return res.status(201).json({});
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error'
            })
        });
});

// GET just to test if we are adding users
router.get('/', (req, res) => {
  return User
    .find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'}));
});

const basicStrategy = new BasicStrategy(function(username, password, callback) {
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(basicStrategy);
router.use(passport.initialize());

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'missing field in body'});
    }
    User
    .findOne({username: username})
    .exec()
    .then(_user => {
        const user = _user;
        if (!user) {
            return res.status(401).json({message: 'Incorrect username.'});
        }
        return user;
    })
    .then((user)=> {
        if (!user.validatePassword(password)) {
            return res.status(401).json({message: 'Incorrect password.'});
        } else {
            const token = jwt.sign(user, SECRET);
            return res.status(200).json({
                success: true,
                token: 'JWT ' + token,
                tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
                user: user.apiRepr()
            });
        }
    })
    .catch(err => {
        console.log('error ' + err);
        return res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = router;
