import TitleScreen  from "./scenes/title_screen.js"
import GameScene  from "./scenes/game_screen.js"

const config = {
    width: 800,
    heigth: 500,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: -1}
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add('title_screen', TitleScreen)
game.scene.add('game_scene', GameScene)

game.scene.start('title_screen')