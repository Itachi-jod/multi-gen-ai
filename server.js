const express = require("express");

const aiChat = require("./commands/aiChat");
const genImage = require("./commands/genImage");
const genSong = require("./commands/genSong");
const genVideo = require("./commands/genVideo");
const genLyrics = require("./commands/genLyrics");

const app = express();

// ===== UNIFIED GET ENDPOINT ===== //

app.get("/api/gen", async (req, res) => {
  const { type, input } = req.query;

  if (!type || !input) {
    return res.json({
      success: false,
      error: "Missing ?type= &input="
    });
  }

  try {
    let result;

    switch (type) {
      case "chat":
        result = await aiChat(input);
        return res.json({ success: true, type, result });

      case "image":
        result = await genImage(input);
        return res.json({ success: true, type, result });

      case "song":
        result = await genSong(input);
        return res.json({ success: true, type, result });

      case "video":
        result = await genVideo(input);
        return res.json({ success: true, type, result });

      case "lyrics":
        result = await genLyrics(input);
        return res.json({ success: true, type, result });

      default:
        return res.json({
          success: false,
          error: "Invalid type",
          available: ["chat", "image", "song", "video", "lyrics"]
        });
    }

  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
});

// ===== HOME ===== //

app.get("/", (req, res) => {
  res.json({
    success: true,
    author: "ItachiXD",
    message: "Unified AI API",
    usage: "/api/gen?type={chat,image,song,video,lyrics}&input=",
  });
});

// ===== PORT (local only) ===== //

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

module.exports = app; // For Vercel
           
