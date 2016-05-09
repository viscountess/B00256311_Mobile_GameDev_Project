/**
 * Created by Victoria Russell B00256311
 *
 * Used for reference:
 * http://www.emanueleferonato.com/2015/10/06/give-your-html5-game-menu-a-nice-bounce-effect-with-phaser/
 */


var BattleQ = BattleQ || {};

BattleQ.MenuState = {
    init: function(){
        this.game.stage.backgroundColor = '	#000000';

        //Scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function(){
        this.load.image("gametitle", "assets/images/Menu/gametitle.png");
        this.load.image("game_edition", "assets/images/Menu/game_edition.png");
        this.load.image("playbutton", "assets/images/Menu/playbutton.png");
        this.load.image("menubutton", "assets/images/Menu/menubutton.png");
        this.load.image("resetgame", "assets/images/Menu/resetgame.png");
        this.load.image("thankyou", "assets/images/Menu/thankyou.png");
    },
    create: function(){
        var menuTween;

        var title = this.game.add.sprite(this.game.width / 2, 60, "gametitle");
        title.anchor.set(0.5);
        var grid = this.game.add.sprite(this.game.width / 2, 130, "game_edition");
        grid.anchor.set(0.5);
        var playButton = this.game.add.button(this.game.width / 2, this.game.height / 2 + 100, "playbutton",
            startGame);
        playButton.anchor.set(0.5);
        menuGroup = this.game.add.group();
        var menuButton = this.game.add.button(this.game.width / 2, this.game.height - 30,
            "menubutton", toggleMenu);
        menuButton.anchor.set(0.5);
        menuGroup.add(menuButton);
        var resetGame = this.game.add.button(this.game.width / 2, this.game.height + 50,
            "resetgame", function(){});
        resetGame.anchor.set(0.5);
        menuGroup.add(resetGame);
        var thankYou = this.game.add.button(this.game.width / 2, this.game.height + 130,
            "thankyou", function(){});
        thankYou.anchor.set(0.5);
        menuGroup.add(thankYou);

        function toggleMenu() {
            if (menuGroup.y == 0) {
                menuTween = this.game.add.tween(menuGroup).to({
                    y: -180
                }, 500, Phaser.Easing.Bounce.Out, true);
            }
            if (menuGroup.y == -180) {
                menuTween = this.game.add.tween(menuGroup).to({
                    y: 0
                }, 500, Phaser.Easing.Bounce.Out, true);
            }
        }

        function startGame(){
            this.game.state.start('Preload');
        }
        //this.state.start('Game');
    }
    
};
