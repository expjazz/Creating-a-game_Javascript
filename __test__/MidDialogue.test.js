import MidDialogue from '../src/Scenes/MidDialogue';
import lines from '../src/Scenes/dialogues';

const newScene = new MidDialogue('DialogueIntro', lines.dialogues[0][0], lines.dialogues[0][1], 0, 'One');


it('should have many atributes', () => {
  expect(newScene.title).toBe(lines.dialogues[0][0]);
  expect(newScene.selfScene).toBe('DialogueIntro');
  expect(newScene.content).toBe(lines.dialogues[0][1]);
  expect(newScene.jumpBonus).toBe(0);
  expect(newScene.nextScene).toBe('One');
});
