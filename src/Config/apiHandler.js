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
  return res.data;
};

const postScore = async (user, score) => {
  const body = JSON.stringify({ user, score });
  const options = {

    'Content-Type': 'application/json',

  };
  const res = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wCfaFqsAfRaTh8oi5OR1/scores/', body, {
    headers: options,
  });
  return res.data;
};


export default {
  apiHandlerPostFirst, getScore, postScore,
};
