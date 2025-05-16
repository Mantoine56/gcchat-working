// SideChatInterface component for a side pull-out chat
'use client';

import { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

// Interface for chat messages in the UI
interface Message {
  text: string;
  isUser: boolean;
}

// Interface for API messages - This interface is no longer used and will be removed.
/*
interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}
*/

export const SideChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I assist you today?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the chat panel open or closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Close chat when clicking outside (optional)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatPanel = document.getElementById('side-chat-panel');
      if (isOpen && chatPanel && !chatPanel.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-gc-blue text-white p-3 rounded-full shadow-lg hover:bg-gc-link transition-colors duration-200 z-10"
        aria-label="Toggle chat assistant"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Side chat panel */}
      <div
        id="side-chat-panel"
        className={`fixed right-0 top-0 h-full w-[380px] md:w-[420px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-labelledby="side-chat-title"
      >
        {/* Chat header */}
        <div className="bg-gc-blue text-white p-4 flex justify-between items-center shadow-md">
          <h2 id="side-chat-title" className="text-lg font-bold">myGC assistant</h2>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gc-gray transition-colors"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f8f8f8]">
          <div aria-live="polite" className="sr-only">
            {isLoading ? "Assistant is thinking..." : ""}
          </div>
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

        {/* Input area with proper spacing */}
        <div className="border-t border-gc-gray bg-white pt-2 pb-3 px-3">
          <ChatInput onSendMessage={handleSendMessage} isDisabled={isLoading} />
        </div>
      </div>

      {/* Overlay when chat is open */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity z-10 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleChat}
        aria-hidden="true"
        role="dialog"
      />
    </>
  );
}; 