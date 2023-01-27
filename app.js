require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

const getCensusData = require('./apis/application');
const getPropData = require('./apis/homepage-property-data');
const buildDashPage = require('./apis/queryPGforDashData');
const registerController = require('./controllers/registerController');
const authController = require('./controllers/authController');
const refreshTokenController = require('./controllers/refreshTokenController');
const logoutController = require('./controllers/logoutController');
const sidebarAddress = require('./apis/sidebarAddress');

//Queries for Dashboard
const housingQuery = require('./apis/dashControllers/housingQuery');
const populationQuery = require('./apis/dashControllers/populationQuery');
const incomeQuery = require('./apis/dashControllers/incomeQuery');
const overviewQuery = require('./apis/dashControllers/overviewQuery');

const verifyJWT = require('./middleware/verifyJWT');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { verify } = require('crypto');
const cors = require('cors');
const cloudinary = require('cloudinary');
const corsOptions = require('./config/corsOptions');
const credentials = require('./controllers/credentials')

const app = express();
app.use(credentials);



app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// cloudinary.config({
//   cloud_name: 'djlalgsmk',
//   api_key: '386655761436352',
//   api_secret: 'Ous8jCUrug-uZH7OVLRfkZCKARk'
// });


//Recieve user registration data from react
app.post('/register', registerController.handleNewUser);

app.post('/signin', authController.handleLogin);

app.get('/refresh', refreshTokenController.handleRefreshToken);

app.get('/logout', logoutController.handleLogout);

//sends homepage data to react
app.get('/properties', (req, res) => {
  getPropData.getPropertyData().then((result) => {
    res.json(result);
  });
});

//sidebar header address fetch
app.get('/properties/:id', (req, res) => {
  const queryParam = parseInt(req.params.id)
  sidebarAddress.query(queryParam).then((result) =>  {
    res.json(result);
  });
});

//Recieves user property form data and compiles results to pg
app.post('/posts', (req, res) => {
  const propAddress = req.body.address;
  getCensusData.calculateData(propAddress).then(function(result) {
    res.send(result); //Gets id of postgres insert
  });
});

app.get('/overview/:id', (req, res) => {
  const queryParam = parseInt(req.params.id);
  overviewQuery.queryOverview(queryParam).then((result) => {
    res.json(result);
  });
});

app.get('/population/:id', (req, res) => {
  const queryParam = parseInt(req.params.id);
  populationQuery.queryPop(queryParam).then((result) => {
    res.json(result);
  });
});

app.get('/housing/:id', (req, res) => {
  const queryParam = parseInt(req.params.id);
  housingQuery.queryHouse(queryParam).then((result) => {
    res.json(result);
  });
});

app.get('/income/:id', (req, res) => {
  const queryParam = parseInt(req.params.id);
  incomeQuery.queryIncome(queryParam).then((result) => {
    res.json(result);
  });
});

app.get('/listing/:id', (req, res) => {
  const queryParam = parseInt(req.params.id);
  populationQuery.queryPop(queryParam).then((result) => {
    res.json(result);
  });
});

app.use(verifyJWT);

const PORT = process.env.PORT || 5000;

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, (err) => {
  if (err) console.log("error in Setup")
  console.log("Connected to Server!");
});


//functions


//Check to see if user is logged in
// function checkLoggedIn(req, res, next) {
//   // console.log('Current user is:', req.user);
//   const isLoggedIn = req.isAuthenticated() && req.user;
//   if (!isLoggedIn) {
//     return res.status(401).json({
//       error: 'You must log in!',
//     });
//   }
//   next();
// }
//
// function verifyGoogleCallback(accessToken, refreshToken, profile, done) {
//   console.log('Google profile', profile);
//   done(null, profile);
// };

// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['email'],
// }));
//
// app.get('/auth/google/callback', passport.authenticate('google', {
//   failureRedirect: '/failure',
//   successRedirect: '/',
//   session: true,
// }), (req, res) => {
//   console.log('Google called us back!');
// });
//
// app.get('/auth/logout', (req, res) => {
//   req.logout(); //Removes req.user and clears any logged in session
//   res.redirect('/');
// });
//
// app.get('/secret', checkLoggedIn, (req, res) => {
//   return res.send('Your secret is gay...');
// });
//
// app.get('/failure', (req, res) => {
//   return res.send('Failed to login!');
// })

// const config = {
//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   COOKIE_KEY_A: process.env.COOKIE_KEY_A,
//   COOKIE_KEY_B: process.env.COOKIE_KEY_B,
// };
//
// const GOOGLE_AUTH_OPTIONS = {
//   callbackURL: '/auth/google/callback',
//   clientID: config.GOOGLE_CLIENT_ID,
//   clientSecret: config.GOOGLE_CLIENT_SECRET,
// };
//
// passport.use(new Strategy(GOOGLE_AUTH_OPTIONS, verifyGoogleCallback));
//
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// }); //Save the session to the cookie
//
// passport.deserializeUser((id, done) => {
//   done(null, id);
// }); //Read the session from the cookie
