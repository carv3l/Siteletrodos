const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.listen(port, function () {
    console.log("Running Server on port: " + port);
});