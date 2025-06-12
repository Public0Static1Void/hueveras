export default class GameScene extends Phaser.Scene
{
    preload(){
        this.load.image("background", "./src/sprites/grass_bg.png")
        this.load.image("bg_paja", "./src/sprites/straw_bg.png")
        this.load.image("huevo", "./src/sprites/huevo.png")
        this.load.image("huevera", "./src/sprites/huevera.png")
        this.load.image("cinta", "./src/sprites/cinta.png")
    }
    create(){
        this.playing = true

        // Fondo
        this.add.image(400, 250, "background").setDepth(-2).setDisplaySize(800, 500)
        this.add.image(0, 250, "bg_paja").setDepth(-1).setDisplaySize(200, 250)
        
        // Crea la instancia del huevo y le añade físicas
        this.huevo_count = this.add.text(0, 20, "Huevos: ")

        // Crea la instancia de la huevera
        this.huevera = this.add.rectangle(400, 400, 10, 5, 0xffffff, 1)

        this.physics.add.existing(this.huevera, true) // Vuelve la huevera estática

        this.huevosGroup = this.physics.add.group()

        this.spawnHuevo()

        this.huevos = 0

        // Hace el mapeado de inputs
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update(){
        if (!this.playing) return

        const huevoChildren = this.huevosGroup.getChildren()
        for (let i = 0; i < huevoChildren.length; i++){
            if (huevoChildren[i].y > this.sys.game.config.height + 50){
                huevoChildren[i].destroy()
            }
        }
    }

    spawnHuevo(){
        const rand_x = Phaser.Math.Between(0, 800)
        
        const huevo = this.add.circle(rand_x, 0, 10, 0xffffff, 1)
        this.physics.add.existing(huevo)
        huevo.body.setVelocityY(150)

        this.huevosGroup.add(huevo)

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