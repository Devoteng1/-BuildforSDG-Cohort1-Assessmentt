const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const js2xmlparser = require('js2xmlparser');

const estimator = require('./src/estimator');

const app = express();

const logFile = 'logs.txt';

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(compression());

app.use(express.static('./public'));

app.post('/api/v1/on-covid-19', (req, res) => {
  const start = new Date();
  const result = estimator(req.body);
  const end = new Date();

  logData('POST', req.route.path, end - start);

  res.json(result);
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const start = new Date();
  const result = estimator(req.body);
  const end = new Date();

  logData('POST', req.route.path, end - start);

  res.json(result);
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const start = new Date();
  const result = js2xmlparser.parse('root', estimator(req.body));
  const end = new Date();

  logData('POST', req.route.path, end - start);

  res.header('Content-Type', 'application/xml; charset=UTF-8');
  res.send(result);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const start = new Date();

  fs.readFile(path.join(__dirname, logFile), 'UTF-8', (error, content) => {
    const end = new Date();

    logData('GET', req.route.path, end - start);

    res.send(content || '');
  });
});

app.delete('/api/v1/on-covid-19/logs', (req, res) => {
  fs.unlink(logFile, () => {});
  res.send('Deleted');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Express app running on port ${PORT}`);

function logData(method, requestPath, time) {
  if (time < 10) {
    time = `0${time.toString()}`;
  }

  fs.appendFile(logFile, `${method}\t\t${requestPath}\t\t200\t\t${time}ms\n`, () => {});
}

