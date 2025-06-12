export default class GameScene extends Phaser.Scene
{
    preload(){

    }
    create(){
        // Crea la instancia del huevo y le añade físicas
        this.huevo_count = this.add.text(0, 20, "Huevos: ")

        // Crea la instancia de la huevera
        this.huevera = this.add.rectangle(400, 400, 10, 5, 0xffffff, 1)

        this.physics.add.existing(this.huevera, true) // Vuelve la huevera estática

        this.spawnHuevo()

        this.huevos = 0

        // Hace el mapeado de inputs
        this.keys = this.input.keyboard.createCursorKeys()
    }

    spawnHuevo(){
        const rand_x = Phaser.Math.Between(0, 800)
        
        const huevo = this.add.circle(rand_x, 0, 10, 0xffffff, 1)
        this.physics.add.existing(huevo)
        huevo.body.setVelocityY(300)

        // Colisiones
        this.physics.add.collider(huevo, this.huevera, () => {
            this.addHuevo(huevo)
        })
    }

    addHuevo(huevo){
        this.huevos += 1
        this.huevo_count.setText("Huevos: " + (this.huevos - '0'))

        huevo.destroy()
    }
}