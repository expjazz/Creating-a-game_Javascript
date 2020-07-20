import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import IntroductionScene from './Scenes/IntroductionScene';
import MidDialogue from './Scenes/MidDialogue';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);

    this.scene.add('Introduction', IntroductionScene);
    this.scene.add('Game', GameScene);
    this.scene.add('MidDialogue', new MidDialogue('title', 'content'));
    this.scene.start('Boot');
  }
}

window.game = new Game();