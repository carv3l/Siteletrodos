const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();


const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 8080;
app.use(cors());



const uri = 'mongodb+srv://root:toor@cluster0-6wgtv.gcp.mongodb.net/Eletrodos?retryWrites=true&w=majority';


//app.use(bodyParser.json());
//app.use(express.json());
//
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
var db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB database connection established successfully");
  })
  const routes = require("./routes/routes");
  const routesmeasures = require("./routes/routes_measures");
  const routesusers = require("./routes/routes_users");

  
    app.use('/soil', routes);
    app.use('/measures', routesmeasures);
    app.use('/users', routesusers);

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });