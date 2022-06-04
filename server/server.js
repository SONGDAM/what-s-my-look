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
//const MySQLStore = require('express-mysql-session')(session);
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
      connection.query(
        `SELECT * FROM member WHERE id=${profile.id}`,
        (err, user) => {
          if (err) {
            return done(err);
          } else if (user) {
            console.log('유저');
            return done(null, user);
          } else {
            console.log('새 유저');
            console.log('user', user);
            let newUser = {
              google_id: profile.id,
              google_token: accessToken,
              google_email: profile.emails[0].value,
              google_name: profile.name.givenName,
              // + ' ' + profile.name.familyName,
            };

            connection.query(
              `INSERT INTO member (id, token, email, name) VALUES ('${newUser.google_id}','${newUser.google_token}', '${newUser.google_email}', '${newUser.google_name}' ) `,
              (err, rows) => {
                if (err) {
                  console.log(err);
                }
                console.log('rows', rows, '-----', newUser);
                return done(null, newUser);
              }
            );
          }
        }
      );
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

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

//router
app.get('/', (req, res) => {
  res.send('hello');
});

//구글 로그인 화면
app.get('/auth/google', function (req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
});

//구글 로그인 성공과 실패 리다이렉트
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:3000/liked',
  })
);

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser((user, done) => {
  done(null, user);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
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

app.get('/api/get/user', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  connection.query('SELECT * FROM member', (err, results) => {
    res.send(results);
  });
});

//image join likes
app.get('/api/imageAndLikeCount', (req, res) => {
  const sql = `SELECT *, COUNT(l.image_name) count FROM image i left JOIN likes l ON l.image_name= i.name GROUP BY i.name`;
  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

app.get('/api/get/like', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  connection.query('SELECT * FROM likes', (err, results) => {
    res.send(results);
  });
});

app.get('/api/getImageCount', (req, res) => {
  const sql = `SELECT image_name, COUNT(image_name) count FROM likes GROUP BY image_name`;
  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

//좋아요 post
app.post('/api/post/like', (req, res) => {
  const id = req.body.id;
  const imageName = req.body.imageName;
  const sql = `INSERT INTO likes (member_id, image_name) VALUES ('${id}','${imageName}')`;

  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

//좋아요 취소 post
app.post('/api/post/unLike', (req, res) => {
  const lno = req.body.lno;
  const sql = `DELETE FROM likes where lno='${lno}'`;

  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

app.use(cors());
