const { getClient } = require("../groq/llama");

module.exports = async function aiChat(prompt) {
  try {
    const client = getClient();

    const result = await client.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: "You are an AI assistant." },
        { role: "user", content: prompt }
      ]
    });

    return result.choices[0].message.content;
  } catch (err) {
    return "AI Error: " + err.message;
  }
};
