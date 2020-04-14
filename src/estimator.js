const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfected = data.reportedCases * 10;
  const severeCurrentlyInfected = data.reportedCases * 50;
  // Calculate the time to elapse
  let estimateTime;
  if (data.periodType === 'days') {
    estimateTime = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    estimateTime = data.timeToElapse * 7;
  } else if (data.periodType === 'months') {
    estimateTime = data.timeToElapse * 30;
  }
  const setOfDays = Math.floor(estimateTime / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** setOfDays);
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** setOfDays);

  const severeCasesByRequestedTime = Math.floor((15 / 100) * infectionsByRequestedTime);
  const severeSevereCasesByRequestedTime = Math.floor((15 / 100) * severeInfectionsByRequestedTime);

  // calculate the number of beds
  const bedsAlreadyOccupied = Math.floor((65 / 100) * data.totalHospitalBeds);
  const availableBeds = Math.floor(data.totalHospitalBeds - bedsAlreadyOccupied);
  const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
  const severeHospitalBedsByRequestedTime = availableBeds - severeSevereCasesByRequestedTime;

  // cases that require ICU care
  const casesForICUByRequestedTime = Math.floor((5 / 100) * infectionsByRequestedTime);
  const severeCasesForICUByRequestedTime = Math.floor((5 / 100) * severeInfectionsByRequestedTime);

  // cases that will require ventilators
  const casesForVentilatorsByRequestedTime = Math.floor((2 / 100) * infectionsByRequestedTime);
  const severeCasesForVentByRequestedTime = Math.floor((2 / 100) * severeInfectionsByRequestedTime);

  // amount of money to be lost in the economy
  const totalIncome = data.region.avgDailyIncomeInUSD * estimateTime;
  const dailyAvgIncome = data.region.avgDailyIncomePopulation;
  const dollarsInFlight = (infectionsByRequestedTime * dailyAvgIncome) * totalIncome;
  const calculation = severeInfectionsByRequestedTime * dailyAvgIncome;
  const serverDollarsInFlight = calculation * totalIncome;
  // return response data
  return {
    data: input,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeCasesForVentByRequestedTime,
      dollarsInFlight: serverDollarsInFlight
    }
  };
};
module.exports = covid19ImpactEstimator;
