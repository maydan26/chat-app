// History model for managing user question history
// In-memory storage for user history
const userHistory = new Map();

const saveToHistory = (userId, question, answer) => {
  if (!userHistory.has(userId)) {
    userHistory.set(userId, []);
  }

  const history = userHistory.get(userId);
  history.push({
    question,
    answer,
    timestamp: new Date().toISOString()
  });

  // Keep only last 10 entries per user
  if (history.length > 10) {
    history.shift();
  }
};

const getUserHistory = (userId) => {
  return userHistory.get(userId) || [];
};

module.exports = {
  saveToHistory,
  getUserHistory
};
