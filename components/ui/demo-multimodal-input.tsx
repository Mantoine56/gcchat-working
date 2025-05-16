'use client';

import React, { useState, useCallback } from 'react';
import { PureMultimodalInput } from "./multimodal-ai-chat-input";

type VisibilityType = 'public' | 'private' | 'unlisted' | string;

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

export function MultimodalInputDemo() {
  // Minimal state and handlers required by PureMultimodalInput
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false); // Control the stop button visibility
  const [chatId] = useState('demo-input-only'); // Dummy chat ID
  const [messages, setMessages] = useState<UIMessage[]>([]);

  const handleSendMessage = useCallback(({ input, attachments }: { input: string; attachments: Attachment[] }) => {
    console.log("--- Sending Message ---");
    console.log("Input:", input);
    console.log("Attachments:", attachments);
    
    const newMessage: UIMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      attachments: [...attachments]
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsGenerating(true);
    
    // Simulate response
    setTimeout(() => {
      const responseMessage: UIMessage = {
        id: (Date.now() + 1).toString(),
        content: `This is a response to: "${input}"${attachments.length > 0 ? 
          ` with ${attachments.length} attachment(s)` : ''}`,
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsGenerating(false);
      setAttachments([]);
    }, 2000); // Simulate a 2 second response time
  }, []);

  const handleStopGenerating = useCallback(() => {
    console.log("Stop button clicked (simulated).");
    setIsGenerating(false);
  }, []);

  // Other necessary props for PureMultimodalInput
  const canSend = true; // Always allow sending in this demo
  const selectedVisibilityType: VisibilityType = 'private'; // Dummy visibility

  return (
    <div className="w-full max-w-3xl mx-auto p-4 border border-gc-gray rounded-lg"> 
      <h2 className="text-xl font-bold text-gc-blue mb-4">myGC assistant Chat</h2>
      
      {/* Simple message display */}
      <div className="flex flex-col gap-3 mb-6 max-h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-gc-blue text-white self-end' : 'bg-gc-gray text-gc-nav self-start'
            } max-w-[80%]`}
          >
            <p>{msg.content}</p>
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="mt-2 text-xs">
                {msg.attachments.map((att, i) => (
                  <p key={i} className="opacity-70">{att.name} ({Math.round(att.size/1024)}KB)</p>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isGenerating && (
          <div className="self-start bg-gc-gray text-gc-nav p-3 rounded-lg relative shadow-sm">
            <div className="flex items-center">
              <span className="text-gc-blue font-medium">Thinking</span>
              <span className="inline-flex w-10 justify-start">
                <span className="inline-block animate-[pulse_1s_0ms_infinite]">.</span>
                <span className="inline-block animate-[pulse_1s_200ms_infinite]">.</span>
                <span className="inline-block animate-[pulse_1s_400ms_infinite]">.</span>
              </span>
              <span className="ml-1 inline-block h-4 w-0.5 bg-gc-blue animate-blink"></span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-gc-gray to-gray-100 opacity-30 animate-pulse-slow rounded-lg"></div>
          </div>
        )}
      </div>
      
      {/* Multimodal input */}
      <PureMultimodalInput
        chatId={chatId}
        messages={messages}
        attachments={attachments}
        setAttachments={setAttachments}
        onSendMessage={handleSendMessage}
        onStopGenerating={handleStopGenerating}
        isGenerating={isGenerating}
        canSend={canSend}
        selectedVisibilityType={selectedVisibilityType}
      />
    </div>
  );
} 