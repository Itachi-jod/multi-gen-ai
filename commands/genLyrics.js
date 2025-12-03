const axios = require("axios");

module.exports = async function genLyrics(title) {
  try {
    const url = `https://lyricstx.vercel.app/youtube/lyrics?title=${encodeURIComponent(title)}`;
    const res = await axios.get(url);

    return res.data?.lyrics || null;
  } catch (err) {
    return null;
  }
};
