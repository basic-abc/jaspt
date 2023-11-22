const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require("../libs/logger");

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

const TTL_IN_DAYS = 7;

const createUser = async (userId, threadId) => {
  if (typeof userId !== "string") {
    throw new Error('"userId" must be a string');
  } else if (typeof threadId !== "string") {
    throw new Error('"threadId" must be a string');
  }

  const ttlSeconds = TTL_IN_DAYS * 24 * 60 * 60;
  const ttl = Math.floor(Date.now() / 1000) + ttlSeconds;

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      threadId,
      ttl,
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
  } catch (error) {
    logger.error({ reason: "dynamoDbClient.send.PutCommand", error });
    throw error;
  }
};

module.exports = { createUser };
