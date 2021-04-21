// Net prefab
class Net extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
  
        scene.add.existing(this);     // add object to existing scene
        this.isFiring = false;        // track net's firing status
        this.moveSpeed = 2;           // pixels per frame

        this.sfxNet = scene.sound.add('sfx_netfire'); // add net sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(KeyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (KeyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(KeyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxNet.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    // reset net to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}