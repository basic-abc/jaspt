const OpenAI = require("openai");
const { logger } = require("../libs/logger");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

let assistantInstance = null;

const getAssistant = async () => {
  if (!assistantInstance) {
    try {
      assistantInstance = await openai.beta.assistants.create({
        name: "Chat bot",
        instructions:
          "You are a general purpose chat bot. Answer questions professionally and concisely, citing sources when offering advice. Your response cannot exceed 1 MB.",
        tools: [], // [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview",
      });
    } catch (error) {
      logger.error({ reason: "openai.beta.assistants.create", error });
      throw error;
    }
  }
  return assistantInstance;
};

module.exports = { getAssistant };
