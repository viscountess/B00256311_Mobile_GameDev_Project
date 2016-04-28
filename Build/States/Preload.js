/**
 * Created by Victoria Russell B00256311
 */

//Game object 
var BattleQ = BattleQ || {};

//Loading the game assets
BattleQ.PreloadState = {
    preload:function(){

        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(100, 1);
        this.load.setPreloadSprite(this.preloadBar);

        //Load game assets
        this.load.image('background', 'Assets/backgroundBase.png');
    },
    create: function() {
        this.state.start('Game');
    }
};

