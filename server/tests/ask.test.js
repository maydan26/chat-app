const request = require('supertest');
const app = require('../server');

describe('POST /api/chat', () => {
  test('should return OpenAI answer for insurance question', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ question: 'What is health insurance?' })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.question).toBe('What is health insurance?');
    expect(response.body.answer).toBeDefined();
    expect(response.body.answer).toContain('insurance');
    expect(response.body.timestamp).toBeDefined();
  });

  test('should return answer for auto insurance question', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ question: 'What is auto insurance?' })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.answer).toBeDefined();
    expect(response.body.answer.length).toBeGreaterThan(10);
  });

  test('should return validation error for missing question', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({})
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Validation failed');
    expect(response.body.message).toBe('Question is required');
  });

  test('should return validation error for empty question', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ question: '' })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Validation failed');
    expect(response.body.message).toBe('Question is required');
  });

  test('should handle multiple requests successfully', async () => {
    // Make a few requests to ensure the API works
    const responses = [];
    for (let i = 0; i < 3; i++) {
      const response = await request(app)
        .post('/api/chat')
        .send({ question: `Test question ${i}` });
      responses.push(response);
    }

    // All should succeed
    responses.forEach(response => {
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.answer).toBeDefined();
    });
  });
});

describe('GET /api/history', () => {
  test('should return history structure correctly', async () => {
    const response = await request(app)
      .get('/api/history')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.history).toBeDefined();
    expect(Array.isArray(response.body.history)).toBe(true);
    expect(response.body.count).toBeDefined();
    expect(typeof response.body.count).toBe('number');
    expect(response.body.userId).toBeDefined();
  });

  test('should return history after asking questions', async () => {
    // Ask a question first
    await request(app)
      .post('/api/chat')
      .send({ question: 'What is life insurance?' })
      .expect(200);

    // Check history
    const response = await request(app)
      .get('/api/history')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.history.length).toBeGreaterThan(0);

    // Check the last entry is our new question
    const lastEntry = response.body.history[response.body.history.length - 1];
    expect(lastEntry.question).toBe('What is life insurance?');
    expect(lastEntry.answer).toBeDefined();
    expect(lastEntry.timestamp).toBeDefined();
  });

  test('should maintain chronological order in history', async () => {
    // Ask multiple questions with delays to avoid rate limiting
    await request(app)
      .post('/api/chat')
      .send({ question: 'What is a premium?' });

    await new Promise(resolve => setTimeout(resolve, 100));

    await request(app)
      .post('/api/chat')
      .send({ question: 'What is a deductible?' });

    // Check history
    const response = await request(app)
      .get('/api/history')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.history.length).toBeGreaterThanOrEqual(2);

    // Check that questions are in chronological order
    const timestamps = response.body.history.map(item => new Date(item.timestamp).getTime());
    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i-1]);
    }
  });
});
