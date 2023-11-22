require('dotenv').config();
const { callAssistant } = require('../services/callAssistant');

const mockEvent = {
    message: {
        text: "Which pizza is the best pizza"
    },
    userId: "mock-user-id"
};

(async () => {
    const result = await callAssistant(mockEvent);
    console.log(JSON.stringify(result, null, 2));    
})();