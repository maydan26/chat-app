# Insurance AI Assistant

A full-stack chat application powered by OpenAI GPT-3.5-turbo for answering insurance questions.

## 🚀 Quick Start

### **Prerequisites**
- Node.js 14+ and npm 6+
- OpenAI API key

### **Setup and Run**

#### **1. Backend Setup**
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file and add your OpenAI API key
cp env.example .env
# Edit .env and add: OPENAI_API_KEY=your_api_key_here

# Start the server
npm start
```

#### **2. Frontend Setup**
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### **3. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🏗️ Design Choices

### **Backend Architecture**
- **Controller-Service-Repository Pattern**: Clean separation of concerns
  - **Controllers**: Handle HTTP requests/responses
  - **Services**: Business logic and validation
  - **Repositories**: Data access (OpenAI API calls)
- **Functional Programming**: Used pure functions instead of classes for simplicity
- **Caching**: 5-minute cache for OpenAI responses to reduce API costs
- **Rate Limiting**: 10 requests/minute per IP on `/api/chat` endpoint to prevent abuse

### **Frontend Architecture**
- **Component-Based Design**: Reusable components (ChatInput, ChatMessage, ChatWindow)
- **React Query**: Efficient API state management and caching
- **TypeScript**: Full type safety with Message interface
- **Material-UI + SCSS**: Consistent styling with component-level SCSS files
- **Page-Level State**: Messages managed in Chat page for better control

## 🔧 Future Improvements

### **Virtualization**
- Attempted to implement message virtualization using `react-window` for efficient rendering of long conversations
- Encountered import and runtime compatibility issues that need further investigation
- Currently using simple `messages.map()` which works well for typical chat sessions

### **Security Enhancements**
- **User Input Sanitization**: Add robust XSS prevention and input sanitization
- **Content Filtering**: Implement filtering for inappropriate or harmful questions
- **Enhanced Rate Limiting**: Move to user-based instead of IP-based rate limiting
- **Authentication**: Add user authentication for personalized chat history

## 📁 Project Structure

```
chatApp/
├── server/              # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/  # HTTP handling
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # OpenAI API integration
│   │   ├── models/       # Data models
│   │   └── routes/       # API endpoints
│   └── tests/           # Test suite
└── client/              # React + TypeScript frontend
    ├── src/
    │   ├── pages/        # Chat page
    │   ├── components/   # UI components
    │   ├── services/     # API client
    │   └── types.ts      # Type definitions
    └── package.json
```

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Test API manually
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What is health insurance?"}'
```

## 📚 API Endpoints

- **POST /api/chat** - Submit a question and get AI-powered answer
- **GET /api/history** - Retrieve conversation history for current user

## 📄 License

MIT
