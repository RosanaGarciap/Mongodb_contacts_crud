
require('dotenv').config() // Reading env variables must be the fisrt thing to do

const express = require('express');
const app = express();

const connectDB = require('./db/connection'); //load  the external connection


//Connects with DB 
connectDB();

//Receives JSON data
app.use(express.json({extended : false}));

//Default PORT
const port = process.env.port || 3000;

//Connect with routes folder
app.use('/contacts', require('./routes/contacts'));
app.listen(port, () => console.log(`server started on port ${port}`));

