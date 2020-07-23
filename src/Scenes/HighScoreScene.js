import 'phaser';
import api from '../Config/apiHandler';

export default class HighscoreScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HighScore' });
  }

  preload() {
  }

  async create() {
    this.add.image(400, 300, 'bgScore');

    this.add.text(300, 100, 'RANK  SCORE   NAME').setTint(0xff00ff);
    this.score = await api.getScore();

    this.count = 0;
    this.position = 130;
    this.sortedScore = this.score.result.sort((a, b) => (a.score > b.score ? -1 : 1));
    this.sortedScore.forEach((result) => {
      this.count += 1;
      const st = this.count === 1 ? 'ST' : 'ND';
      this.add.text(300, this.position, `${this.count}${st} ${result.score} ${result.user}`).setTint(0xff0000);
      this.position += 25;
    });
  }
}