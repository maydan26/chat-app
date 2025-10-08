import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import ChatMessage from '../ChatMessage/ChatMessage';
import './ChatWindow.scss';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box className="chat-window">
      {messages.length > 0 ? (
        <Box className="chat-window__messages">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
      ) : (
        <Box className="chat-window__empty">
          <Typography variant="body1" className="chat-window__empty-text">
            Start a conversation by asking an insurance question...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
