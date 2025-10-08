// Controller layer for HTTP request/response handling
const { processQuestion, saveToHistory, getUserHistory } = require('../services/chatService');

// Basic validation functions (moved from middleware)
const validateRequestBody = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Invalid request body',
      message: 'Request body must be a valid JSON object'
    });
  }
  next();
};

const validateContentType = (req, res, next) => {
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(400).json({
      success: false,
      error: 'Invalid content type',
      message: 'Content-Type must be application/json'
    });
  }
  next();
};

/**
 * Handle POST /ask request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // Process question through service
    const result = await processQuestion(question);

    // Save to history (using IP as user identifier)
    const userId = req.ip || 'anonymous';
    saveToHistory(userId, result.question, result.answer);

    // Return response
    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Error in askQuestion:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: error.message.replace('Validation failed: ', '')
      });
    }

    // Handle rate limiting errors
    if (error.message.includes('Rate limit exceeded')) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests from this IP, please try again later.'
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong while processing your question'
    });
  }
};

/**
 * Handle GET /history request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHistory = (req, res) => {
  try {
    const userId = req.ip || 'anonymous';
    const history = getUserHistory(userId);

    res.json({
      success: true,
      userId: userId,
      history: history,
      count: history.length
    });
  } catch (error) {
    console.error('Error in getHistory:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong while getting history'
    });
  }
};

module.exports = {
  askQuestion,
  getHistory,
  validateRequestBody,
  validateContentType
};
