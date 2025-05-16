'use client';

// Import standard React and component dependencies
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatSidebar, Conversation } from './ChatSidebar';
import { useDataset, DatasetProvider } from '../contexts/DatasetContext';
import { useStreamingChat } from '../hooks/useStreamingChat';
import { DemoDatasetSelector } from './DemoDatasetSelector';

// Define additional types for UI components

// Interface for chat messages with user flag
interface UIMessage {
  text: string;
  isUser: boolean;
}

// Generate a unique ID for conversations
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Main chat interface wrapped with dataset provider
const ChatInterfaceWithProvider = () => {
  return (
    <DatasetProvider>
      <ChatInterfaceContent />
    </DatasetProvider>
  );
};

// Actual chat interface content with access to dataset context
const ChatInterfaceContent = () => {
  const { datasetName } = useDataset();

  // Chat message state (for UI display)
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      text: "Hello! How can I assist you today?",
      isUser: false,
    },
  ]);
  
  // Streaming and processing state
  const [isLoading, setIsLoading] = useState(false);
  
  // Left sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Getting started with GC services',
      lastMessage: 'How do I apply for a passport?',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    {
      id: '2',
      title: 'Tax filing questions',
      lastMessage: 'When is the deadline for filing taxes?',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1))
    },
    {
      id: '3',
      title: 'Current chat',
      lastMessage: 'Hello! How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string>('3');
  
  // Get streaming functionality from our custom hook
  const {
    streamedResponse,
    isStreaming,
    startStreaming
  } = useStreamingChat();
  
  // Reference for scroll behavior
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Create a toggle function for the left sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  // Handle selecting a conversation from the sidebar
  const handleSelectConversation = (id: string) => {
    // In a real app, you would load conversation messages here
    setActiveConversationId(id);
    // For demo purposes, we're not actually loading different messages
  };
  
  // Handle creating a new conversation
  const handleNewConversation = () => {
    const newId = generateId();
    const newConversation: Conversation = {
      id: newId,
      title: 'New conversation',
      lastMessage: 'Start a new conversation',
      timestamp: new Date()
    };
    
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newId);
    setMessages([{
      text: "Hello! How can I assist you today?",
      isUser: false,
    }]);
  };
  
  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages update or streaming content updates
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);
  
  // Enhanced logging function with proper typing
  const logWithDetailedInfo = (message: string, data?: unknown) => {
    console.log(`[CHAT UI] ${new Date().toISOString()} - ${message}`, data || '');
  };

  // Log the current state to help debug
  useEffect(() => {
    logWithDetailedInfo(`Current UI State - Messages: ${messages.length}, IsLoading: ${isLoading}, IsStreaming: ${isStreaming}`);
    logWithDetailedInfo('Last message:', messages.length > 0 ? messages[messages.length - 1] : 'none');
  }, [messages, isLoading, isStreaming]);

  // Effect to handle streamedResponse updates
  useEffect(() => {
    // Only process if we have a response and we're not already showing it
    if (streamedResponse && (isStreaming || !messages.some(msg => !msg.isUser && msg.text === streamedResponse))) {
      const responsePreview = streamedResponse.substring(0, 50) + (streamedResponse.length > 50 ? '...' : '');
      logWithDetailedInfo(`RECEIVED RESPONSE - Length: ${streamedResponse.length}, Preview: "${responsePreview}"`);
      
      // Debug: Verify we have the complete response
      if (streamedResponse.length > 0) {
        logWithDetailedInfo('Response is not empty, updating UI');
        
        // Update the last message with new content from stream
        setMessages(prev => {
          const updatedMessages = [...prev];
          
          // Debug the current messages array
          logWithDetailedInfo(`Updating messages array, current length: ${updatedMessages.length}`);
          
          // Update the last assistant message if it exists
          const lastMessageIndex = updatedMessages.length - 1;
          if (lastMessageIndex >= 0 && !updatedMessages[lastMessageIndex].isUser) {
            logWithDetailedInfo(`Found assistant message at index ${lastMessageIndex} to update`);
            
            // Check if we need to update - avoid redundant updates
            if (updatedMessages[lastMessageIndex].text !== streamedResponse) {
              // Update with the streamed response
              updatedMessages[lastMessageIndex] = {
                text: streamedResponse,
                isUser: false
              };
              logWithDetailedInfo('Updated message with response content');
              
              // Update loading state based on streaming status
              setIsLoading(isStreaming);
              logWithDetailedInfo(`Updated loading state: ${isStreaming}`);
              
              // Force a re-render to ensure UI updates
              setTimeout(() => {
                logWithDetailedInfo('Forcing scroll to bottom');
                scrollToBottom();
              }, 50); // Short timeout to ensure render completes
            } else {
              logWithDetailedInfo('Content already matches, skipping update');
            }
          } else {
            // If for some reason there's no assistant message, add one
            logWithDetailedInfo('No assistant message found, adding new one');
            updatedMessages.push({
              text: streamedResponse,
              isUser: false
            });
          }
          
          return updatedMessages;
        });
        
        // If streaming is complete, update conversation in sidebar
        if (!isStreaming && activeConversationId && streamedResponse.trim()) {
          logWithDetailedInfo(`Updating conversation in sidebar: ${activeConversationId}`);
          setConversations(prev => 
            prev.map(conv => 
              conv.id === activeConversationId 
                ? {
                    ...conv,
                    lastMessage: streamedResponse.substring(0, 30) + (streamedResponse.length > 30 ? '...' : ''),
                    timestamp: new Date()
                  }
                : conv
            )
          );
        }
      } else {
        logWithDetailedInfo('WARNING: Received empty response! This should not happen');
      }
    } else if (!streamedResponse) {
      logWithDetailedInfo('No streamed response available yet');
    } else {
      logWithDetailedInfo('Response already displayed, skipping update');
    }
  }, [streamedResponse, isStreaming, activeConversationId, scrollToBottom, messages]);

  // Handle sending a message with streaming functionality
  const handleSendMessage = async (message: string) => {
    logWithDetailedInfo(`Starting to send message: "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}"`);
    
    if (message.trim() === '') {
      logWithDetailedInfo('Empty message, ignoring');
      return;
    }
    
    if (isLoading) {
      logWithDetailedInfo('Already loading, ignoring new message');
      return;
    }

    // Add user message to UI
    const userMessageUI = { text: message, isUser: true };
    logWithDetailedInfo('Adding user message to UI');
    setMessages(prev => {
      logWithDetailedInfo(`Current message count: ${prev.length}`);
      return [...prev, userMessageUI];
    });
    
    // Set loading state
    logWithDetailedInfo('Setting loading state to true');
    setIsLoading(true);
    
    // Create message array for the mocked streaming hook
    // The mocked hook expects { role: 'user' | 'assistant', content: string }
    // We adapt from UIMessage: { text: string, isUser: boolean }
    const messagesForStreamingHook = messages.map(msg => ({
      role: (msg.isUser ? 'user' : 'assistant') as 'user' | 'assistant',
      content: msg.text
    }));
    // Add the new user message to this array as well
    messagesForStreamingHook.push({ role: 'user', content: message });

    logWithDetailedInfo('Calling mocked startStreaming');
    // Start streaming with the mocked hook (no dataset needed)
    await startStreaming(messagesForStreamingHook);
    
    // Update conversation in sidebar with the user's message immediately for responsiveness
    if (activeConversationId) {
      logWithDetailedInfo(`Updating conversation (user msg) in sidebar: ${activeConversationId}`);
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversationId 
            ? {
                ...conv,
                lastMessage: message.substring(0, 30) + (message.length > 30 ? '...' : ''),
                timestamp: new Date()
              }
            : conv
        )
      );
    } 
  };

  return (
    <div className="h-screen flex bg-gc-background-dark font-gc">
      {/* Left Sidebar for conversations and controls */}
      <ChatSidebar 
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        userName="Antoine Elias"
        userEmail="antoine.elias@gc.ca"
      />

      {/* Main chat area - Added classes for sidebar animation */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : ''}`}>
        {/* Header for the chat area - Restored style and toggle button */}
        <header className="bg-gc-blue text-white shadow-md h-[52px] flex items-center justify-between relative px-4 sm:px-6 lg:px-8">
          {/* Sidebar Toggle Button - Placed first for flex order */}
          <div className="flex-none">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-md bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 transition-colors border border-white/20"
              aria-label="Toggle conversation sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          
          {/* Centered Title - Takes up remaining space */}
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-xl font-semibold whitespace-nowrap">
              myGC assistant
            </h1>
          </div>

          {/* Dataset Selector - Placed last for flex order, aligned to the right */}
          <div className="flex-none">
            <DemoDatasetSelector />
          </div>
        </header>

        {/* Chat messages display area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f8f8f8]">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message, index) => {
              // Determine if this message is currently streaming
              const isLastMessage = index === messages.length - 1;
              const isCurrentlyStreaming = isStreaming && isLastMessage && !message.isUser;
              
              return (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                  isStreaming={isCurrentlyStreaming}
                />
              );
            })}
            
            {/* Only show thinking indicator when no message exists yet */}
            {isLoading && messages.length === 0 && (
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
            
            {/* Suggested Prompts Area */}
            {messages.length === 1 && !messages[0].isUser && messages[0].text === "Hello! How can I assist you today?" && (
              <div className="pt-4 pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "How do I apply for a passport or renew my passport?",
                    "What are the deadlines for filing income tax returns?",
                    "What benefits am I eligible for as a Canadian citizen?",
                    "How can I access government services online?"
                  ].map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      className="p-4 bg-white border border-gc-border rounded-lg shadow-sm hover:shadow-md hover:border-gc-blue-dark transition-all duration-150 text-sm text-gc-text-primary text-left focus:outline-none focus:ring-2 focus:ring-gc-blue"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Removed border-t, bg-white. Kept padding for dataset info text. */}
        <div className="bg-transparent">
          <div className="max-w-4xl mx-auto p-2">
            <ChatInput onSendMessage={handleSendMessage} isDisabled={isLoading} />
            <div className="px-2 pt-2 pb-1 text-xs text-gray-500 flex justify-between items-center">
              <div>
                <span className="font-medium">Current Dataset:</span> {datasetName}
              </div>
              <div className="italic">
                Responses are simulated for this front-end demo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the main component with the dataset provider wrapper
export const ChatInterface = ChatInterfaceWithProvider;
