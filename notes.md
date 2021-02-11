# Game of Life, version: Cell Cultures

Given as a coding challenge for a job application process.

## Inputs

- Two dimensional array of cells, determined either livable (L) or unlivable (.)
- Format is in text file, needs to be imported and read and turned into multi-d array.

## Outputs

- Return how many iterations does it take until cultures stabilize (no changes?)
- Return how many live cultures after stabilization occurs
- Return ratio of cultures to empty livable spaces as a percentage

## Rules

- Culture will take if (L) is empty and no adjacent cells
- Culture will die if 4 or more adjacent cells are populated
- No unlivable cell will change to livable

## Brainstorming

Thinking I'll use a while loop to check a boolean value (which will be changed only once no changes take place in cells, thus closing while loop)

For performance optimization, nested for loops will perform best given research and data set size.

I need a counter to count the number of iterations that happen

I need to make a copy of the initial dish state, so I am changing the next state, not current state.

Once nested for loops are created, for each cell I need to check:
(only care about livable cells)

- is the livable cell currently occupied?

  - if no, look at all adjacent cells and tally how many are occupied.
    - if zero, populate (A CHANGE HAPPENED, flip boolean)
    - else it stays empty and move on to next cell
  - if yes, look at all adjacent cells and tally how many are occupied.
    - if under 4, cell stays alive
    - else, cell dies and move on to next cell (A CHANGE HAPPENED, flip boolean to true)

After all cells checked, increment counter. Has a change occurred? (what's the value of bool?)

- if yes, rinse and repeat.
- reassign state
- if no, return counter and proceed to final analysis

Run another nested for loop to determine:

- count of cultures
- count of empty livable spaces
- then:
  - calculate ratio of livable spaces to cultures
  - return % ratio and count of cultures
