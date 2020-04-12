const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();


//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//cors
app.use(cors());

//morgan
app.use(morgan('dev'));

dotenv.config();

const PORT = process.env.PORT || 6000

//routes
//app.use('/')


//welcome routes
app.get('/', (req,res) => {
  res.status(404).json({
      message: 'welcome to the api'
  });
});

//catch wrong route
app.use('*', (req,res) => {
    res.status(404).json({
        message: 'route does not  exist'
    })
})






app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});