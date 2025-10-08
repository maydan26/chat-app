// Chat service layer for business logic and orchestration
const { getAnswerFromOpenAI } = require('../repositories/openaiRepository');
const { saveToHistory, getUserHistory } = require('../models/historyModel');

const validateQuestion = (question) => {
  const errors = [];

  if (!question) {
    errors.push('Question is required');
  } else if (typeof question !== 'string') {
    errors.push('Question must be a string');
  } else if (question.trim().length === 0) {
    errors.push('Question cannot be empty');
  } else if (question.length > 500) {
    errors.push('Question must be 500 characters or less');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const processQuestion = async (question) => {
  // Validate question
  const validation = validateQuestion(question);
  if (!validation.isValid) {
    const error = new Error(`Validation failed: ${validation.errors.join(', ')}`);
    error.name = 'ValidationError';
    throw error;
  }

  // Get answer from OpenAI (with caching in repository)
  const answer = await getAnswerFromOpenAI(question);

  return {
    question: question.trim(),
    answer,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  processQuestion,
  saveToHistory,
  getUserHistory,
  validateQuestion
};
