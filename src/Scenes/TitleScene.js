import 'phaser';
import config from '../Config/config';
import Button from '../components/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game

    this.gameButton = new Button('Play in History Mode', 2, 'Introduction', this);
    this.gameButton.create();
    // this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    // this.centerButton(this.gameButton, 1);

    // this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    // this.centerButtonText(this.gameText, this.gameButton);

    // this.gameButton.on('pointerdown', (pointer) => {
    //   this.scene.start('One');
    // });
    this.freeGameButton = new Button('Play freely', 1, 'FreePlay', this);
    this.freeGameButton.create();

    // Options
    this.optionsButton = new Button('Options', 0, 'Options', this);
    this.optionsButton.create();
    // this.optionsButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    // this.centerButton(this.optionsButton);

    // this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    // this.centerButtonText(this.optionsText, this.optionsButton);

    // this.optionsButton.on('pointerdown', (pointer) => {
    //   this.scene.start('Options');
    // });

    // Credits
    this.creditsButton = new Button('Credits', -1, 'Credits', this);
    this.creditsButton.create();

    // Hiigh scores
    this.highScoreButton = new Button('Leaderboard', -2, 'HighScore', this);
    this.highScoreButton.create();
  }
}
