const axios = require('axios');
const oauth = require('axios-oauth-client');

module.exports = async function (context, req) {
    const response = await getClientCredentials();

    context.res = {
      body: {
        text: "Hello from the API"
      }
    };
  };

const getClientCredentials = oauth.client(axios.create(), {
    url: 'https://auth.boxcast.com/oauth2/token',
    grant_type: 'client_credentials',
    client_id: 'ZZZZ',
    client_secret: 'ZZZ',
    scope: 'owner'
});

