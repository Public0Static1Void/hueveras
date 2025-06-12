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
        this.add.image(800, 500, "background").setDepth(-2).setDisplaySize(800, 500)
        this.add.image(0, 250, "bg_paja").setDepth(-1).setDisplaySize(200, 500)

        this.spawnHuevera(50, 150, 0xffffff)
        this.spawnHuevera(50, 300, 0x310e08)
        this.spawnHuevera(50, 450, 0xC7A144)
    }

    spawnHuevera(x, y, color, type){
        const huevera = this.add.image(x, y, 'huevera')
        huevera.setTint(color)
        huevera.setData('type', type)
    }
    spawnHuevo(x, y, color, type){
        const huevo = this.add.image(x, y, 'huevo_base').setInteractive()
        huevo.setTint(color)
        huevo.setData('type', type)

        huevo.on('pointerdown', () => {
            console.log(`Color huevo: ${huevo.getData('color')}`)
        })
    }

    update(){
        if (!this.playing) return

        
    } 
}