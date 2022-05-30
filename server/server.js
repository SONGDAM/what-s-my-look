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

server.listen(8080, () => {
  console.log('server is running on 8080');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api', (req, res) => {
  res.send('hello');
});

app.get('/api/user', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  connection.query('SELECT * FROM member', (err, results) => {
    res.send(results);
  });
});

app.use(cors());
