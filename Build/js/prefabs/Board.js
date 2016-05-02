/**
 * Created by Victoria Russell B00256311
 */

var BattleQ = BattleQ || {};

BattleQ.Board = function(state, rows, cols, blockVariations) {

  this.state = state;
  this.rows = rows;
  this.cols = cols;
  this.blockVariations = blockVariations;

  //Main grid
  this.grid = [];

  var i,j;
  for(i = 0; i < rows; i++) {
    this.grid.push([]); //Add a new array for the corresponding column

    for(j = 0; j < cols; j++) {
      this.grid[i].push(0); //Access the corresponding row and add in a zero
    }
  }

  //Reserve grid on the top, for when new blocks are needed
  this.reserveGrid = [];

  this.RESERVE_ROW = 5;

  for(i = 0; i < this.RESERVE_ROW; i++) {
    this.reserveGrid.push([]);

    for(j = 0; j < cols; j++) {
      this.reserveGrid[i].push(0);
    }
  }

  //Populate Grids
  this.populateGrid();
  this.populateReserveGrid();

};

//Iterate through all of the elements
//& in each case, generate a random number
//A number will, in theory, represent a block variation
BattleQ.Board.prototype.populateGrid = function(){
  var i, j, variation;
  for(i = 0; i < this.rows; i++)
  {
    for(j = 0; j < this.cols; j++)
    {
      variation = Math.floor(Math.random() * this.blockVariations) +1;
      this.grid[i][j] = variation;
    }
  }
};

// For the reserve grid, iterate through all of the elements
//& in each case, generate a random number
//A number will, in theory, represent a block variation
BattleQ.Board.prototype.populateReserveGrid = function(){
  var i, j, variation;
  for(i = 0; i < this.RESERVE_ROW; i++)
  {
    for(j = 0; j < this.cols; j++)
    {
      variation = Math.floor(Math.random() * this.blockVariations) +1;
      this.reserveGrid[i][j] = variation;
    }
  }
};

//Print out the grids in a nice way
BattleQ.Board.prototype.consoleLog = function() {

  var i, j, variation;
  var prettyString = '';

  for(i = 0; i < this.RESERVE_ROW; i++)
  {
    prettyString += '\n'; //new line
    for(j = 0; j < this.cols; j++)
    {
      prettyString += ' ' + this.reserveGrid[i][j];
    }
  }

  prettyString += '\n'; //new line here also

  for(j = 0; j < this.cols; j++) {
    prettyString += ' -';
  }

  for(i = 0; i < this.rows; i++)
  {
    prettyString += '\n'; //new line
    for(j = 0; j < this.cols; j++)
    {
      prettyString += ' ' + this.grid[i][j];
    }
  }

  console.log(prettyString);
};

//Swapping Blocks
BattleQ.Board.prototype.swap = function(source, target) {
  var temp = this.grid[target.row][target.col]; //keep track of the target number that player is moving
  this.grid[target.row][target.col] = this.grid[source.row][source.col];
  this.grid[source.row][source.col] = temp;
};

/*
Check if two blocks are adjacent.

This is so that the player can only swap adjacent blocks only
 */
BattleQ.Board.prototype.checkAdjacent = function(source, target) {
  var diffInRow = Math.abs(source.row - target.row);
  var diffInCol = Math.abs(source.col - target.col);

  //Check if target cell is adjacent to the cell either above or below
  //Or on its left or right
  var isAdjacent = (diffInRow == 1 && diffInCol === 0)
    || (diffInRow === 0 && diffInCol == 1)
  //If it is, then return true, meaning that it can be swapped
  //Or false, meaning that it cant be swapped
      return isAdjacent;
};

/*
  Check whether a single block is chained or not
 */
BattleQ.Board.prototype.isChained = function(block)
{
  var isChained = false;
  var variation = this.grid[block.row][block.col];
  var tRow = block.row; //tRow = temp row
  var tCol = block.col; //tCol = temp col

  //Left
  if(variation == this.grid[tRow][tCol - 1] && variation == this.grid[tRow][tCol - 2])
  {
    isChained = true;
  }

  //Right
  if(variation == this.grid[tRow][tCol + 1] && variation == this.grid[tRow][tCol + 2])
  {
    isChained = true;
  }

  //Up
  if(this.grid[tRow-2]) //extra check to ensure there is 2 or more block above target
  {
    if(variation == this.grid[tRow - 1][tCol] && variation == this.grid[tRow - 2][tCol])
    {
      isChained = true;
    }
  }

  //Down
  if(this.grid[tRow+2]) //extra check to ensure there is 2 or more block below target
  {
    if(variation == this.grid[tRow + 1][tCol] && variation == this.grid[tRow + 2][tCol])
    {
      isChained = true;
    }
  }

  //Center - horizontal
  if(variation == this.grid[tRow][tCol - 1] && variation == this.grid[tRow][tCol + 1])
  {
    isChained = true;
  }

  //Center - vertical
  if(this.grid[tRow+1] && this.grid[tRow-1]) //extra check to prevent error
  {
    if(variation == this.grid[tRow + 1][tCol] && variation == this.grid[tRow - 1][tCol])
    {
      isChained = true;
    }
  }

  return isChained;
};

/*
Find all the chains in the main grid
 */
BattleQ.Board.prototype.findAllChains = function()
{
  var chained = [];
  var i, j;

  for(i = 0; i < this.rows; i++)
  {
    for(j = 0; j < this.cols; j++)
    {
      if(this.isChained({row: i, col:j}))
      {
        chained.push({row: i, col:j});
      }
    }
  }

  console.log(chained);
  return chained;
};