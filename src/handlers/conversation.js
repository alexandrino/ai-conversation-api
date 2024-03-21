const {
  createConversation,
  summarizeConversation,
} = require("../services/openAI");

const { getRole } = require("../utils/roles");

// mock this information as if it were a database or a cache
// For a question of time, I will use a simple array to store the conversation
// I could use a mongoDB database to store this information or a Redis cache
// const currentMessages = [];
// I'm well aware that this is going to create a problem with race conditions, But I don't have enough time to solve this problem using a database or a cache
const profileMessages = {};

/**
 * Retrieves the messages associated with a given profile ID.
 * @param {string} profileId - The ID of the profile.
 * @returns {Array} - An array of messages associated with the profile ID.
 */
const getProfileMessages = (profileId) => {
  if (profileMessages[profileId]) {
    return profileMessages[profileId];
  }
  return [];
};

/**
 * Sets the messages for a given profile.
 *
 * @param {string} profileId - The ID of the profile.
 * @param {Array} messages - The messages to set for the profile.
 * @returns {void}
 */
const setProfileMessages = (profileId, messages) => {
  const profile = profileMessages[profileId];
  if (profile) {
    profileMessages[profileId] = [...profile, ...messages];
    return;
  }

  profileMessages[profileId] = messages;
};

/**
 * Handles the chat functionality.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<[role, content]>} - A promise that resolves with the role and content of the message.
 */
const chat = async (req, res) => {
  const { message } = req.body;
  const { profileId } = req.profile;

  console.log("conversation.api.chat");

  const messageContext = getRole("user", message);

  setProfileMessages(profileId, [messageContext]);
  const completion = await createConversation(messageContext);
  setProfileMessages(profileId, [getRole("assistant", completion)]);

  const currentMessages = getProfileMessages(profileId);
  console.log(profileMessages);

  res.json(currentMessages);
};

/**
 * Retrieves the conversation summary for a given profile.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<ConversationSummary>} - A promise that resolves when the summary is sent as a JSON response.
 */
const getConversationSummary = async (req, res) => {
  const { profileId } = req.profile;
  const profileMessages = getProfileMessages(profileId);
  const summary = await summarizeConversation(profileMessages);
  res.json({ summary });
};

module.exports = { chat, getConversationSummary };
