const axios = require("axios");
const FormData = require("form-data");

module.exports = async function genImage(prompt) {
  try {
    // 1️⃣ Fetch raw image from AI API
    const response = await axios({
      method: "get",
      url: `http://65.109.80.126:20409/aryan/imagine?prompt=${encodeURIComponent(prompt)}`,
      responseType: "arraybuffer"
    });

    const imageBuffer = Buffer.from(response.data);

    // 2️⃣ Prepare FormData for Catbox POST
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("userhash", ""); // optional: can be left empty
    form.append("fileToUpload", imageBuffer, { filename: "image.png" });

    // 3️⃣ Upload to Catbox
    const catboxRes = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    // 4️⃣ Return uploaded URL
    return catboxRes.data || "Failed to upload image";

  } catch (err) {
    console.error("genImage error:", err);
    return "Error generating image";
  }
};
  
