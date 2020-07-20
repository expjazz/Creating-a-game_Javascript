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
import GameOver from './Scenes/GameOver';
import back from './Scenes/background';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);

    this.scene.add('Introduction', IntroductionScene);
    this.scene.add('PhaseOne', new GameScene(back.background[0], 'placeholder', 'DialogueOne', 3.2));
    this.scene.add('PhaseTwo', new GameScene(back.background[1], 'placeholder', 'DialogueTwo'));
    this.scene.add('PhaseThree', new GameScene(back.background[2], 'placeholder', 'DialogueThree'));

    this.scene.add('DialogueOne', new MidDialogue('title', 'content', 'PhaseOne'));
    this.scene.add('DialogueTwo', new MidDialogue('title', 'content', 'PhaseTwo'));
    this.scene.add('DialogueThree', new MidDialogue('title', 'content', 'PhaseThree'));

    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

window.game = new Game();