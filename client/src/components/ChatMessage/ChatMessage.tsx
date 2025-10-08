import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './ChatMessage.scss';

interface ChatMessageProps {
  message: {
    sender: 'user' | 'ai';
    text: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <Box className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--ai'}`}>
      <Paper className="chat-message__content">
        <Typography variant="body1">
          {message.text}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;
