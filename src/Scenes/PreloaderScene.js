/* eslint-disable no-undef */
import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor(backgrounds) {
    super('Preloader');
    this.backgrounds = backgrounds;
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image

    this.add.image(400, 200, 'bgScore');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(1.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('platform', '../assets/platform.png');
    this.load.image('platformTwo', '../assets/platform2.png');
    this.load.image('platformThree', '../assets/platform3.png');


    this.load.image('spider', 'assets/enemies/spider.png');
    this.load.spritesheet('rat', 'assets/enemies/rat.png', {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet('fire', 'assets/fire.png', {
      frameWidth: 40,
      frameHeight: 70,
    });

    this.load.image('bgScore', 'assets/bgScore.jpg');
    this.load.spritesheet('player', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet('coin', 'assets/coin.png', {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.backgrounds.forEach((backArr) => {
      backArr.forEach((layer => this.load.image(layer, `assets/${layer}.png`)));
    });

    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('titleBG', 'assets/titleBG.png');
    this.load.image('restBG', 'assets/sunsetintheswamp.png');


    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/music/introGame.mp3']);
    this.load.audio('onetrack', ['assets/music/012-Sirens-in-Darkness.mp3']);
    this.load.audio('twotrack', ['assets/music/019_seven_and_eight_7-8_combined.mp3']);
    this.load.audio('threetrack', ['assets/music/FantasyOrchestralTheme.mp3']);
    this.load.audio('jump', ['assets/music/jump.mp3']);
    this.load.audio('collectCoin', ['assets/music/133008__cosmicd__annulet-of-absorption.wav']);
    this.load.audio('lost', ['assets/music/qubodup-PowerDrain.ogg']);
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
