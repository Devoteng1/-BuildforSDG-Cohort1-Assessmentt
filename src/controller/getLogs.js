const path = require('path');

const getLogs = (req, res) => {
  res.download(path.join(__dirname, '../logs.log'), 'requestsLog.txt');
};
module.exports = getLogs;
