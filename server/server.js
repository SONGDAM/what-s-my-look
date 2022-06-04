const express = require('express');

// eslint-disable-next-line no-unused-vars
const path = require('path');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const server = require('http').createServer(app);
// eslint-disable-next-line no-unused-vars
const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
// eslint-disable-next-line no-unused-vars
require('dotenv').config();

server.listen(8080, () => {
  console.log('server is running on 8080');
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      localStorage.setItem('token', accessToken);
      return done(null, profile);
    }
  )
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'ThisSecretIsEqualToCustomKeyForEncryption.',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//router
app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/auth/google', function (req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:3000/liked',
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

app.get('/api', (req, res) => {
  res.send('hello');
});

// eslint-disable-next-line no-unused-vars
// app.post('/liked',(req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(301).redirect('/');
//   }
// };

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

app.get('/api/user', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  connection.query('SELECT * FROM member', (err, results) => {
    res.send(results);
  });
});

app.get('/api/image', (req, res) => {
  connection.query('SELECT * FROM image', (err, result) => {
    res.send(result);
  });
});

app.post('/api/like', (req, res) => {
  const id = req.body.id;
  const imageName = req.body.imageName;

  const sql = `INSERT INTO likes (member_id, image_name) VALUES (${id}','${imageName}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log('err');
    }
    res.send(result);
  });
});

app.use(cors());
