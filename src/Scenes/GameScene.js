import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');


    this.gameOptions = {


      // player gravity
      playerGravity: 0,

      // player friction when on wall
      playerGrip: 100,

      // player horizontal speed
      playerSpeed: 0,

      // player jump force
      playerJump: 400,

      // player double jump force
      playerDoubleJump: 300,

      // trampoline tile impulse
      trampolineImpulse: 500,
    };
    this.STOP_TILE = 2;
    this.TRAMPOLINE_TILE = 3;
  }


  create() {
    // creation of "level" tilemap
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#3498db');


    this.map = this.make.tilemap({
      key: 'level',
    });
    // adding tiles to tilemap
    const tile = this.map.addTilesetImage('tileset01', 'tile');

    // which layers should we render? That's right, "layer01"
    this.layer = this.map.createStaticLayer('layer01', tile);

    // which tiles will collide? Tiles from 1 to 3
    this.layer.setCollisionBetween(1, 3);

    // adding the hero sprite and enabling ARCADE physics for the hero
    this.hero = this.physics.add.sprite(260, 376, 'hero');

    // setting hero horizontal speed
    // this.hero.body.velocity.x = 100;
    this.cursors = this.input.keyboard.createCursorKeys();

    // the hero can jump
    // this.canJump = true;

    // the hern cannot double jump
    // this.canDoubleJump = false;

    // the hero is not on the wall
    // this.onWall = false;

    // waiting for player input
    // this.input.on('pointerdown', this.handleJump, this);

    // set workd bounds to allow camera to follow the player
    this.cameras.main.setBounds(0, 0, 1920, 1440);

    // making the camera follow the player
    this.cameras.main.startFollow(this.hero);
  }

  handleJump() {
    // the hero can jump when:
    // canJump is true AND the hero is on the ground (blocked.down)
    // OR
    // the hero is on the wall
    if ((this.canJump && this.hero.body.blocked.none) || this.onWall) {
      // applying jump force
      this.hero.body.velocity.y = -600;
      console.log(this.hero.body.velocity);
      // is the hero on a wall?
      if (this.onWall) {
        // change the horizontal velocity too. This way the hero will jump off the wall
        this.setPlayerXVelocity(true);
      }

      // hero can't jump anymore
      this.canJump = false;

      // hero is not on the wall anymore
      this.onWall = false;
      // the hero can now double jump
      this.canDoubleJump = true;
    } else if (this.canDoubleJump) {
      // the hero can't double jump anymore
      this.canDoubleJump = false;

      // applying double jump force
      this.hero.body.velocity.y = this.gameOptions.playerDoubleJump;
    }
  }

  update() {
    // set some default gravity values. Look at the function for more information
    // this.setDefaultValues();
    if (this.cursors.left.isDown) {
      this.hero.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.hero.setVelocityX(160);
    } else {
      this.hero.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      // this.handleJump();
      this.hero.setVelocityY(-160);
    }


    // handling collision between the hero and the tiles
    this.physics.world.collide(this.hero, this.layer, (hero, layer) => {
      // should the player stop?
      let shouldStop = false;

      // some temporary variables to determine if the player is blocked only once
      const blockedDown = hero.body.blocked.down;
      const blockedLeft = hero.body.blocked.left;
      const blockedRight = hero.body.blocked.right;

      // if the hero hits something, no double jump is allowed
      this.canDoubleJump = false;

      // hero on the ground
      if (blockedDown) {
        // hero can jump
        this.canJump = true;

        // if we are on tile 2 (stop tile)...
        if (layer.index === this.STOP_TILE) {
          // player should stop
          shouldStop = true;
        }

        // if we are on a trampoline and previous player velocity was greater than zero
        if (layer.index === this.TRAMPOLINE_TILE && this.previousYVelocity > 0) {
          // trampoline jump!
          hero.body.velocity.y = 500;

          // hero can double jump
          this.canDoubleJump = true;
        }
      }

      // hero on the ground and touching a wall on the right
      if (blockedRight) {
        // horizontal flipping hero sprite
        hero.flipX = true;
      }

      // hero on the ground and touching a wall on the right
      if (blockedLeft) {
        // default orientation of hero sprite
        hero.flipX = false;
      }

      // hero NOT on the ground and touching a wall
      if ((blockedRight || blockedLeft) && !blockedDown) {
        // hero on a wall
        hero.scene.onWall = true;

        // remove gravity
        hero.body.gravity.y = 0;

        // setting new y velocity
        hero.body.velocity.y = 500;
      }

      // adjusting hero speed according to the direction it's moving
      this.setPlayerXVelocity(!this.onWall || blockedDown, shouldStop);
    }, null, this);

    // saving current vertical velocity
    this.previousYVelocity = this.hero.body.velocity.y;
  }

  // default values to be set at the beginning of each update cycle,
  // which may be changed according to what happens into "collide" callback function
  // (if called)
  setDefaultValues() {
    this.hero.body.gravity.y = 500;
    this.onWall = false;
    this.setPlayerXVelocity(true, null);
  }

  // sets player velocity according to the direction it's facing, unless "defaultDirection"
  // is false, in this case multiplies the velocity by -1
  // if stopIt is true, just stop the player
  setPlayerXVelocity(defaultDirection, stopIt) {
    if (stopIt) {
      this.hero.body.velocity.x = 0;
    } else {
      this.hero.body.velocity.x = this.gameOptions.playerSpeed * (this.hero.flipX ? -1 : 1) * (defaultDirection ? 1 : -1);
    }
  }
}
