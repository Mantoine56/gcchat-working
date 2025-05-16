'use client';

import { SideChatInterface } from '../../components/SideChatInterface';
import { InlineChatInterface } from '../../components/InlineChatInterface';
import { LightboxChatInterface } from '../../components/LightboxChatInterface';
import Link from 'next/link';

export default function ChatDemo() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gc-nav font-gc">
      {/* Canada.ca header */}
      <header className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-lg">Canada.ca</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gc-link hover:underline">English</a>
            <a href="#" className="text-gc-link hover:underline">Français</a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-8 text-gc-blue">myGC assistant Interface Examples</h1>
        
        {/* Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex justify-between items-start mb-4">
            <p className="text-lg">
              This page demonstrates three different implementations of the myGC assistant, 
              each designed for different use cases while adhering to Canada.ca design standards.
            </p>
            
            {/* Dashboard Link - prominently displayed */}
            <Link 
              href="/dashboard" 
              className="bg-gc-blue hover:bg-gc-link text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center shadow-sm ml-4 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View Full Dashboard
            </Link>
          </div>
          <p className="mb-0">
            All three variations maintain consistent branding, accessibility standards, and bilingual support capability.
          </p>
        </div>

        {/* Variation 1: Inline Chat */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gc-blue">1. Inline Chat Component</h2>
          <p className="mb-4">
            The inline chat is embedded directly within the page content. 
            This approach works well for dedicated help pages or knowledge base sections.
          </p>
          
          <InlineChatInterface />
        </section>
        
        {/* Variation 2: Lightbox Chat */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gc-blue">2. Lightbox Modal Chat</h2>
          <p className="mb-4">
            This variation displays the chat in a lightbox modal overlay. It&apos;s ideal when you need
            to provide chat assistance without navigating away from the current page.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow border border-gc-gray">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gc-blue">Product Information</h3>
              <LightboxChatInterface />
            </div>
            
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
              Phasellus volutpat, tellus eu venenatis venenatis, diam enim suscipit lectus, 
              sit amet fringilla nisi turpis sit amet dolor.
            </p>
            
            <div className="border-t border-gc-gray pt-4 mt-4">
              <h4 className="font-semibold mb-2">Technical Specifications</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Feature one with technical details</li>
                <li>Feature two with compliance standards</li>
                <li>Feature three with requirements</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Side Chat (this one is always present) */}
        <SideChatInterface />
        
        {/* Variation 3: Side Panel Chat */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gc-blue">3. Side Panel Chat</h2>
          <p className="mb-4">
            The side panel chat slides in from the edge of the screen. This is useful for 
            persistent chat assistance that doesn&apos;t interfere with the main content.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow border border-gc-gray">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-gc-blue mb-4">Need assistance with this page?</h3>
              <p className="mb-6">
                Click the chat button in the bottom right corner to get help from our assistant.
              </p>
              
              <div className="flex justify-center">
                <button className="bg-gc-blue hover:bg-gc-link text-white font-medium py-2 px-4 rounded-md transition-colors">
                  Show me an example
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gc-nav flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gc-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                For a complete experience with both left sidebar and right chat panel, visit our full dashboard demo.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Canada.ca footer */}
      <footer className="bg-gc-blue text-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Contact information</a></li>
                <li><a href="#" className="hover:underline">Find a person</a></li>
                <li><a href="#" className="hover:underline">Find an office</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">News</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">News releases</a></li>
                <li><a href="#" className="hover:underline">Media advisories</a></li>
                <li><a href="#" className="hover:underline">Multimedia</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Government</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">All contacts</a></li>
                <li><a href="#" className="hover:underline">Departments and agencies</a></li>
                <li><a href="#" className="hover:underline">About government</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-sm">
            <p className="mb-2">© His Majesty the King in Right of Canada, as represented by the Minister of Employment and Social Development Canada</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a href="#" className="hover:underline">Terms &amp; conditions</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 