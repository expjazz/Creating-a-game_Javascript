import 'phaser';
import prop from '../Config/gameProperties';
import Button from '../components/Button';


export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.previousScene = data.previousScene;
  }

  create() {
    this.add.image(400, 300, 'restBG');

    this.gameButton = new Button('Try Again', 2, this.previousScene.key, this, false, true);
    this.gameButton.create();


    this.optionsButton = new Button('Save score', 1, 'rexUI', this);
    this.optionsButton.create();


    this.menuButton = new Button('Main Menu', 0, 'Title', this);
    this.menuButton.create();
  }
}
