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

it('should be able to create a new scene', () => {
  const newScene = new GameScene('One', back.background[0], 'rat', 'DialogueOne', 350, 30000, 'one', 'platform', 3.2);
  expect(newScene).toBeTruthy();
});