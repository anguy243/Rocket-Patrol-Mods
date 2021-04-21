class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_cawbird', './assets/cawbird.wav');
        this.load.audio('sfx_netfire', './assets/firenet.wav');
        this.load.audio('sfx_twitter', './assets/twitter.wav');
        this.load.audio('sfx_chaching', './assets/kaching.wav');
        this.load.audio('sfx_cawalex', './assets/alexcaw.wav');
        // Kevin MacLeod - Pixelland (copyright-free)
        this.load.audio('bground_music', './assets/pixelland.mp3');
    }

    create() {

        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '32px',
            backgroundColor: '#a5abf2',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, '"Flippin the Bird" - ROCKET PATROL MODS', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.backgroundColor = '#ECCBF4';
        menuConfig.color = '#000000';
        this.add.text(game.config.width/2, game.config.height/2.25, 'Arrow Keys move your net and (F) launches the net.\nThe net can be controlled when launched.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for NOOBZ or → for #1 PROFESSIONAL GAMER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Lunch money was stolen by bullies at school.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'Earn some big $$$ by targetting & collecting rare birds', menuConfig).setOrigin(0.5);

        // define keys
        KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        KeyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }        

    update() {
        if (Phaser.Input.Keyboard.JustDown(KeyLEFT)) {
          // easy mode
          game.settings = {
            birdSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');  
        }
        if (Phaser.Input.Keyboard.JustDown(KeyRIGHT)) {
          // hard mode
          game.settings = {
            birdSpeed: 4,
            gameTimer: 3000 
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}