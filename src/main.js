// Student:               Alexander Nguyen
// Project Title:         Rocket Patrol Mods - "Flippin the Bird"
// Date:                  April 21st, 2021
// Length of Completion:

// Points Breakdown:
//      60 Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
//      10 Create 4 new explosion SFX and randomize which one plays on impact *bird SFX instead of explosion*
//      10 Create a new title screen (e.g., new artwork, typography, layout)
//       5 Allow the player to control the Rocket after it's fired *control net instead of rocket*
//       5 Add your own (copyright-free) background music to the Play scene



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);
// reserve keyboard vars
let KeyF, KeyR, KeyLEFT, KeyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;