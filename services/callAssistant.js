const OpenAI = require("openai");
const { logger } = require("../libs/logger");
const { getAssistant } = require("./getAssistant");
const { getThreadId } = require("./getThreadId");
const { run } = require("./run");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const callAssistant = async (event) => {
  logger.info(event);

  const userMessage = event.message.text;
  const userId = event.usedId;

  const assistant = await getAssistant();
  const threadId = await getThreadId(userId);

  try {
    const threadMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });
  } catch (error) {
    logger.error({ reason: "openai.beta.threads.messages.create", error });
  }

  await run(threadId, assistant.id);

  try {
    const allMessages = await openai.beta.threads.messages.list(threadId);
    return { response: allMessages.data[0].content[0].text.value };
  } catch (error) {
    logger.error({ reason: "openai.beta.threads.messages.list", error });
  }
};

module.exports = { callAssistant };
