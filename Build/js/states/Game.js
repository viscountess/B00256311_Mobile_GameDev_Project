/**
 * Created by Victoria Russell B00256311
 */

var BattleQ = BattleQ || {};

BattleQ.GameState = {

  init: function() {
    this.NUM_ROWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 7;
    this.BLOCK_SIZE = 35;
    this.ANIMATION_TIME = 200;
  },
  create: function() {
    //Game background
    this.background = this.add.sprite(0, 0, 'background');

    //Board model
    this.board = new BattleQ.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);
    //Print out grids
    this.board.consoleLog();
  }

};
