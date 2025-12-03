const axios = require("axios");

module.exports = async function genImage(prompt) {
  try {
    const url = `http://65.109.80.126:20409/aryan/imagine?prompt=${encodeURIComponent(prompt)}`;
    const res = await axios.get(url);

    return res.data?.image || null;
  } catch (err) {
    return null;
  }
};
