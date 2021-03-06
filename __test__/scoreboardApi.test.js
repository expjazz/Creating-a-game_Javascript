import api from '../src/Config/apiHandler';


it('should be able to save the score in the microverse backend', () => {
  api.postScore('test', 10).then((score) => expect(score).toBe('Leaderboard score created correctly.'));
});

it('should be able to retrieve the store as an object', () => {
  api.getScore().then((scores) => expect(typeof scores).toBe('object'));
});
