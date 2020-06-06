const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

const uri = process.env.ATLAS_URI;

app.use(cors());

app.use(express.json());


mongoose.connect(uri, { useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


app.listen(port, function () {
    console.log("Running Server on port: " + port);
});