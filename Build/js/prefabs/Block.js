/**
 * Created by Victoria Russell B00256311
 */

var BattleQ = BattleQ || {};

BattleQ.Block = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;

  this.row = data.row;
  this.col = data.col;

  this.anchor.setTo(0.5);

};

BattleQ.Block.prototype = Object.create(Phaser.Sprite.prototype);
BattleQ.Block.prototype.constructor = BattleQ.Block;

BattleQ.Block.prototype.reset = function(x, y, data) {
  Phaser.Sprite.prototype.reset.call(this, x, y);
  this.loadTexture(data.asset);
  this.row = data.row;
  this.col = data.col;

  //console.log( "Reset this block. Posisition is now col: %i, row: %i", this.col, this.row);
};

BattleQ.Block.prototype.kill = function() {
  this.loadTexture('deadBlock');
  this.col = null;
  this.row = null;

  this.game.time.events.add(this.state.ANIMATION_TIME/2, function(){
    Phaser.Sprite.prototype.kill.call(this);
  }, this);
};