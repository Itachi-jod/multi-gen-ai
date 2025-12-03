const express = require("express");
const aiChat = require("./commands/aiChat");
const genImage = require("./commands/genImage");
const genSong = require("./commands/genSong");
const genVideo = require("./commands/genVideo");
const genLyrics = require("./commands/genLyrics");

const app = express();
app.use(express.json());

app.post("/cmd", async (req, res) => {
  const text = req.body.cmd;  

  if (!text) return res.json({ error: "No command" });

  let [cmd, ...queryArr] = text.split(" ");
  const query = queryArr.join(" ");

  // .gpt image naruto
  if (cmd === ".gpt") {
    if (text.startsWith(".gpt image")) {
      const img = await genImage(query);
      return res.json({ type: "image", url: img });
    }

    if (text.startsWith(".gpt play")) {
      const audio = await genSong(query);
      return res.json({ type: "audio", url: audio });
    }

    if (text.startsWith(".gpt video") || text.startsWith(".gpt send")) {
      const video = await genVideo(query);
      return res.json({ type: "video", url: video });
    }

    if (text.startsWith(".gpt lyrics")) {
      const lyrics = await genLyrics(query);
      return res.json({ type: "lyrics", text: lyrics });
    }

    if (text.startsWith(".gpt chat")) {
      const reply = await aiChat(query);
      return res.json({ type: "text", text: reply });
    }
  }

  return res.json({ error: "Unknown command" });
});

// Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
