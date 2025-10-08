import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ChatInput from '../components/ChatInput/ChatInput';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import type { Message } from '../types';
import './Chat.scss';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    // Add user message to state
    const userMessage: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const handleAIResponse = (response: string) => {
    // Add AI response to state
    const aiMessage: Message = {
      sender: 'ai',
      text: response,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="chat-page">
      <Typography variant="h4" component="h1" className="chat-page__title">
        Insurance AI Assistant
      </Typography>
      
      <Container maxWidth="md" className="chat-page__container">
        <ChatWindow 
          messages={messages} 
        />
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          onAIResponse={handleAIResponse}
        />
      </Container>
    </div>
  );
};

export default Chat;
