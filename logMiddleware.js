const axios = require('axios');

const LOGGING_API_URL = "http://20.244.56.144/evaluation-service/logs";

/**
 * Sends a structured log to the evaluation server.
 * @param {string} stack - "backend" or "frontend"
 * @param {string} level - "debug", "info", "warn", "error", or "fatal"
 * @param {string} packageName - backend/frontend package (e.g., "handler", "db", "api", etc.)
 * @param {string} message - Description of the event/error
 */
async function Log(stack, level, packageName, message) {
  try {
    const payload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: packageName.toLowerCase(),
      message
    };

    const response = await axios.post(LOGGING_API_URL, payload);
    console.log(`Log sent: ${response.data.message}`);
  } catch (error) {
    console.error("Failed to send log:", error.response ? error.response.data : error.message);
  }
}

module.exports = Log;