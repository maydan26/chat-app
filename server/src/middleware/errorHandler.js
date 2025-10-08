/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const globalErrorHandler = (err, req, res, next) => {
  console.error('Global Error Handler:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const errorResponse = {
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  };

  if (isDevelopment) {
    errorResponse.details = err.message;
    errorResponse.stack = err.stack;
  }

  res.status(500).json(errorResponse);
};

/**
 * 404 handler for undefined routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      'GET /',
      'GET /info',
      'POST /ask'
    ]
  });
};

module.exports = {
  globalErrorHandler,
  notFoundHandler
};
