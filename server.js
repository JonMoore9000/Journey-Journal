// Include our packages in our main server file
const express = require('express');
app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/main');
const User = require('./users/user');
//const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const port = 8080;

mongoose.Promise = global.Promise;

//const {router: adventureRouter} = require('./logs');
//const {router: userRouter} = require('./users');

//mongoose.Promise = global.Promise;

// Use body-parser to get POST requests for API use
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
  next();
});

const {PORT, DATABASE_URL} = require('./config');

// protected endpoint /main. token authentication

//app.use('/logs', adventureRouter);
//app.use('/users', userRouter);

// Initialize passport for use
app.use(passport.initialize());

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {
  res.send('Relax. We will put the home page here later.');
});

app.get('/logs', function(req, res) {
  console.log(res.body);
});

// connect to db
//mongoose.connect(config.database);

// Bring in defined Passport Strategy
require('./config/passport')(passport);

//app.post('/logs', (req, res) => {
  //res.json(res.body);
  //});

  //app.post('/users', (req, res) => {
    //res.json(res.body);
    //});

// verify token
//apiRoutes.use(function(req, res, next) {
  //var token = req.response.token || req.query.token || req.headers['x-access-token'];
  //if (token) {
  //  jwt.verify(token, app.get('secret'), function(err, decoded) {
  ///    if (err) {
  //      return res.json({ success: false, message: 'Failed to authenticate token.' });
  //    } else {
  //      req.decoded = decoded;
  //      next();
  //    }
  //  });
  //} else {
  //  return res.status(403).send({
  //      success: false,
  //      message: 'No token provided.'
  //  });
  //}
//});

//app.use('/main', apiRoutes);

// Create API group routes
const apiRoutes = express.Router();

// Register new users
apiRoutes.post('/register', function(req, res) {
  if(!req.body.username || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That username address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(400).json({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(400).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

// Protect dashboard route with JWT
apiRoutes.get('/main', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});

apiRoutes.get('/get', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});

apiRoutes.get('/add', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/api', apiRoutes);

//if (require.main === module) {
  //  runServer().catch(err => console.error(err));
//};

// Start the server
//app.listen(port);
//console.log('Your server is running on port ' + port + '.');

let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(PORT, () => {
                console.log(`Your app is SUPER listening on port ${PORT}`);
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
