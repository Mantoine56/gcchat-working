// ChatSidebar component for displaying chat history in a retractable panel
'use client';

import { useState } from 'react';

// Define types for chat conversations
export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  userName?: string;
  userEmail?: string;
}

// Theme options for the UI
export type ThemeOption = 'system' | 'light' | 'dark';

// Language options
export type LanguageOption = 'en' | 'fr';

export const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  isSidebarOpen,
  onToggleSidebar,
  userName = 'Guest User',
  userEmail = 'user@example.ca'
}: ChatSidebarProps) => {
  // State for settings dropdown
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeOption>('system');
  const [language, setLanguage] = useState<LanguageOption>('en');
  
  // Format the date to a readable string
  const formatDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If it's today, show time only
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If it's yesterday, show "Yesterday"
    else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    // Otherwise show date
    else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Toggle settings panel
  const toggleSettings = () => setShowSettings(!showSettings);

  // Handle theme change
  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    setShowSettings(false);
    // You would implement actual theme switching logic here
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: LanguageOption) => {
    setLanguage(newLanguage);
    setShowSettings(false);
    // You would implement actual language switching logic here
  };

  return (
    <>
      {/* Sidebar backdrop - only visible on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggleSidebar}
        />
      )}
      
      {/* Sidebar - fully collapsible with proper positioning */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white z-40
        border-r border-gc-gray transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-md w-80
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header - perfectly aligned with main header */}
          <div className="flex items-center justify-between h-[52px] px-4 bg-gc-blue text-white shadow-md">
            <h2 className="text-xl font-semibold whitespace-nowrap">Conversations</h2>
            <button 
              onClick={onToggleSidebar}
              className="md:hidden p-1.5 rounded-md bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 border border-white/20"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* New chat button - Sits immediately below header with proper spacing */}
          <button 
            onClick={onNewConversation}
            className="flex items-center gap-2 mx-3 mt-4 p-3 rounded-lg border border-gc-gray hover:bg-gc-gray transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="text-gc-nav font-medium">New chat</span>
          </button>
          
          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`
                    w-full text-left p-3 border-b border-gc-gray hover:bg-gc-gray
                    flex flex-col gap-1 transition-colors
                    ${activeConversationId === conversation.id ? 'bg-gc-gray' : ''}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm truncate">{conversation.title}</span>
                    <span className="text-xs text-gray-700">{formatDate(conversation.timestamp)}</span>
                  </div>
                  <p className="text-xs text-gray-700 truncate">{conversation.lastMessage}</p>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No conversation history yet</p>
                <p className="text-sm mt-2">Start a new chat to begin</p>
              </div>
            )}
          </div>
          
          {/* User settings and controls at the bottom */}
          <div className="flex-none border-t border-gc-gray bg-white">
            {/* User profile section */}
            <div 
              className="flex items-center justify-between p-4 hover:bg-gc-gray/50 cursor-pointer"
              onClick={toggleSettings}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gc-blue flex items-center justify-center">
                  <span className="text-white font-bold">{userName.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{userName}</p>
                  <p className="text-xs text-gray-700 truncate">{userEmail}</p>
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            
            {/* Settings dropdown */}
            <div className={`
              px-3 rounded-lg border border-gc-gray bg-white overflow-hidden mx-3 my-2
              transition-all duration-200 ease-in-out
              ${showSettings ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 invisible'}
            `}>
              {/* Theme settings */}
              <div className="p-3 border-b border-gc-gray">
                <h3 className="font-medium text-sm mb-2">Theme</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleThemeChange('system')} 
                    className={`px-3 py-1 text-xs rounded-full ${theme === 'system' ? 'bg-gc-blue text-white' : 'bg-gc-gray text-gc-nav'}`}
                  >
                    System
                  </button>
                  <button 
                    onClick={() => handleThemeChange('light')} 
                    className={`px-3 py-1 text-xs rounded-full ${theme === 'light' ? 'bg-gc-blue text-white' : 'bg-gc-gray text-gc-nav'}`}
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => handleThemeChange('dark')} 
                    className={`px-3 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-gc-blue text-white' : 'bg-gc-gray text-gc-nav'}`}
                  >
                    Dark
                  </button>
                </div>
              </div>
              
              {/* Language settings */}
              <div className="p-3">
                <h3 className="font-medium text-sm mb-2">Language / Langue</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleLanguageChange('en')} 
                    className={`px-3 py-1 text-xs rounded-full ${language === 'en' ? 'bg-gc-blue text-white' : 'bg-gc-gray text-gc-nav'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('fr')} 
                    className={`px-3 py-1 text-xs rounded-full ${language === 'fr' ? 'bg-gc-blue text-white' : 'bg-gc-gray text-gc-nav'}`}
                  >
                    Français
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer actions */}
            <div className="flex justify-between px-4 py-2 text-sm">
              <button className="text-gc-nav hover:text-gc-link transition-colors">
                Help
              </button>
              <button className="text-gc-nav hover:text-gc-link transition-colors">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
