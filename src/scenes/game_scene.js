export default class GameScene extends Phaser.Scene
{
    preload(){

    }
    create(){
        // Crea la instancia del huevo y le añade físicas
        const huevo = this.add.circle(400, 250, 10, 0xffffff, 1)

        // Crea la instancia de la huevera
        const huevera = this.add.rectangle(400, 400, 10, 5, 0xffffff, 1)

        this.physics.add.existing(huevo)
        this.physics.add.existing(huevera, true) // Vuelve la huevera estática

        this.huevos = 0

        this.physics.collide()
    }

    addHuevo(){

    }
}