import Phaser from 'phaser';
import config from '../Config/config';

export default class IntroductionScene extends Phaser.Scene {
  constructor() {
    super('Introduction');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.introText = this.add.tileSprite(0, 0, 'Introduction', { fontSize: '30px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'We live in a strange world where some people mistreat they little pets. John, our hero works in a non-profit organization where he needs to save any kind of animals that are hurt. It does not matter where (sometimes a city, a florest, or even a desert), our hero is always there to do whatever it takes. Sometimes the pets are too heart and need medical attention really quick. Can he fill the task and save the little guys?');
    this.keySpace = this.input.keyboard.addKey(Phase.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.text(10, 10, 'Press SPACE\nto skip', { fontSize: '12px', fill: '#fff' });
  }
}