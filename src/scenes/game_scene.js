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
        this.music_bg_loop = this.sound.add("s_mainloop", { loop: true, volume: 0.45 })
        this.music_bg_loop.play()

        // Textos
        this.score = 0
        this.seconds = 60
        this.txt_score = this.add.text(10, 10, 'Puntos: 0', { fontSize: '20px', color: '#fff' })
        this.txt_time = this.add.text(10, 40, 'Tiempo: 60', { fontSize: '20px', color: '#fff' })

        // Fondo
        this.add.image(0, 500, "background").setDepth(-2).setDisplaySize(1600, 1000)
        this.add.image(0, 500, "bg_paja").setDepth(-1).setDisplaySize(250, 1000)
        
        // Hueveras
        this.hueveras = []
        this.hueveras.push(this.spawnHuevera(50, 150, 0xffffff)) // Blanco
        this.hueveras.push(this.spawnHuevera(50, 300, 0x310e08)) // Marrón
        this.hueveras.push(this.spawnHuevera(50, 450, 0xC7A144)) // Dorado

        // Huevos
        this.huevos = this.add.group()
        this.spawnMultipleHuevos(0xffffff, 0x310e08, 0xC7A144)


        // Drag de los huevos -------------------------------------------------------------------------------------
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setDisplaySize(60, 60) // Hace más grande el gameObject
        })

        // Deja el gameObject en su nueva posición
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
        })

        this.input.on('dragend', (pointer, huevo) => {
            let good = false

            for (const huevera of this.hueveras) {
                // Comprueba si el huevo está dentro de una huevera
                if (Phaser.Geom.Intersects.RectangleToRectangle(huevo.getBounds(), huevera.getBounds())) {
                    // Comprueba que la huevera y el huevo sean del mismo color
                    if (huevo.getData('type') === huevera.getData('type')) {
                        this.addScore(10)
                        this.addTime(5)
                        this.sound.play("s_acierto")

                        huevo.destroy()

                        good = true
                    } else {
                        // Si no lo está resta score y tiempo
                        this.addScore(-10)
                        this.addTime(-5)
                        this.sound.play("s_fallo")
                    }
                    break // No hace más comprobaciones si encuentra una huevera
                }
            }

            if (!good) {
                this.addTime(-3)
                this.sound.play("s_fallo")
            }


            if (this.huevos.getChildren().length === 0) {
                this.endtext = "You win!"
                this.endGame()
            }
        })

        // Añade un temporizador para cada segundo
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.playing) return

                this.seconds--
                this.txt_time.setText("Tiempo: " + (this.seconds - '0'))

                // Si se acaban los segundos finaliza el juego
                if (this.seconds <= 0) {
                    this.endGame()
                }
            },
            loop: true
        })

        this.endtext = ""

        this.playing = true
    }
    // Spawns -----------------------------------------------------------
    spawnHuevera(x, y, color){
        const huevera = this.add.image(x, y, 'huevera').setDisplaySize(100, 100)
        huevera.setTint(color)
        huevera.setData('type', color)

        return huevera
    }
    spawnMultipleHuevos(color1, color2, color3){
        const colors = [
            color1, color2, color3
        ]
        for (let i = 0; i < 15; i++){
            console.log("Color: " + colors[i])
            const rand_x = Phaser.Math.Between(200, 750)
            const rand_y = Phaser.Math.Between(200, 500)
            const col = colors[Phaser.Math.Between(0, 2)]
            this.spawnHuevo(rand_x, rand_y, col)
        }
    }
    spawnHuevo(x, y, color){
        const huevo = this.add.image(x, y, 'huevo').setInteractive().setDisplaySize(50, 50)
        huevo.setTint(color)
        huevo.setData('type', color)

        this.input.setDraggable(huevo)

        huevo.on('pointerdown', () => {
            console.log(`Color huevo: ${huevo.getData('color')}`)
        })

        this.huevos.add(huevo)
    }

    addScore(amount){
        this.score += amount
        if (this.score < 0) this.score = 0
        this.txt_score.setText("Puntos: " + (this.score - '0'))
    }
    addTime(amount){
        this.seconds += amount
        if (this.time < 0){
            this.endtext = "Game Over..."
            this.endGame()
        }
        this.txt_time.setText("Tiempo: " + (this.seconds - '0'))
    }
    endGame() {
        this.playing = false
        this.music_bg_loop.stop()

        this.add.rectangle(400, 250, 800, 1000, 0x000000, 0.75).setDepth(10)
        this.add.text(300, 200, this.endtext, { fontSize: "40px", color: "#fff" }).setDepth(11)
        this.add.text(280, 260, `Puntos: ${this.score}`, { fontSize: "32px", color: "#f0e68c" }).setDepth(11)
    }
}