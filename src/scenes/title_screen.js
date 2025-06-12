export default class TitleScreen extends Phaser.Scene
{
    preload(){

    }
    create(){
        const text = this.add.text(450, 200, "si")
        text.setOrigin(0.5, 0.25)
    }
}