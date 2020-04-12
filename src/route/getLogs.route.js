const { Router } = require('express');
const getLogs = require('../controller/getLogs');

const router = Router();

router.get('/on-covid-19/logs', getLogs);

module.exports = router;
