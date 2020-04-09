const covid19ImpactEstimator = (data) => {
  
  const output = {
    data ,
    impact : {
        currentlyInfected: null,
        infectionsByRequestedTime: null,
        severeCasesByRequestedTime: null,
        hospitalBedsByRequestedTime: null,

      },
    severeImpact : {
        currentlyInfected: null,
        infectionsByRequestedTime: null,
        severeCasesByRequestedTime: null,
        hospitalBedsByRequestedTime: null
      }

  }  

  const {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation 
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds } = data;
    // currently infected people for impact       
    output.impact.currentlyInfected = reportedCases * 10;
    output.impact.infectionsByRequestedTime = output.impact.currentlyInfected * 512;
    output.impact.severeCasesByRequestedTime = output.impact.infectionsByRequestedTime * 0.15

    // currently infected people for severeImpact
    output.severeImpact.currentlyInfected = reportedCases * 50;
    output.severeImpact.infectionsByRequestedTime = output.severeImpact.currentlyInfected * 512;
    output.severeImpact.severeCasesByRequestedTime = output.severeImpact.infectionsByRequestedTime * 0.15;

    
    return output; 
     };

export default covid19ImpactEstimator;
