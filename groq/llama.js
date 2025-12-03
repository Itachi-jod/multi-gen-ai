const Groq = require("groq-sdk");
const { apiKeys } = require("./keys");

let keyIndex = 0;

function getClient() {
  const client = new Groq({
    apiKey: apiKeys[keyIndex]
  });

  keyIndex = (keyIndex + 1) % apiKeys.length;
  return client;
}

module.exports = { getClient };
