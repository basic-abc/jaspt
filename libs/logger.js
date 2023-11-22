const { Logger } = require('@aws-lambda-powertools/logger');

const logger = new Logger({ serviceName: "jaspt" });

module.exports = { logger };