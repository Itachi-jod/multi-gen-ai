const express = require("express");
const { getClient } = require("./groq/llama"); 

const genImage = require("./commands/genImage");
const genSong = require("./commands/genSong");
const genVideo = require("./commands/genVideo");
const genLyrics = require("./commands/genLyrics");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("AI Multi-API Running 🚀");
});

app.get("/api", async (req, res) => {
  const { type, input } = req.query;

  if (!type || !input) {
    return res.json({ success: false, type: null, result: null });
  }

  try {
    // ───────── IMAGE ─────────
    if (type === "image") {
      const url = await genImage(input);
      return res.json({
        success: true,
        type: "image",
        result: url || null
      });
    }

    // ───────── SONG ─────────
    if (type === "song") {
      const url = await genSong(input);
      return res.json({
        success: true,
        type: "song",
        result: url || null
      });
    }

    // ───────── VIDEO ─────────
    if (type === "video") {
      const url = await genVideo(input);
      return res.json({
        success: true,
        type: "video",
        result: url || null
      });
    }

    // ───────── LYRICS ─────────
    if (type === "lyrics") {
      const lyrics = await genLyrics(input);
      return res.json({
        success: true,
        type: "lyrics",
        result: lyrics || null
      });
    }

    // ───────── CHAT ─────────
    if (type === "chat") {
      const client = getClient();

      const out = await client.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "You are an AI assistant." },
          { role: "user", content: input }
        ]
      });

      return res.json({
        success: true,
        type: "chat",
        result: out.choices?.[0]?.message?.content || null
      });
    }

    // Unknown Type
    return res.json({ success: false, type, result: null });

  } catch (err) {
    return res.json({ success: false, type, result: null });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
