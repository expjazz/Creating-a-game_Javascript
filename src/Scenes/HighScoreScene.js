import 'phaser';
import api from '../Config/apiHandler';

export default class HighscoreScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HighScore' });
  }

  preload() {
  }

  async create() {
    this.add.text(100, 200, 'RANK  SCORE   NAME').setTint(0xff00ff);
    this.score = await api.getScore();
    this.count = 0;
    this.position = 310;
    this.score.result.forEach((result) => {
      this.count += 1;
      const st = this.count === 1 ? 'ST' : 'ND';
      this.add.text(100, this.position, `${this.count}${st} ${result.score} ${result.user}`).setTint(0xff0000);
      this.position += 25;
    });
  }

  //  Do this, otherwise this Scene will steal all keyboard input
  update() {
  }

  // const panel = this.scene.get('InputPanel');

  // //  Listen to events from the Input Panel scene
  // panel.events.on('updateName', this.updateName, this);
  // panel.events.on('submitName', this.submitName, this);


  // submitName() {

  //   this.add.bitmapText(100, 360, 'arcade', '2ND   40000    ANT').setTint(0xff8200);
  //   this.add.bitmapText(100, 410, 'arcade', '3RD   30000    .-.').setTint(0xffff00);
  //   this.add.bitmapText(100, 460, 'arcade', '4TH   20000    BOB').setTint(0x00ff00);
  //   this.add.bitmapText(100, 510, 'arcade', '5TH   10000    ZIK').setTint(0x00bfff);
  // }

  // updateName(name) {
  //   this.playerText.setText(name);
  // }
}