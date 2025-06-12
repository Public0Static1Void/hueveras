export default class GameScene extends Phaser.Scene
{
    preload(){
        // Sprites
        this.load.image("background", "./src/sprites/grass_bg.png")
        this.load.image("bg_paja", "./src/sprites/straw_bg.png")
        this.load.image("huevo", "./src/sprites/huevo.png")
        this.load.image("huevera", "./src/sprites/huevera.png")
        this.load.image("cinta", "./src/sprites/cinta.png")
        // Sonidos
        this.load.audio("s_mainloop", "./src/audio/s_granja_loop.wav")
        this.load.audio("s_acierto", "./src/audio/s_acierto.wav")
        this.load.audio("s_fallo", "./src/audio/s_fallo.mp3")
    }
    create(){
        // Música
        this.music_bg_loop = this.add.audio("s_mainloop", { loop: true, volume: 0.45 })
        this.music_bg_loop.play()

        // Textos
        this.score = 0
        this.seconds = 60
        this.txt_score = this.add.text(10, 10, 'Puntos: 0', { fontSize: '20px', color: '#fff' })
        this.txt_time = this.add.text(10, 40, 'Tiempo: 60', { fontSize: '20px', color: '#fff' })
        // Fondo
        this.add.image(800, 500, "background").setDepth(-2).setDisplaySize(800, 500)
        this.add.image(0, 250, "bg_paja").setDepth(-1).setDisplaySize(200, 500)
        
        // Hueveras
        this.spawnHuevera(50, 150, 0xffffff) // Blanco
        this.spawnHuevera(50, 300, 0x310e08) // Marrón
        this.spawnHuevera(50, 450, 0xC7A144) // Dorado

        // Huevos
        this.spawnHuevo(450, 150, 0x310e08) // Marrón
        this.spawnHuevo(450, 300, 0xffffff) // Blanco
        this.spawnHuevo(450, 450, 0xC7A144) // Dorado

        this.playing = true
    }

    spawnHuevera(x, y, color){
        const huevera = this.add.image(x, y, 'huevera')
        huevera.setTint(color)
        huevera.setData('type', color)
    }
    spawnMultipleHuevos(color1, color2, color3){
        const colors = {
            color1, color2, color3
        }
        for (let i = 0; i < 15; i++){
            const rand_x = Phaser.Math.Between(200, 750)
            const rand_y = Phaser.Math.Between(200, 300)
            const col = colors[Phaser.Math.Between(0, 2)]
            this.spawnHuevo(rand_x, rand_y, col)
        }
    }
    spawnHuevo(x, y, color){
        const huevo = this.add.image(x, y, 'huevo_base').setInteractive()
        huevo.setTint(color)
        huevo.setData('type', color)

        huevo.on('pointerdown', () => {
            console.log(`Color huevo: ${huevo.getData('color')}`)
        })
    }

    update(){
        if (!this.playing) return

        
    } 
}