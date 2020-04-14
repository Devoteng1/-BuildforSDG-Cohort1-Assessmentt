const {
    getNumberOfDays,
    dollarsInFlightCalc,
    casesForVentilatorsByRequestedTimeCalc,
    casesForICUByRequestedTimeCalc,
    hospitalBedsByRequestedTimeCalc,
    severeCasesByRequestedTimeCalc,
    infectionsByRequestedTimeCalc,
    currentlyInfectedCalc
  } = require('./calculators');
  
  function aggregateResults(data, type) {
    const {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    } = data;
    const noOfDays = getNumberOfDays(timeToElapse, periodType);
    const currentlyInfected = currentlyInfectedCalc(
      reportedCases,
      type,
      population
    );
    const infectionsByRequestedTime = infectionsByRequestedTimeCalc(
      currentlyInfected,
      noOfDays,
      population
    );
    const severeCasesByRequestedTime = severeCasesByRequestedTimeCalc(
      infectionsByRequestedTime
    );
    const hospitalBedsByRequestedTime = hospitalBedsByRequestedTimeCalc(
      severeCasesByRequestedTime,
      totalHospitalBeds
    );
    const casesForICUByRequestedTime = casesForICUByRequestedTimeCalc(
      infectionsByRequestedTime
    );
    const casesForVentilatorsByRequestedTime = casesForVentilatorsByRequestedTimeCalc(
      infectionsByRequestedTime
    );
    const dollarsInFlight = dollarsInFlightCalc(
      infectionsByRequestedTime,
      region,
      noOfDays
    );
  
    const result = {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  
    return result;
  }
  
  module.exports = {
    aggregateResults
  };