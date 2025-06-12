export default class GameScene extends Phaser.Scene
{
    preload(){

    }
    create(){
        // Crea la instancia del huevo y le añade físicas
        const huevo = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.huevo_count = this.add.text(0, 20, "Huevos: ")
        // Crea la instancia de la huevera
        const huevera = this.add.rectangle(400, 400, 10, 5, 0xffffff, 1)

        this.physics.add.existing(huevo)
        this.physics.add.existing(huevera, true) // Vuelve la huevera estática

        // Colisiones
        this.physics.add.collider(huevo, hueveram, this.addHuevo)

        this.huevos = 0
    }

    addHuevo(){
        this.huevos += 1
        this.huevo_count.setText("Huevos: " + (this.huevos - '0'))
    }
}