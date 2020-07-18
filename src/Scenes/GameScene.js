import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.controls = 0;
  }

  preload() {
    // load images
    this.load.image('tiles', 'assets/simples_pimples.png');
    this.load.tilemapTiledJSON('map', 'assets/a.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('simples_pimples', 'tiles');
    const background = map.createStaticLayer('background', tileset, 0, 0);
    const steps = map.createStaticLayer('levels', tileset, 0, 0);
    // Set up the arrows to control the camera
    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, 'Arrow keys to scroll', {
        font: '18px monospace',
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: '#000000',
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    this.controls.update(delta);
  }
}
