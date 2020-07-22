
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
import HighScoreScene from './Scenes/HighScoreScene';
import lines from './Scenes/dialogues';
import FreePlay from './Scenes/FreePlay';
import Audio from './models/music';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Audio();
    this.globals = { model, bgMusic: null };
    this.scene.add('Title', TitleScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', new PreloaderScene(back.background));
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('rexUI', saveUserRecord);

    this.scene.add('Introduction', IntroductionScene);
    this.scene.add('FreePlay', FreePlay);
    this.scene.add('One', new GameScene('One', back.background[0], 'rat', 'DialogueOne', 350, 30000, 'one', 'platform', 3.2));
    this.scene.add('PhaseTwo', new GameScene('PhaseTwo', back.background[1], 'spider', 'DialogueTwo', 300, 120000, 'two', 'platformTwo'));
    this.scene.add('PhaseThree', new GameScene('PhaseThree', back.background[2], 'fire', 'DialogueThree', 400, 90000, 'three', 'platformThree'));
    this.scene.add('DialogueIntro', new MidDialogue('DialogueIntro', lines.dialogues[0][0], lines.dialogues[0][1], 0, 'One'));
    this.scene.add('HighScore', HighScoreScene);
    this.scene.add('DialogueOne', new MidDialogue('DialogueOne', lines.dialogues[1][0], lines.dialogues[1][1], 3, 'PhaseTwo'));
    this.scene.add('DialogueTwo', new MidDialogue('DialogueTwo', lines.dialogues[2][0], lines.dialogues[2][1], 4, 'PhaseThree'));
    this.scene.add('DialogueThree', new MidDialogue('DialogueThree', lines.dialogues[3][0], lines.dialogues[3][1], 'Credits'));

    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

window.game = new Game();