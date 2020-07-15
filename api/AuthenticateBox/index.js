var toCamelCase = require('to-camel-case')

module.exports = async function (context, req) {
    context.res = {
      body: {
        text: toCamelCase("Hello from the API")
      }
    };
  };