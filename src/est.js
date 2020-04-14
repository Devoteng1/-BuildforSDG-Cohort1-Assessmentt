const { impact, severeImpact } = require('./constants');
const { aggregateResults } = require('./aggregators');

const covid19ImpactEstimator = (data) => ({
  data,
  impact: aggregateResults(data, impact),
  severeImpact: aggregateResults(data, severeImpact)
});

module.exports = covid19ImpactEstimator;