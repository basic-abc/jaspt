const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { logger } = require("../libs/logger");

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

const getUser = async (userId) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      return Item;
    }
    logger.info({
      message: 'Could not find user with provided "userId"',
      userId,
    });
    return null;
  } catch (error) {
    logger.error({ reason: "dynamoDbClient.send.GetCommand", error });
    throw error;
  }
};

module.exports = { getUser };
