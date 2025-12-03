const axios = require("axios");

module.exports = async function genVideo(query) {
  try {
    const url = `https://dens-videojs.vercel.app/api/video?query=${encodeURIComponent(query)}`;
    const res = await axios.get(url);

    return res.data?.url || null;
  } catch (err) {
    return null;
  }
};
