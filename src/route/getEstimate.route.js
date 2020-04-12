
const { Router } = require('express');
const xmlParser = require('express-xml-bodyparser');
const postEstimate = require('../controller/postEstimate');

const options = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true
};

const router = Router();

router.post('/on-covid-19/json', postEstimate);
router.post('/on-covid-19/xml', xmlParser(options), postEstimate);

module.exports = router;
