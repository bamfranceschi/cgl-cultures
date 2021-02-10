const fs = require("fs");
const functions = require("./petriDish");

const text = fs.readFileSync("./cell-cultures.txt", "utf8");
const textByLine = text.split("\n");

const sample = fs.readFileSync("./sample-cultures.txt", "utf8");
const sampleByLine = sample.split("\n");

//petri dish has now been cultured; every livable space is now inhabited. Count starts here at 1, representing first hour
let petriDish = functions.getCultured(textByLine);
let sampleDish = functions.getCultured(sampleByLine);

let stabilized = functions.stabilizeSample(petriDish);

let analysis = functions.dishAnalysis(stabilized.dish);

let finalStats = {
  cycleCount: stabilized.cycleCount,
  cultureCount: analysis.cultureCount,
  cultureRatio: analysis.cultureRatio,
};

console.log(finalStats);
