import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// ChatMessage component for displaying individual messages
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isStreaming?: boolean;
}

/**
 * ChatMessage component for displaying messages in the chat interface
 * Includes special handling for streaming messages with animated cursor
 * 
 * This component handles formatting and displaying chat messages with proper
 * styling for user vs assistant messages, and adds a blinking cursor when
 * response is streaming.  It also formats markdown in assistant responses.
 */
export const ChatMessage = ({ message, isUser, isStreaming = false }: ChatMessageProps) => {
  // State for animated thinking dots
  const [dotCount, setDotCount] = useState(0);
  
  // Debugging - log when component renders
  useEffect(() => {
    const contentPreview = message ? `${message.substring(0, 30)}${message.length > 30 ? '...' : ''}` : '';
    console.log(`[ChatMessage] Rendering - isUser: ${isUser}, ` + 
                `isStreaming: ${isStreaming}, ` + 
                `message length: ${message?.length || 0}, ` +
                `preview: ${contentPreview}`);
  }, [message, isUser, isStreaming]);
  
  // Create animated typing effect when streaming
  useEffect(() => {
    if (!isStreaming) return;
    
    console.log('[ChatMessage] Starting typing animation');
    
    // Animate the dots (1, 2, 3, then repeat)
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 400);
    
    return () => {
      console.log('[ChatMessage] Cleaning up typing animation');
      clearInterval(interval);
    };
  }, [isStreaming]);
  
  // Show a thinking message if message is empty and streaming
  const displayContent = message;
  
  // Generate the thinking indicator with animated dots
  const renderThinkingIndicator = () => {
    if (!isStreaming || displayContent) return null;
    
    // Create dots string based on current dot count
    const dots = '.'.repeat(dotCount);
    // Space padding to prevent layout shift as dots animate
    const padding = '\u00A0'.repeat(3 - dotCount);
    
    return (
      <div className="flex items-center">
        <span className="text-gc-blue font-medium">Thinking{dots}</span>
        <span className="invisible">{padding}</span>
        <span className="ml-2 inline-block h-4 w-0.5 bg-gc-blue animate-blink"></span>
      </div>
    );
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`${
          isUser
            ? 'bg-gc-blue text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg'
            : 'bg-gc-gray text-gc-nav rounded-tl-lg rounded-tr-lg rounded-br-lg'
        } p-4 max-w-[80%] shadow-sm ${isStreaming && !message ? 'relative overflow-hidden' : ''}`}
      >
        {/* Subtle background pulse effect for thinking state */}
        {isStreaming && !message && (
          <div className="absolute inset-0 bg-gradient-to-r from-gc-gray to-gray-100 opacity-30 animate-pulse-slow"></div>
        )}
        
        {isUser ? (
          // User messages are displayed as plain text
          <p className="text-base font-gc">{displayContent}</p>
        ) : (
          // AI messages support markdown formatting
          <div className="text-base font-gc markdown-content relative">
            {/* Show thinking indicator if streaming with no content */}
            {isStreaming && !displayContent ? (
              renderThinkingIndicator()
            ) : (
              /* Otherwise render markdown content */
              <>
                <ReactMarkdown>{displayContent || ''}</ReactMarkdown>
                
                {/* Show cursor at end of text while streaming */}
                {isStreaming && displayContent && (
                  <span className="inline-block ml-1 w-0.5 h-4 bg-gc-blue animate-blink"></span>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
