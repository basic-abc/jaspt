const OpenAI = require("openai");
const { logger } = require("../libs/logger");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const createThread = async () => {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    logger.error({ reason: "openai.beta.threads.create", error });
  }
};

const getThreadId = async (userId) => {
  const thread = await createThread();
  return thread.id;
};

module.exports = { getThreadId };
