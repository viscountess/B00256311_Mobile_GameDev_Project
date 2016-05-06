/**
 * Created by Victoria Russell B00256311
 */

var BattleQ = BattleQ || {};

BattleQ.GameState = {
  init: function() {
    this.NUM_ROWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 6;
    this.BLOCK_SIZE = 35;
    this.ANIMATION_TIME = 200;
  },
  create: function() {
    //game background
    this.background = this.add.sprite(0, 0, 'background');
    this.blocks = this.add.group();

    //board model
    this.board = new BattleQ.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);
    this.board.consoleLog();

    this.drawBoard();
  },
  createBlock: function(x, y, data) {
    var block = this.blocks.getFirstExists(false);

    if(!block) {
      block = new BattleQ.Block(this, x, y, data);
      this.blocks.add(block);
    }
    else {
      block.reset(x, y, data);
    }

    return block;
  },
  drawBoard: function() {
    var i, j, block, square, x, y, data;

    //semi-transparent coloured squares
    var squareBitmap = this.add.bitmapData(this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);
    squareBitmap.ctx.fillStyle = '#ff99ff';
    squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

    for(i = 0; i < this.NUM_ROWS; i++) {
      for(j = 0; j < this.NUM_COLS; j++) {
        //Position of the board
        x = 165 + j * (this.BLOCK_SIZE + 6);
        y = 150 + i * (this.BLOCK_SIZE + 6);

        square = this.add.sprite(x, y, squareBitmap);
        square.anchor.setTo(0.5);
        square.alpha = 0.2;

        this.createBlock(x, y, {asset: 'block' + this.board.grid[i][j], row: i, col: j});
      }
    }

    this.game.world.bringToTop(this.blocks);
  }

};
