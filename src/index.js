const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

const apiRoutes = require('./routes/user.router');
const apiFiles = require('./routes/file.router');
const app = express();
const server = http.createServer(app);

const port = process.env.PORT;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);
app.use('/', apiFiles);

server.listen(port);

module.exports = app;
