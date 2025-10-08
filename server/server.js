/**
 * Insurance AI Assistant API Server
 * MVC Architecture Implementation
 * 
 * This server follows Model-View-Controller (MVC) architecture:
 * - Models: Handle data and business logic (src/models/)
 * - Controllers: Handle HTTP requests and responses (src/controllers/)
 * - Routes: Define API endpoints (src/routes/)
 * - Middleware: Handle cross-cutting concerns (src/middleware/)
 * - Config: Application configuration (src/config/)
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { configureApp, config } = require('./src/config/app');
const routes = require('./src/routes');
const { globalErrorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

// Create and configure Express application
const app = configureApp();

// Mount routes
app.use('/', routes);

// 404 handler for undefined routes
app.use('*', notFoundHandler);

// Global error handler (must be last)
app.use(globalErrorHandler);

// Start server
const server = app.listen(config.port, () => {
  console.log('🚀 Insurance AI Assistant API Server Started');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server running on port: ${config.port}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 API URL: http://localhost:${config.port}`);
  console.log(`📚 Documentation: http://localhost:${config.port}/info`);
  console.log(`❓ Test endpoint: POST http://localhost:${config.port}/ask`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🏗️  Architecture: MVC (Model-View-Controller)');
  console.log('📁 Project Structure:');
  console.log('   ├── src/models/     - Data and business logic');
  console.log('   ├── src/controllers/ - Request/response handling');
  console.log('   ├── src/routes/     - API endpoint definitions');
  console.log('   ├── src/middleware/ - Cross-cutting concerns');
  console.log('   └── src/config/     - Application configuration');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
