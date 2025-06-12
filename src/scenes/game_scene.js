export default class GameScene extends Phaser.Scene
{
    preload(){

    }
    create(){
        
        const huevo = this.add.circle(400, 250, 10, 0xffffff, 1)
        const huevera = this.add.rectangle(400, 400, 10, 5, 0xffffff, 1)
        this.physics.add.existing(huevo)
    }
}