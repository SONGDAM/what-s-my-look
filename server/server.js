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
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
// eslint-disable-next-line no-unused-vars
require('dotenv').config();
//dotenv.config({ path: path.join(__dirname, '/.env') });

console.log(process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECERET,
      callbackURL: 'http://localhost:3000/login/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

server.listen(8080, () => {
  console.log('server is running on 8080');
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({ secret: 'SECRET_CODE', resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

//router
app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/google', function (req, res, next) {
  // GET /user/google
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
});

app.get(
  '/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/liked',
  })
);

app.get('/api', (req, res) => {
  res.send('hello');
});

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// eslint-disable-next-line no-unused-vars
const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

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

  const sql = `INSERT INTO likes (member_id, image_name) VALUES ('${id}','${imageName}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.use(cors());
