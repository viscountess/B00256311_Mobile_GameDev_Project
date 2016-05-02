/**
 * Created by Victoria Russell B00256311
 */

var BattleQ = BattleQ || {};

BattleQ.Block = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;

  this.anchor.setTo(0.5);

};

BattleQ.Block.prototype = Object.create(Phaser.Sprite.prototype);
BattleQ.Block.prototype.constructor = BattleQ.Block;

