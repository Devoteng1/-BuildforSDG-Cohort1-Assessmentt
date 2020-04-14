/*const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');



//import Routes
const postEstimate =require('./src/route/postEstimate.route');
const getLogs = require('./src/route/getLogs.route');



// import swagger file
//const apiDocs = require('../swagger.json');

dotenv.config();

const app = express();

//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//cors
app.use(cors());

//morgan
app.use(morgan('dev'));


// log all requests to access.log
app.use(morgan('tiny', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' })
  }));

const PORT = process.env.PORT || 6000

//routes
app.use('/api/v1', postEstimate);
app.use('/api/v1', getLogs);

// api docs
//app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));


//welcome routes
app.get('/', (req,res) => {
  res.status(200).json({
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
});*/

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { toXML } = require('jstoxml');

const estimator = require('./src/estimator');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), {
  flags: 'a'
});
// middleware

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  morgan(':method :url :status :response-time ms', { stream: accessLogStream })
);

const PORT = process.env.PORT || 8000;

app.post('/api/v1/on-covid-19', (req, res) => {
  const result = estimator(req.body);
  res.status(200).json(result);
});

app.post('/api/v1/on-covid-19/:restype', (req, res) => {
  const { restype } = req.params;
  const results = estimator(req.body);

  if (restype === 'xml') { 
    res.setHeader('Content-Type', 'application/xml');
    const resultXML = toXML({
      root: results
    });
    return res.status(200).send(resultXML);
  }
  return res.status(200).json(results);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, 'logs.log'), {
    encoding: 'utf8'
  });

  res.setHeader('Content-Type', 'text/plain');

  res.status(200).send(file);
});

app.use((req, res) => {
  // console.log(res);
  res.status(404).json({ message: '404' });
});
//welcome routes
app.use('/',(req,res) => {
    res.status(200).json({
        message: 'welcome to the api'
    });
  });
  
  //catch wrong route
  app.use('*', (req,res) => {
      res.status(404).json({
          message: 'route does not  exist'
      })
  })
  //console.log(estimator)

app.listen(PORT, () => {
  console.info(`App listening on PORT ${PORT}`);
});