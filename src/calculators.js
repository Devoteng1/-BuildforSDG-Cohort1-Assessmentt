/* eslint-disable linebreak-style */
// import { impact, severeImpact } from './constants';
const { severeImpact, periodTypeConstants } = require('./constants');

// currently infected depending on type - impact or severImpact
function currentlyInfectedCalc(reportedCases, type, population) {
  // if (type === severeImpact) {
  //   return Math.min(reportedCases * 50, population);
  // }
  // return Math.min(reportedCases * 10, population);
  console.log(population);
  if (type === severeImpact) {
    return reportedCases * 50;
  }
  return reportedCases * 10;
}

// project infections given the number of days
function infectionsByRequestedTimeCalc(
  currentlyInfected,
  noOfDays,
  population
) {
  const factor = Math.trunc(noOfDays / 3);
  // const infectionsByRequestedTime = Math.min(
  //   currentlyInfected * (2 ** factor),
  //   population
  // );
  console.log(population);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  return infectionsByRequestedTime;
}

// severe cases that require hospitalization
function severeCasesByRequestedTimeCalc(infectionsByRequestedTime) {
  const severeCasesByRequestedTime = Math.trunc(
    0.15 * infectionsByRequestedTime
  );

  return severeCasesByRequestedTime;
}

// hospital beds available using the requested time
function hospitalBedsByRequestedTimeCalc(
  severeCasesByRequestedTime,
  totalHospitalBeds
) {
  const availableHospitalBeds = 0.35 * totalHospitalBeds;
  const hospitalBedsByRequestedTime = availableHospitalBeds - severeCasesByRequestedTime;
  return Math.trunc(hospitalBedsByRequestedTime);
}

// cases requiring ICU

function casesForICUByRequestedTimeCalc(infectionsByRequestedTime) {
  const casesForICUByRequestedTime = Math.trunc(
    0.05 * infectionsByRequestedTime
  );
  return casesForICUByRequestedTime;
}

// cases requiring ventilators
function casesForVentilatorsByRequestedTimeCalc(infectionsByRequestedTime) {
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * infectionsByRequestedTime
  );
  return casesForVentilatorsByRequestedTime;
}

// dollars in flight
function dollarsInFlightCalc(infectionsByRequestedTime, region, noOfDays) {
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const avgDailyIncomePerPopulation = avgDailyIncomeInUSD * avgDailyIncomePopulation;
  const dollarsInFlight = (infectionsByRequestedTime * avgDailyIncomePerPopulation) / noOfDays;
  return Math.floor(dollarsInFlight);
}

function getNumberOfDays(timeToElapse, periodType) {
  if (periodType === periodTypeConstants.months) {
    return timeToElapse * 30;
  }
  if (periodType === periodTypeConstants.weeks) {
    return timeToElapse * 7;
  }
  return timeToElapse;
}

module.exports = {
  getNumberOfDays,
  dollarsInFlightCalc,
  casesForVentilatorsByRequestedTimeCalc,
  casesForICUByRequestedTimeCalc,
  hospitalBedsByRequestedTimeCalc,
  severeCasesByRequestedTimeCalc,
  infectionsByRequestedTimeCalc,
  currentlyInfectedCalc
};