// InlineChatInterface component for embedding a chat within a page
'use client';

import { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

// Interface for chat messages in the UI
interface Message {
  text: string;
  isUser: boolean;
}

export const InlineChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I assist you today?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending a new message
  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);

    // Simulate AI response for front-end demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "This is a simulated AI response. The backend is not connected.",
          isUser: false,
        },
      ]);
      setIsLoading(false);
    }, 1000); // Simulate 1 second delay
  };

  return (
    <div className="bg-white border border-gc-gray rounded-lg shadow-md w-full max-w-4xl mx-auto my-8">
      {/* Chat header */}
      <div className="bg-gc-blue text-white p-4 rounded-t-lg flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-6 h-6 mr-2"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
          />
        </svg>
        <h2 className="text-lg font-bold">myGC assistant</h2>
      </div>

      {/* Chat messages */}
      <div className="h-96 overflow-y-auto p-4 bg-[#f8f8f8]">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="bg-gc-gray text-gc-blue font-medium p-4 rounded-tl-lg rounded-tr-lg rounded-br-lg relative max-w-xs shadow-sm">
                <div className="flex items-center">
                  <span>Thinking</span>
                  <span className="inline-flex w-10 justify-start">
                    <span className="inline-block animate-[pulse_1s_0ms_infinite]">.</span>
                    <span className="inline-block animate-[pulse_1s_200ms_infinite]">.</span>
                    <span className="inline-block animate-[pulse_1s_400ms_infinite]">.</span>
                  </span>
                  <span className="ml-1 inline-block h-4 w-0.5 bg-gc-blue animate-blink"></span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-gc-gray to-gray-100 opacity-30 animate-pulse-slow rounded-tl-lg rounded-tr-lg rounded-br-lg"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat compliance notice */}
      <div className="p-2 bg-gc-gray text-xs text-gc-nav border-t border-b border-gc-gray">
        <p>Your conversation may be monitored for quality assurance and improvement purposes.</p>
      </div>

      {/* Input area with proper spacing */}
      <div className="border-t border-gc-gray bg-white rounded-b-lg pt-2 pb-3 px-3">
        <ChatInput onSendMessage={handleSendMessage} isDisabled={isLoading} />
      </div>
    </div>
  );
}; 