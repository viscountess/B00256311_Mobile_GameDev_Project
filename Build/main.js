/**
 * Created by Victoria Russell B00256311
 */

//Plan is to work on the match 3 side of the game first
//Once this works, then I will move onto the battle part


//Game object for match 3 part of the game
var Match3 = Match3 || {};

//Setting the dimensions of our board
//Currently in portrait mode - however I will change this
Match3.game = new Phaser.Game(360, 640, Phaser.AUTO);

//States
Match3.game.state.add('Boot', Match3.BootState);
Match3.game.state.add('Preload', Match3.PreloadState);
Match3.game.state.add('Game', Match3.GameState);

Match3.game.state.start('Boot');