//txt file becomes a two-dimensional array
const getCultured = (stringInput) => {
  const twoDArray = [];

  for (t = 0; t < stringInput.length; t++) {
    let oneDArray = [];
    for (let char of stringInput[t]) {
      if (char === "L") {
        char = "#";
        oneDArray.push(char);
      } else {
        oneDArray.push(char);
      }
    }
    twoDArray.push(oneDArray);
  }

  //leftover empty array at end, needs to be removed
  twoDArray.pop();

  return twoDArray;
};

const neighborCells = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

const stabilizeSample = (dish) => {
  let cycleCount = 1;
  let changes = true;

  while (changes) {
    changes = false;
    //run simulation
    for (row = 0; row < dish.length; row++) {
      for (column = 0; column < dish[row].length; column++) {
        //populated counter
        if (dish[row][column] === "#") {
          let populated = 0;
          //need to check how many neighbor cells are populated
          neighborCells.forEach(([x, y]) => {
            let newRow = row + y;
            let newCol = column + x;

            //stay in bounds of 2darray
            if (
              newRow >= 0 &&
              newRow < dish.length &&
              newCol >= 0 &&
              newCol < dish[row].length
            ) {
              //count populated neighbors
              if (dish[newRow][newCol] === "#") {
                populated += 1;
              }
            }
          });

          if (populated >= 4) {
            dish[row][column] = "L";
            //CHANGE HAPPENED
            changes = true;
          }
        }
        if (dish[row][column] === "L") {
          let populated = 0;

          neighborCells.forEach(([x, y]) => {
            let newRow = row + y;
            let newCol = column + x;

            //stay in bounds of 2darray
            if (
              newRow >= 0 &&
              newRow < dish.length &&
              newCol >= 0 &&
              newCol < dish[row].length
            ) {
              //count populated neighbors
              if (dish[newRow][newCol] === "#") {
                populated += 1;
              }
            }
          });

          if (populated === 0) {
            dish[row][column] = "#";
            //CHANGE HAPPENED
            changes = true;
          }
        }
      }
    }

    //increment count
    cycleCount += 1;
  }
  return { dish: dish, cycleCount: cycleCount };
};

const dishAnalysis = (dish) => {
  let cultureCount = 0;
  let livableCount = 0;

  for (row = 0; row < dish.length; row++) {
    for (column = 0; column < dish[row].length; column++) {
      if (dish[row][column] === "#") {
        cultureCount += 1;
      }
      if (dish[row][column] === "L") {
        livableCount += 1;
      }
    }
  }

  let cultureRatio = (cultureCount / (cultureCount + livableCount)) * 100;

  return { cultureCount: cultureCount, cultureRatio: cultureRatio };
};

module.exports = {
  getCultured,
  stabilizeSample,
  dishAnalysis,
};
