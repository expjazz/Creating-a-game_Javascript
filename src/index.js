
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
import saveUserRecord from './Scenes/saveUserRecord';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('Title', TitleScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', new PreloaderScene(back.background));
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('saveUserRecord', saveUserRecord);

    this.scene.add('Introduction', IntroductionScene);
    this.scene.add('One', new GameScene('One', back.background[0], 'rat', 'DialogueOne', 1500, 3.2));
    this.scene.add('PhaseTwo', new GameScene('PhaseTwo', back.background[1], 'spider', 'DialogueTwo', 1500));
    this.scene.add('PhaseThree', new GameScene('PhaseThree', back.background[2], 'fire', 'DialogueThree', 15000));
    this.scene.add('DialogueOne', new MidDialogue('DialogueOne', 'title', 'content', 'PhaseTwo'));
    this.scene.add('DialogueTwo', new MidDialogue('DialogueTwo', 'two', 'contentTwo', 'PhaseThree'));
    this.scene.add('DialogueThree', new MidDialogue('DialogueThree', 'title', 'content', 'Credits'));

    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
    console.log(this);
  }
}

window.game = new Game();