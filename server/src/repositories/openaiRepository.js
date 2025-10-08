// Repository layer for OpenAI API calls with caching
const OpenAI = require('openai');
const NodeCache = require('node-cache');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cache = new NodeCache({ stdTTL: 300 }); // 5 minute cache

const getAnswerFromOpenAI = async (question) => {
  const cacheKey = `openai_${question.toLowerCase().trim()}`;

  // Check cache first
  const cachedAnswer = cache.get(cacheKey);
  if (cachedAnswer) {
    console.log('Returning cached OpenAI answer');
    return cachedAnswer;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an insurance expert. Provide clear, accurate answers about insurance topics. Keep responses concise and easy to understand.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const answer = completion.choices[0].message.content.trim();

    // Cache the answer
    cache.set(cacheKey, answer);

    return answer;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get answer from AI service');
  }
};

module.exports = { getAnswerFromOpenAI };
