import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { askQuestion } from '../../services/api';
import type { AskQuestionRequest } from '../../types';
import './ChatInput.scss';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onAIResponse: (response: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onAIResponse }) => {
  const [input, setInput] = useState('');

  const mutation = useMutation({
    mutationFn: (data: AskQuestionRequest) => askQuestion(data),
    onSuccess: (data) => {
      console.log('Question submitted successfully:', data);
      onAIResponse(data.answer);
      setInput('');
    },
    onError: (error) => {
      console.error('Error submitting question:', error);
      onAIResponse('Sorry, I encountered an error. Please try again.');
    },
  });

  const handleSubmit = () => {
    if (input.trim() && !mutation.isPending) {
      onSendMessage(input.trim());
      mutation.mutate({ question: input.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input">
      {mutation.isError && (
        <Alert severity="error" className="chat-input__error">
          Failed to submit question. Please try again.
        </Alert>
      )}
      
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask your insurance question..."
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        disabled={mutation.isPending}
        className="chat-input__field"
      />
      
      <Button 
        onClick={handleSubmit} 
        variant="contained" 
        size="large"
        disabled={!input.trim() || mutation.isPending}
        className="chat-input__button"
      >
        {mutation.isPending ? (
          <>
            <CircularProgress size={20} color="inherit" />
            <span style={{ marginLeft: '8px' }}>Sending...</span>
          </>
        ) : (
          'Send'
        )}
      </Button>
    </div>
  );
};

export default ChatInput;
