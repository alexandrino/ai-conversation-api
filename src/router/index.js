const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger-output.json");

const { getProfile } = require("../middleware/getProfile");
const { chat, getConversationSummary } = require("../handlers/conversation");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.post("/chat", getProfile, chat);
router.get("/chat/summary", getProfile, getConversationSummary);

module.exports = { router };
