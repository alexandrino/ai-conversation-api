const router = require("express").Router();

const { getProfile } = require("../middleware/getProfile");
const { chat, getConversationSummary } = require("../handlers/conversation");

router.post("/chat", getProfile, chat);
router.get("/chat/summary", getProfile, getConversationSummary);

module.exports = { router };
