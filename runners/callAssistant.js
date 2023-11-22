require("dotenv").config();
const { callAssistant } = require("../services/callAssistant");

const mockEvent = {
  message: {
    type: "text",
    text: "What about pineapple on pizza?",
  },
  type: "message",
  source: {
    type: "user",
    userId: "mock-user-id-new",
  },
};

(async () => {
  const result = await callAssistant(mockEvent);
  console.log(JSON.stringify(result, null, 2));
})();
