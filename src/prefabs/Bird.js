// Bird prefab
class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);     // add to existing value
      this.points = pointValue;     // store pointValue
      this.moveSpeed = game.settings.birdSpeed;

      var random = Phaser.Math.Between(0,1);
      console.log(random);
    }

    update() {

        // move bird left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}