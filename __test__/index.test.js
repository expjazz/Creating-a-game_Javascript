import GameScene from '../src/Scenes/GameScene';
import back from '../src/Scenes/background';
import MidDialogue from '../src/Scenes/MidDialogue';
import lines from '../src/Scenes/dialogues';


const { dialogues } = lines;
const { background } = back;

it('should be able to create a new scene', () => {
  const newScene = new GameScene('One', back.background[0], 'rat', 'DialogueOne', 350, 30000, 'one', 'platform', 3.2);
  expect(newScene).toBeTruthy();
});

it('should be able to create a new dialogue', () => {
  const newScene = new MidDialogue('DialogueIntro', lines.dialogues[0][0], lines.dialogues[0][1], 0, 'One');
  expect(newScene).toBeTruthy();
});

it('should be able to import the dialogues', () => {
  expect(dialogues).toBeTruthy();
});

it('Dialogues should not be empty', () => {
  expect(dialogues.length > 0).toBeTruthy();
});

it('Dialogues should be an arrays', () => {
  expect(Array.isArray(dialogues)).toBeTruthy();
});

it('Dialogues should be an arrays of arrays', () => {
  expect(Array.isArray(dialogues[0])).toBeTruthy();
});

it('should be able to import the backgrounds', () => {
  expect(background).toBeTruthy();
});

it('The background should not be empty', () => {
  expect(background.length > 0).toBeTruthy();
});

it('Background should be an arrays', () => {
  expect(Array.isArray(background)).toBeTruthy();
});

it('Background shoud be an array that contain strings', () => {
  expect(typeof background[0]).toBeTruthy();
});