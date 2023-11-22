require("dotenv").config();
const { handleEvent } = require("../index.js");

const mockEvent = {
  message: {
    type: "text",
    text: "Which pizza is the best pizza",
  },
  userId: "mock-user-id",
  type: "message",
};

(async () => {
  const result = await handleEvent(mockEvent);
  console.log(JSON.stringify(result, null, 2));
})();
