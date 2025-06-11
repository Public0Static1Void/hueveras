import TitleScreen  from "./scenes/title_screen.js"

const config = {
    width: 800,
    heigth: 500,
    type: Phaser.AUTO
}

const game = new Phaser.Game(config)

game.scene.add('title_screen', TitleScreen)

game.scene.start('title_screen')