import 'phaser';
import config from '../Config/config';
import prop from '../Config/gameProperties';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.previousScene = data.previousScene;
  }

  create() {
    // Game
    this.add.image(400, 300, 'restBG');

    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Want to restart the same level?', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on('pointerdown', (pointer) => {
      prop.gameProperty.score = prop.gameProperty.lastScore;
      this.scene.start(this.previousScene.key);
    });

    // Options
    this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Save your score', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', (pointer) => {
      this.scene.start('rexUI');
      // do stuff with api
    });

    // Credits
    this.creditsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Restart from Scratch', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', (pointer) => {
      this.scene.start('Introduction');
      prop.gameProperty.score = 0;
    });

    // Credits
    this.menuButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.menuButton, -2);

    this.menuText = this.add.text(0, 0, 'Main Menu', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', (pointer) => {
      this.scene.start('Title');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}
