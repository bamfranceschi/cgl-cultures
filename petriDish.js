const culture = "#";
const livable = "L";
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

//array of strings becomes a two-dimensional array
const stringArrayToDish = (stringArray) => {
  const dish = stringArray
    .map((line) => line.split(""))
    .filter((arr) => arr.length !== 0);

  return dish;
};

//function takes in neighbor cell coordinates and checks whether neighbor cells have a culture
const countNeighbors = (dish, row, column, neighborCells) => {
  let neighbors = 0;

  neighborCells.forEach(([x, y]) => {
    let neighborRow = row + y;
    let neighborCol = column + x;

    //stay in bounds of dish
    if (
      neighborRow >= 0 &&
      neighborRow < dish.length &&
      neighborCol >= 0 &&
      neighborCol < dish[row].length
    ) {
      //count populated neighbors
      if (dish[neighborRow][neighborCol] === culture) {
        neighbors += 1;
      }
    }
  });

  return neighbors;
};

const stabilizeSample = (dish) => {
  //first seeding of cultures, counts as 1st cycle. Thus, cycle count starts at 1
  dish = dish.map((row) =>
    row.map((cell) => (cell === livable ? culture : cell))
  );

  let cycleCount = 1;
  let changes = true;

  //while loop breaks once the sample stabilizes, i.e no changes have occurred in any cells
  while (changes) {
    //need deep copy of dish, so we change next state, not current.
    let dishCopy = JSON.parse(JSON.stringify(dish));

    changes = false;

    for (let row = 0; row < dish.length; row++) {
      for (let column = 0; column < dish[row].length; column++) {
        if (dish[row][column] === culture) {
          //count populated cells around cell
          let neighborCount = countNeighbors(dish, row, column, neighborCells);

          //culture dies due to overcrowding
          if (neighborCount >= 4) {
            dishCopy[row][column] = livable;
            changes = true;
          }
        }
        if (dish[row][column] === livable) {
          //count populated cells around cell

          let neighborCount = countNeighbors(dish, row, column, neighborCells);

          //cell grows culture
          if (neighborCount === 0) {
            dishCopy[row][column] = culture;
            changes = true;
          }
        }
      }
    }

    //reassign dish so we correctly update the next state
    dish = dishCopy;

    cycleCount += 1;
  }
  return { dish: dish, cycleCount: cycleCount };
};

const dishAnalysis = (dish) => {
  let cultureCount = 0;
  let livableCount = 0;

  for (let row = 0; row < dish.length; row++) {
    for (let column = 0; column < dish[row].length; column++) {
      if (dish[row][column] === culture) {
        cultureCount += 1;
      }
      if (dish[row][column] === livable) {
        livableCount += 1;
      }
    }
  }

  let cultureRatio = (cultureCount / (cultureCount + livableCount)) * 100;

  return { cultureCount: cultureCount, cultureRatio: cultureRatio };
};

module.exports = {
  stringArrayToDish,
  stabilizeSample,
  dishAnalysis,
};
