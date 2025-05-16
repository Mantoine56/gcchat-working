// LightboxChatInterface component for a modal/lightbox chat
'use client';

import { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

// Interface for chat messages in the UI
interface Message {
  text: string;
  isUser: boolean;
}

export const LightboxChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I assist you today?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the chat lightbox
  const openChat = () => {
    setIsOpen(true);
    // When opening the chat, add focus trap and prevent scrolling
    document.body.style.overflow = 'hidden';
  };

  // Function to close the chat lightbox
  const closeChat = () => {
    setIsOpen(false);
    // Re-enable scrolling when closing
    document.body.style.overflow = '';
  };

  // Add keyboard handlers for accessibility (close on Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Ensure overflow is reset when component unmounts
      document.body.style.overflow = '';
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
      {/* Chat trigger button */}
      <button
        onClick={openChat}
        className="bg-gc-blue text-white py-2 px-4 rounded hover:bg-gc-link transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gc-link focus:ring-opacity-50 shadow-md"
        aria-label="Open chat assistant"
      >
        <div className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-5 h-5 mr-2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
            />
          </svg>
          Chat with an assistant
        </div>
      </button>

      {/* Lightbox overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            // Close only if clicking the outer overlay
            if (e.target === e.currentTarget) {
              closeChat();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-modal-title"
        >
          {/* Lightbox content */}
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-[80vh] max-h-[700px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat header */}
            <div className="bg-gc-blue text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 id="chat-modal-title" className="text-lg font-bold flex items-center">
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
                myGC assistant
              </h2>
              <button
                onClick={closeChat}
                className="text-white hover:text-gc-gray transition-colors focus:outline-none"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#f8f8f8]">
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
            <div className="p-2 bg-gc-gray text-xs text-gc-nav border-t border-gc-gray">
              <p>Your conversation may be monitored for quality assurance and improvement purposes.</p>
            </div>

            {/* Input area with proper spacing */}
            <div className="border-t border-gc-gray bg-white rounded-b-lg pt-2 pb-3 px-3">
              <ChatInput onSendMessage={handleSendMessage} isDisabled={isLoading} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 