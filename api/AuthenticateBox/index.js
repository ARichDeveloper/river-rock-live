const axios = require('axios');
const config = require('./../config.json');

module.exports = async function (context, req) {
  const preroll = await axios.get(`${config.API_ROOT}/channels/${config.CHANNEL_ID}/broadcasts?s=-starts_at`, {}).then(response => {
    const channels = {
      pagination: JSON.parse(response.headers['x-pagination'] || '{}'),
      data: response.data
    };

    context.res = {
      body: {
        channels
      }
    };
  });
};