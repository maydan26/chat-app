/**
 * Main Routes Configuration
 * Central routing configuration for the application
 */
const express = require('express');
const questionRoutes = require('./questionRoutes');

const router = express.Router();

/**
 * @route   GET /
 * @desc    Root endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Insurance AI Assistant API',
    endpoints: {
      'POST /api/chat': 'Submit an insurance question and get a simplified answer',
      'GET /api/history': 'Get previous questions and answers for this user'
    }
  });
});

// Mount question routes
router.use('/', questionRoutes);

module.exports = router;
