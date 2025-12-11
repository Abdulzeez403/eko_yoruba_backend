const axios = require("axios");

exports.chatTutor = async (req, res) => {
  const { message } = req.body;

  const response = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a Yoruba language tutor." },
      { role: "user", content: message }
    ]
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    }
  });

  res.json({ reply: response.data.choices[0].message.content });
};