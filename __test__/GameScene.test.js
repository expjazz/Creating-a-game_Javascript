import GameScene from '../src/Scenes/GameScene';
import back from '../src/Scenes/background';

const gameInstance = new GameScene('One', back.background[0], 'rat', 'DialogueOne', 350, 30000, 'one', 'platform');


it('should have many atributes', () => {
  expect(gameInstance.selfScene).toBe('One');
  expect(gameInstance.enemy).toBe('rat');
  expect(gameInstance.nextScene).toBe('DialogueOne');
  expect(gameInstance.speedIncrease).toBe(350);
  expect(gameInstance.seconds).toBe(30000);
  expect(gameInstance.bgTrack).toBe('one');
  expect(gameInstance.platformShape).toBe('platform');
  expect(gameInstance.selfScale).toBe(1);
});

it('should initialize and object with the scene attributes', () => {
  expect(typeof gameInstance.gameOptions === 'object').toBe(true);
});

it('game options should have many properties', () => {
  expect(Object.keys(gameInstance.gameOptions)).toHaveLength(13);
});
