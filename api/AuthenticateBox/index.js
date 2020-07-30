const axios = require('axios');
const config = require('./../config.json');

module.exports = async function (context, req) {

  const channels = axios.get(`${config.API_ROOT}/accounts/${config.ACCOUNT_ID}/channels`, {}).then(response => {
    return {
      pagination: JSON.parse(response.headers['x-pagination'] || '{}'),
      data: response.data
    };
  });

  context.res = {
    body: {
      channels
    }
  };
};