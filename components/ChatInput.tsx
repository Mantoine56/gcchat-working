// ChatInput component for user input
'use client';

import { useState, useCallback } from 'react';
import { PureMultimodalInput } from './ui/multimodal-ai-chat-input';

interface Attachment {
  url: string;
  name: string;
  contentType: string;
  size: number;
}

interface UIMessage {
  id: string;
  content: string;
  role: string;
  attachments?: Attachment[];
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

export const ChatInput = ({ onSendMessage, isDisabled }: ChatInputProps) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Adapter function to convert from multimodal format to current app format
  const handleMultimodalSend = useCallback(({ input, attachments }: { input: string; attachments: Attachment[] }) => {
    // For logging purposes
    if (attachments.length > 0) {
      console.log(`Sent message with ${attachments.length} attachments`);
    }
    
    // Right now we just forward the text input to maintain compatibility
    onSendMessage(input);
    
    // For demo purposes, show a brief "generating" state
    if (!isDisabled) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
      }, 300);
    }
  }, [onSendMessage, isDisabled]);
  
  const handleStopGenerating = useCallback(() => {
    setIsGenerating(false);
    // Here you would implement logic to stop the streaming response
    // For now we just clear the generating state
  }, []);
  
  // Mock messages array (empty since we're not showing message history in the input)
  const messages: UIMessage[] = [];

  return (
    <div className="w-full">
      <PureMultimodalInput
        chatId="main-chat"
        messages={messages}
        attachments={attachments}
        setAttachments={setAttachments}
        onSendMessage={handleMultimodalSend}
        onStopGenerating={handleStopGenerating}
        isGenerating={isGenerating || Boolean(isDisabled)}
        canSend={!isDisabled}
        selectedVisibilityType="private"
        className="px-0.5"
      />
    </div>
  );
};
