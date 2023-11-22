const OpenAI = require("openai");
const { logger } = require("../libs/logger");
const { getUser } = require("./getUser");
const { createUser } = require("./createUser");

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
  const user = await getUser(userId);
  const { threadId } = user || {};
  if (!!threadId) {
    return threadId;
  }

  const thread = await createThread();
  await createUser(userId, thread.id);
  return thread.id;
};

module.exports = { getThreadId };
