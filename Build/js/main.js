/**
 * Created by Victoria Russell B00256311
 */

//Plan is to work on the match 3 side of the game first
//Once this works, then I will move onto the battle part


var BattleQ = BattleQ || {};

var screenWidth = 640;
var screenHeight = 640;
//Setting the dimensions of our board
//Currently in portrait mode - however I will change this
BattleQ.game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO);

//States
BattleQ.game.state.add('Boot', BattleQ.BootState);
BattleQ.game.state.add('Preload', BattleQ.PreloadState);
BattleQ.game.state.add('Game', BattleQ.GameState);

BattleQ.game.state.start('Boot');
