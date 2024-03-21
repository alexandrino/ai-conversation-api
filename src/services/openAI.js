const OpenAI = require("openai");
require("dotenv").config();

const { getRole } = require("../utils/roles");

const openai = new OpenAI();

const model = "gpt-3.5-turbo";

const createConversation = async (message) => {
  const completion = await openai.chat.completions.create({
    messages: [message],
    model,
  });

  return completion.choices[0].message.content;
};

const summarizeConversation = async (conversationHistory) => {
  const summary = await openai.chat.completions.create({
    model,
    messages: [
      getRole("system", "Summarize the conversation."),
      ...conversationHistory,
    ],
  });

  return `Summary: ${summary.choices[0].message.content}`;
};

module.exports = { createConversation, summarizeConversation };
