import 'phaser';
import prop from '../Config/gameProperties';
import Button from '../components/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    prop.gameProperty.score = 0;
    prop.gameProperty.lastScore = 0;
    this.add.image(400, 300, 'titleBG');

    this.gameButton = new Button('History', 2, 'Introduction', this);
    this.gameButton.create();

    this.freeGameButton = new Button('Free Play', 1, 'FreePlay', this);
    this.freeGameButton.create();

    this.optionsButton = new Button('Options', 0, 'Options', this);
    this.optionsButton.create();

    this.creditsButton = new Button('Credits', -1, 'Credits', this);
    this.creditsButton.create();

    this.highScoreButton = new Button('Leaders', -2, 'HighScore', this);
    this.highScoreButton.create();

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    } else if (this.model.musicOn === true && this.model.bgMusicPlaying === true) {
      this.sys.game.globals.bgMusic.stop();
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
