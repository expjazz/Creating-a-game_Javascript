import 'phaser';


export default class saveUserRecord extends Phaser.Scene {
  constructor() {
    super({
      key: 'rexUI',
    });
  }

  preload() {

  }

  create() {
    const printText = this.add.rexBBCodeText(400, 300, 'abc', {
      color: 'yellow',
      fontSize: '24px',
      fixedWidth: 200,
      // fixedHeight: 80,
      backgroundColor: '#333333',
      // valign: 'center'
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', function () {
        this.plugins.get('rextexteditplugin').edit(printText);
      }, this);

    this.add.text(0, 580, 'Click text to start editing, press enter key to stop editing');
  }

  update() { }
}
