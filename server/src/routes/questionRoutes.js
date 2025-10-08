/**
 * Question Routes
 * Defines all routes related to insurance questions
 */
const express = require('express');
const rateLimit = require('express-rate-limit');
const { askQuestion, getHistory, validateContentType, validateRequestBody } = require('../controllers/QuestionController');

const router = express.Router();

// Rate limiting for /ask endpoint (10 requests per minute per IP)
const askLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Rate limit exceeded',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   GET /api/history
 * @desc    Get previous questions and answers for this user
 * @access  Public
 */
router.get('/api/history', getHistory);

/**
 * @route   POST /api/chat
 * @desc    Submit an insurance question and get a simplified answer
 * @access  Public
 * @body    { question: string }
 */
router.post('/api/chat', validateContentType, validateRequestBody, askLimiter, askQuestion);

module.exports = router;
