class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('bird', './assets/bird.png');
        this.load.image('clouds', './assets/clouds.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        // place tile sprite
        this.clouds = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xC7DCF4).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1) (I changed 0 to 1 because the rocket wasn't popping up on my screen at the beginning of the game)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize, 'rocket').setOrigin(0.5, 1);

        // add birds (x3)
        this.bird01 = new Bird(this, game.config.width + borderUISize*6, borderUISize*4, 'bird', 0, 30).setOrigin(0, 0);
        this.bird02 = new Bird(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bird', 0, 20).setOrigin(0,0);
        this.bird03 = new Bird(this, game.config.width, borderUISize*6 + borderPadding*4, 'bird', 0, 10).setOrigin(0,0);
        
        // define keys
        KeyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        KeyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        KeyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#EEEEEE',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(KeyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(KeyLEFT)) {
            this.scene.start("menuScene");
        }

        this.clouds.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.bird01.update();           // update birds (x3)
            this.bird02.update();
            this.bird03.update();
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.bird03)) {
            this.p1Rocket.reset();
            this.birdExplode(this.bird03);   
        }
        if (this.checkCollision(this.p1Rocket, this.bird02)) {
            this.p1Rocket.reset();
            this.birdExplode(this.bird02);
        }
        if (this.checkCollision(this.p1Rocket, this.bird01)) {
            this.p1Rocket.reset();
            this.birdExplode(this.bird01);
        }
    }

    checkCollision(rocket, bird) {
        // simple AABB checking
        if (rocket.x < bird.x + bird.width && 
            rocket.x + rocket.width > bird.x && 
            rocket.y < bird.y + bird.height &&
            rocket.height + rocket.y > bird. y) {
                return true;
        } else {
            return false;
        }
    }

    birdExplode(bird) {
        // temporarily hide bird
        bird.alpha = 0;                         
        // create explosion sprite at bird's position
        let boom = this.add.sprite(bird.x, bird.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          bird.reset();                       // reset bird position
          bird.alpha = 1;                     // make bird visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += bird.points;
        this.scoreLeft.text = this.p1Score;       

        this.sound.play('sfx_cawbird');
    }
}