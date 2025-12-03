const express = require("express");
const { getClient } = require("./openai");   // using openai.js now

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

  if (!type || !input) return res.send(null);

  try {
    // ───── IMAGE GENERATION ─────────────────────────────
    if (type === "image") {
      const url = await genImage(input);
      return res.send(url);
    }

    // ───── SONG DOWNLOAD ───────────────────────────────
    if (type === "song") {
      const url = await genSong(input);
      return res.send(url);
    }

    // ───── VIDEO DOWNLOAD ──────────────────────────────
    if (type === "video") {
      const url = await genVideo(input);
      return res.send(url);
    }

    // ───── LYRICS ──────────────────────────────────────
    if (type === "lyrics") {
      const lyrics = await genLyrics(input);
      return res.send(lyrics);
    }

    // ───── CHAT (OpenAI GPT OSS 20B) ───────────────────
    if (type === "chat") {
      const client = getClient();

      const out = await client.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "You are an AI assistant." },
          { role: "user", content: input }
        ]
      });

      return res.send(out.choices?.[0]?.message?.content || null);
    }

    // Unknown type
    return res.send(null);

  } catch (err) {
    return res.send(null);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
