'use client';

/**
 * Custom hook for streaming chat functionality
 * 
 * This hook provides an interface for making streaming chat requests
 * and handling the response stream. It includes state management
 * for the streaming process, including loading states and errors.
 */

import { useState, useCallback } from 'react';

// Interface for chat messages
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Return type for the streaming hook
interface StreamingChatResult {
  streamedResponse: string;
  isStreaming: boolean;
  error: string | null;
  startStreaming: (messages: Message[]) => Promise<void>;
  stopStreaming: () => void;
}

/**
 * Custom hook for handling streaming chat responses
 * 
 * @returns An object with streaming state and control functions
 */
export function useStreamingChat(): StreamingChatResult {
  // State to track the current streamed response
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  
  // Loading state
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Reference to the current fetch controller for cancellation
  const [controller, setController] = useState<AbortController | null>(null);

  /**
   * Start streaming a response from the API
   * 
   * @param messages - Array of chat messages
   */
  const startStreaming = useCallback(async (messages: Message[]) => {
    // Reset states
    setError(null);
    setStreamedResponse('');
    setIsStreaming(true);
    
    console.log(`Simulating streaming for ${messages.length} messages.`);
    
    // Simulate API call delay
    setTimeout(() => {
      const simulatedResponse = "This is a simulated streamed response from the frontend. No actual backend call was made.";
      setStreamedResponse(simulatedResponse);
      setIsStreaming(false);
      console.log(`Simulated response generated: ${simulatedResponse}`);
    }, 1500); // Simulate 1.5 second delay

  }, []);

  /**
   * Stop the current streaming request
   */
  const stopStreaming = useCallback(() => {
    if (controller) {
      controller.abort();
      setIsStreaming(false);
      setController(null);
    }
  }, [controller]);

  // Return the state and functions
  return {
    streamedResponse,
    isStreaming,
    error,
    startStreaming,
    stopStreaming,
  };
}

/**
 * Helper function to generate a user message object
 * 
 * @param content - The message content
 * @returns A message object with user role
 */
export function createUserMessage(content: string): Message {
  return { role: 'user', content };
}

/**
 * Helper function to generate an assistant message object
 * 
 * @param content - The message content
 * @returns A message object with assistant role
 */
export function createAssistantMessage(content: string): Message {
  return { role: 'assistant', content };
}
