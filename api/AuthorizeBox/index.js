module.exports = async function (context, req) {
    const response = getClientCredentials();

    context.res = {
      body: {
        text: "Hello from the API"
      }
    };
  };

const getClientCredentials = () => {
    return false;
}

