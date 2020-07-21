const axios = require('axios');

const apiHandlerPostFirst = async () => {
  const res = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    name: 'Saving Pets',
  });
  console.log(res);
  return res;
};

const getScore = async () => {
  const res = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wCfaFqsAfRaTh8oi5OR1/scores/');
  console.log(res);
};

const postScore = async (user, score) => {
  const body = JSON.stringify({ user, score });
  const options = {

    'Content-Type': 'application/json',

  };
  const res = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wCfaFqsAfRaTh8oi5OR1/scores/', body, {
    headers: options,
  });
  console.log(res);
};

// const apiExport = async (name, score) => {
//   const key = await apiHandlerPostFirst();
//   const firstPost = await postScore(name, score, key.data.result.split(':')[1].split(' ')[0]);
//   const firstScore = await getScore(key.data.result.split(' ')[1]);
//   console.log('belo is the first get');
//   console.log(firstScore);
//   console.log('below is the post request');
//   console.log(firstPost);


export default {
  apiHandlerPostFirst, getScore, postScore,
};


// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
