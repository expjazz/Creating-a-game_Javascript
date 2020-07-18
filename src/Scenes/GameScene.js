import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.controls = 0;
    this.player = '';
    this.cursors = '';
  }

  preload() {
    // load images
    this.load.image('tiles', 'assets/simples_pimples.png');
    this.load.tilemapTiledJSON('map', 'assets/a.json');
    this.load.atlas('atlas', 'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png', 'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('simples_pimples', 'tiles');
    const background = map.createStaticLayer('background', tileset, 0, 0);
    const steps = map.createStaticLayer('levels', tileset, 0, 0);
    const trees = map.createStaticLayer('trees', tileset, 0, 0);
    steps.setCollisionByProperty({ collides: true });
    this.player = this.physics.add.sprite(400, 350, 'atlas', 'dude');

    this.physics.add.collider(this.player, steps);
    this.player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: 'turn',
    //   frames: [{ key: 'dude', frame: 4 }],
    //   frameRate: 20,
    // });


    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, steps);

    // Set up the arrows to control the camera
    // Phaser supports multiple cameras, but you can access the default camera like this:
    // const camera = this.cameras.main;
    // const cursors = this.input.keyboard.createCursorKeys();
    // this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
    //   camera,
    //   left: cursors.left,
    //   right: cursors.right,
    //   up: cursors.up,
    //   down: cursors.down,
    //   speed: 0.5,
    // });


    // // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // // Help text that has a "fixed" position on the screen
    // this.add
    //   .text(16, 16, 'Arrow keys to scroll', {
    //     font: '18px monospace',
    //     fill: '#ffffff',
    //     padding: { x: 20, y: 10 },
    //     backgroundColor: '#000000',
    //   })
    //   .setScrollFactor(0);
  }

  update() {
    // Apply the controls to the camera each update tick of the game
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
