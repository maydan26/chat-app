/**
 * Application Configuration
 * Central configuration for the application
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

/**
 * Configure Express application
 * @returns {Object} - Configured Express app
 */
const configureApp = () => {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  // CORS configuration
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

  // Body parsing middleware
  app.use(express.json({ 
    limit: process.env.JSON_LIMIT || '10mb',
    strict: true
  }));
  app.use(express.urlencoded({ 
    extended: true, 
    limit: process.env.URL_LIMIT || '10mb' 
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: 'Too many requests',
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000) / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // Trust proxy for accurate IP addresses
  app.set('trust proxy', 1);

  return app;
};

/**
 * Application configuration object
 */
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  rateLimit: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100
  },
  jsonLimit: process.env.JSON_LIMIT || '10mb',
  urlLimit: process.env.URL_LIMIT || '10mb'
};

module.exports = {
  configureApp,
  config
};
