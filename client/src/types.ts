export interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string;
}

export interface AskQuestionRequest {
  question: string;
}

export interface AskQuestionResponse {
  success: boolean;
  question: string;
  answer: string;
  timestamp: string;
}
