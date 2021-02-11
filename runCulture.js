const fs = require("fs");
const functions = require("./petriDish");

const readableFile = (filePath) => {
  const text = fs.readFileSync(filePath, "utf8");
  return (textByLine = text.split("\n"));
};

//uncomment out lines 11-13 to run the sample cultures file

// const sample = readableFile("./sample-cultures.txt");
// let sampleDish = functions.stringArrayToDish(sample);
// let stabilized = functions.stabilizeSample(sampleDish);

const cultureSample = readableFile("./cell-cultures.txt");
const petriDish = functions.stringArrayToDish(cultureSample);

const stabilized = functions.stabilizeSample(petriDish);

const analysis = functions.dishAnalysis(stabilized.dish);

const finalStats = {
  cycleCount: stabilized.cycleCount,
  cultureCount: analysis.cultureCount,
  cultureRatio: analysis.cultureRatio,
};

console.log(finalStats);
