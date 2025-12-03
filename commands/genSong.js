const axios = require("axios");

module.exports = async function genSong(query) {
  try {
    const url = `https://minato-ytdl.vercel.app/music?q=${encodeURIComponent(query)}`;
    const res = await axios.get(url);

    return res.data?.download_url || null; 
  } catch (err) {
    return null;
  }
};
