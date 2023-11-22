const OpenAI = require("openai");
const { logger } = require("../libs/logger");
const { setTimeout } = require("timers/promises");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const createRun = async (threadId, assistantId) => {
  try {
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions:
        "You are a general purpose chat bot. Answer questions professionally and concisely, citing sources when offering advice. Your response cannot exceed 1 MB.",
      tools: [
        // { type: "code_interpreter" },
        // { type: "retrieval" },
      ],
    });
    return run;
  } catch (error) {
    logger.error({ reason: "openai.beta.threads.runs.create", error });
  }
};

const retrieveRun = async (threadId, run) => {
  try {
    let retrievedRun;
    while (run.status !== "completed") {
      retrievedRun = await openai.beta.threads.runs.retrieve(threadId, run.id);
      logger.info(`Run status: ${retrievedRun.status}`);
      if (retrievedRun.status === "completed") {
        break;
      }
      await setTimeout(1000);
    }
  } catch (error) {
    logger.error({ reason: "openai.beta.threads.runs.retrieve", error });
  }
};

const run = async (threadId, assistantId) => {
  const run = await createRun(threadId, assistantId);
  await retrieveRun(threadId, run);
};

module.exports = { run };
