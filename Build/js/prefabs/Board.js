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

  this.RESERVE_ROW = rows;

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
  var i,j,variation;
  for(i = 0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1;
      this.grid[i][j] = variation;
    }
  }
};

// For the reserve grid, iterate through all of the elements
//& in each case, generate a random number
//A number will, in theory, represent a block variation
BattleQ.Board.prototype.populateReserveGrid = function(){
  var i,j,variation;
  for(i = 0; i < this.RESERVE_ROW; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1;
      this.reserveGrid[i][j] = variation;
    }
  }
};

//Print out the grids in a nice way
BattleQ.Board.prototype.consoleLog = function() {
  var i,j;
  var prettyString = '';

  for(i = 0; i < this.RESERVE_ROW; i++) {
    prettyString += '\n';
    for(j = 0; j < this.cols; j++) {
      prettyString += ' ' + this.reserveGrid[i][j];
    }
  }

  prettyString += '\n';

  for(j = 0; j < this.cols; j++) {
    prettyString += ' -';
  }

  for(i = 0; i < this.rows; i++) {
    prettyString += '\n';
    for(j = 0; j < this.cols; j++) {
      prettyString += ' ' + this.grid[i][j];
    }
  }
  console.log(prettyString);
};

//Swapping Blocks
BattleQ.Board.prototype.swap = function(source, target) {
  var temp = this.grid[target.row][target.col];
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
  var isAdjacent = (diffInRow == 1 && diffInCol === 0) || (diffInRow == 0 && diffInCol === 1);
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
  var row = block.row;
  var col = block.col;

  //left
  if(variation == this.grid[row][col - 1] && variation == this.grid[row][col - 2]) {
    isChained = true;

    //console.log("Is left chained: " + isChained);
  }

  //right
  if(variation == this.grid[row][col + 1] && variation == this.grid[row][col + 2]) {
    isChained = true;

    //console.log("Is right chained: " + isChained);
  }

  //up
  if(this.grid[row-2]) {
    if(variation == this.grid[row-1][col] && variation == this.grid[row-2][col]) {
      isChained = true;

      //console.log("Is up chained: " + isChained);
    }
  }

  //down
  if(this.grid[row+2]) {
    if(variation == this.grid[row+1][col] && variation == this.grid[row+2][col]) {
      isChained = true;

      //console.log("Is down chained: " + isChained);
    }
  }

  //center - horizontal
  if(variation == this.grid[row][col - 1] && variation == this.grid[row][col + 1]) {
    isChained = true;

    //console.log("Is center horizontal chained: " + isChained);
  }

  //center - vertical
  if(this.grid[row+1] && this.grid[row-1]) {
    if(variation == this.grid[row+1][col] && variation == this.grid[row-1][col]) {
      isChained = true;

      //console.log("Is center - vertical chained: " + isChained);
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

  for(i = 0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      if(this.isChained({row: i, col: j})) {
        chained.push({row: i, col: j});
      }
    }
  }
  return chained;
};


/*
Clear all the chains
 */
BattleQ.Board.prototype.clearChains = function(){
  //gets all blocks that need to be cleared
  var chainedBlocks = this.findAllChains();

  //set them to zero
  chainedBlocks.forEach(function(block){
    this.grid[block.row][block.col] = 0;

    //kill the block object
    this.state.getBlockFromColRow(block).kill();

  }, this);
};

/*
 Drop a block in the main grid from position to another, the source is set to zero
 */
BattleQ.Board.prototype.dropBlock = function(sourceRow, targetRow, col){
  this.grid[targetRow][col] = this.grid[sourceRow][col];
  this.grid[sourceRow][col] = 0;

  this.state.dropBlock(sourceRow, targetRow, col);
};

/*
 drop a block in the reserve grid from a position to another. the source is set to zero
 */
BattleQ.Board.prototype.dropReserveBlock = function(sourceRow, targetRow, col) {
  this.grid[targetRow][col] = this.reserveGrid[sourceRow][col];
  this.reserveGrid[sourceRow][col] = 0;

  this.state.dropReserveBlock(sourceRow, targetRow, col);
};

/*
 Move down blocks to fill in empty slots
 */
BattleQ.Board.prototype.updateGrid = function(){
  var i, j, k, foundBlock;

  //go through all the rows, from the bottom up
  for(i = this.rows - 1; i >= 0; i--){
    for(j = 0; j < this.cols; j++) {
      //if the block if zero, then get climb up to get a non-zero one
      if(this.grid[i][j] === 0) {
        foundBlock = false;

        //climb up in the main grid
        for(k = i - 1; k >= 0; k--) {
          if(this.grid[k][j] > 0) {
            this.dropBlock(k, i, j);
            foundBlock = true;
            break;
          }
        }

        if(!foundBlock) {
          //climb up in the reserve grid
          for(k = this.RESERVE_ROW - 1; k >= 0; k--) {
            if(this.reserveGrid[k][j] > 0) {
              this.dropReserveBlock(k, i, j);
              break;
            }
          }
        }
      }
    }
  }

  //repopulate the reserve
  this.populateReserveGrid();
};