# Insurance AI Assistant API

A professional Node.js API server built with **MVC Architecture** that provides simplified answers to insurance-related questions. Designed with senior full-stack developer best practices.

## 🏗️ Architecture

This project follows **Model-View-Controller (MVC)** architecture:

- **Models** (`src/models/`) - Handle data and business logic
- **Controllers** (`src/controllers/`) - Handle HTTP requests and responses  
- **Routes** (`src/routes/`) - Define API endpoints
- **Middleware** (`src/middleware/`) - Handle cross-cutting concerns
- **Config** (`src/config/`) - Application configuration

## ✨ Features

- 🏥 Health Insurance questions
- 🚗 Auto Insurance questions  
- 💰 Life Insurance questions
- 📚 General insurance terminology (deductibles, premiums)
- 🔒 Enterprise-grade security (Helmet, CORS, Rate limiting)
- ✅ Comprehensive input validation and error handling
- 📁 Clean, maintainable MVC code structure
- 🚀 Production-ready with graceful shutdown
- 📊 Request logging and monitoring
- ⚙️ Environment-based configuration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Usage

### Base URL
```
http://localhost:3000
```

### Endpoints

#### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Insurance AI Assistant API",
  "version": "1.0.0",
  "endpoints": {
    "POST /api/question": "Submit an insurance question and get a simplified answer"
  },
  "examples": [
    "What is health insurance?",
    "How does auto insurance work?",
    "What is a deductible?",
    "How much life insurance do I need?"
  ]
}
```

#### POST /ask
Submit an insurance question and receive a simplified answer.

**Request Body:**
```json
{
  "question": "What is health insurance?"
}
```

**Response:**
```json
{
  "success": true,
  "question": "What is health insurance?",
  "answer": "Health insurance covers medical expenses like doctor visits, hospital stays, and prescriptions. You pay a monthly premium and the insurance helps pay for your healthcare costs.",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Question is required",
  "message": "Please provide a question in the request body"
}
```

## Example Questions

The API can handle these 5 main insurance topics:

1. **"What is health insurance?"** - Learn about medical coverage
2. **"What is auto insurance?"** - Understand car insurance basics  
3. **"What is life insurance?"** - Learn about life coverage
4. **"What is a deductible?"** - Understand out-of-pocket costs
5. **"What is a premium?"** - Learn about insurance payments

## Testing with cURL

```bash
# Test the API
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is health insurance?"}'

# Test with different question
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is a deductible?"}'
```

## Testing with JavaScript/Fetch

```javascript
// Test the API
fetch('http://localhost:3000/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'What is a deductible?'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Configuration

- **Port**: Default is 3000, can be changed with `PORT` environment variable
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Request Size**: Limited to 10MB
- **Question Length**: Maximum 500 characters

## Security Features

- Helmet.js for security headers
- CORS enabled
- Rate limiting
- Input validation
- Error handling

## 📁 Project Structure

```
├── package.json                 # Dependencies and scripts
├── README.md                    # Documentation
└── server/                      # Server application
    ├── server.js               # Main application entry point
    ├── env.example             # Environment configuration template
    ├── jest.config.js          # Jest test configuration
    ├── src/                    # Source code (MVC Architecture)
    │   ├── models/             # Data and business logic
    │   │   └── Insurance.js    # Insurance knowledge base model
    │   ├── controllers/        # Request/response handling
    │   │   └── QuestionController.js # Question processing controller
    │   ├── routes/             # API endpoint definitions
    │   │   ├── index.js        # Main routes configuration
    │   │   └── questionRoutes.js # Question-specific routes
    │   ├── middleware/         # Cross-cutting concerns
    │   │   ├── validation.js   # Input validation middleware
    │   │   └── errorHandler.js # Error handling middleware
    │   └── config/             # Application configuration
    │       └── app.js          # Express app configuration
    └── tests/                  # Test files
        ├── ask.test.js         # Route integration tests
        └── models.test.js      # Model unit tests
```

## Development

The server uses a simple keyword matching system to find relevant answers from a predefined knowledge base. The system:

1. Normalizes the input question
2. Looks for exact matches first
3. Falls back to partial matches
4. Uses keyword matching as a last resort
5. Returns a default response if no match is found

## License

MIT
