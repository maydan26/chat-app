import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-api-domain.com'
  : 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

import type { AskQuestionRequest, AskQuestionResponse } from '../types';

export const askQuestion = async (data: AskQuestionRequest): Promise<AskQuestionResponse> => {
  const response = await apiClient.post<AskQuestionResponse>('/api/chat', data);
  return response.data;
};

export default apiClient;
