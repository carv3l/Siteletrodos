const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());


const uri = process.env.ATLAS_URI;



//app.use(bodyParser.json());
app.use(express.json());


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB database connection established successfully");
  })
  const routes = require("./routes/routes");

  
    app.use('/soil', routes);

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });