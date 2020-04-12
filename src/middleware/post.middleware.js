const postMiddleware = (req, res, next) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const {
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;
  if (!region || !periodType || !timeToElapse || !reportedCases
      || !population || !totalHospitalBeds || !avgDailyIncomeInUSD || !avgDailyIncomePopulation) {
    return res.status(400).json({
      message: 'values are required'
    });
  }
  return next();
};

module.exports = postMiddleware;
