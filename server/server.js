const express = require('express');
// eslint-disable-next-line no-unused-vars
const path = require('path');
const cors = require('cors');
const app = express();

const server = require('http').createServer(app);

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

server.listen(8080, () => {
  console.log('server is running on 8080');
});
