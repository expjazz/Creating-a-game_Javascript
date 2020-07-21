import 'phaser';


export default class saveUserRecord extends Phaser.Scene {
  constructor() {
    super({
      key: 'rexUI',
    });
    this.count = 1;
  }

  preload() {
    let url;
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
    this.load.plugin('rexbbcodetextplugin', url, true);

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
    this.load.plugin('rextexteditplugin', url, true);
  }

  create() {
    const keyObj = this.input.keyboard.addKey('Enter');
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
      .on('pointerdown', () => {
        this.count = 0;
        this.plugins.get('rextexteditplugin').edit(printText);
        keyObj.on('down', () => { if (this.count === 0) console.log('is down'); this.count = 1; });
      }, this);

    this.add.text(0, 580, 'Click text to start editing, press enter key to stop editing');
  }

  update() { }
}
