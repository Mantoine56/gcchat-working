# myGC Assistant

This repository provides an AI assistant template with Retrieval Augmented Generation (RAG) capabilities for the Government of Canada. Built with Next.js, TypeScript, and following Canada.ca design standards, it's designed to be a secure, accessible, and bilingual conversational interface that can leverage custom datasets.

## Table of Contents
- [myGC Assistant](#mygc-assistant)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Local Development Setup](#local-development-setup)
  - [How It Works](#how-it-works)
  - [Environment Variables](#environment-variables)
  - [Security Considerations](#security-considerations)
  - [Customizing Datasets](#customizing-datasets)
  - [UI Variations](#ui-variations)
  - [Accessibility](#accessibility)
  - [License](#license)

## Overview
* **Framework**: Next.js
* **Language**: TypeScript (frontend, API)
* **Core Functionality**: Conversational AI with RAG capabilities
* **Styling**: Tailwind CSS with Canada.ca design tokens
* **AI Integration**: Designed to work with OpenAI APIs for embeddings and chat completions
* **Security**: Implements secure coding practices and proper data handling

## Features
* **Multiple Chat Interface Variations**: 
  * Side panel for persistent chat assistance
  * Inline chat for embedding within content
  * Lightbox/modal chat for overlay experiences
* **RAG Pipeline**: Retrieves relevant context from custom datasets to augment LLM responses
* **Dataset Management**:
  * Supports multiple government datasets
  * UI component for switching between active datasets
* **Streaming API**: Streams responses from the LLM for a better user experience
* **Canada.ca Design Compliance**: Follows Government of Canada web design standards
* **Security Features**:
  * Input validation and sanitization
  * Locked dependency versions
  * Secure environment variable handling
  * Data access controls
* **Accessibility**: Designed with WCAG 2.1 compliance in mind

## Project Structure

```
.
├── app/                     // Next.js app directory
│   ├── chat-demo/           // Chat UI demonstrations page
│   ├── dashboard/           // Dashboard page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             // Main landing page
├── components/              // React components
│   ├── ui/                  // Generic UI elements
│   ├── ChatInput.tsx        // User input component
│   ├── ChatInterface.tsx    // Main chat interface
│   ├── ChatMessage.tsx      // Message display component
│   ├── ChatSidebar.tsx      // Sidebar navigation
│   ├── DemoDatasetSelector.tsx // Dataset selection UI
│   ├── InlineChatInterface.tsx // Inline chat variation
│   ├── LightboxChatInterface.tsx // Modal chat variation
│   └── SideChatInterface.tsx // Side panel chat variation
├── contexts/                // React contexts
│   └── DatasetContext.tsx   // Dataset selection context
├── docs/                    // Documentation
│   └── security_improvements.md // Security audit findings
├── hooks/                   // Custom React hooks
│   └── useStreamingChat.ts  // Chat streaming functionality
├── public/                  // Static assets
├── services/                // Backend services (when implemented)
├── .env.example             // Template for environment variables
├── .gitignore               // Files excluded from version control
├── next.config.ts           // Next.js configuration
├── tailwind.config.ts       // Tailwind CSS configuration
└── package.json             // Dependencies and scripts
```

**Key Components:**
* **Chat Interfaces**: Three different chat UI implementations for various use cases
* **Dataset Context**: Manages which dataset is currently active
* **Hooks**: Custom hooks for streaming chat functionality
* **Documentation**: Includes security findings and implementation guides

## Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/mygc-assistant.git
   cd mygc-assistant
   ```

2. **Set Up Environment Variables**
   * Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   * Edit `.env.local` and add your `OPENAI_API_KEY` and any other required variables.

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Your application should be available at `http://localhost:3000`.

## How It Works

1. **User Sends a Message**: The user enters a question via one of the chat interfaces.
2. **Front-end Processing**: Currently, responses are simulated in the frontend for demo purposes.
3. **Future RAG Implementation**:
   * The API will query appropriate vector stores based on the user's message
   * Relevant context will be retrieved from government datasets
   * The context will be combined with the user's message to create an enhanced prompt
   * The augmented prompt will be sent to the LLM
   * Responses will be streamed back to the chat interface

## Environment Variables

Create a `.env.local` file by copying `.env.example` and fill in the necessary values:

* `OPENAI_API_KEY`: **Required**. Your API key for OpenAI services.
* `NODE_ENV`: Set to "development" for local development or "production" for production.

For a complete list of environment variables, see the `.env.example` file.

## Security Considerations

This project implements several security best practices:

1. **Dependency Management**:
   * All dependencies are locked to specific versions to prevent security vulnerabilities
   * Regular updates and security scans are recommended

2. **Environment Variables**:
   * Sensitive configuration is managed through environment variables
   * `.env.local` is excluded from Git to prevent credential leakage

3. **Input Validation**:
   * All user inputs should be validated and sanitized
   * ReactMarkdown is used to safely render markdown content

4. **API Security** (when implemented):
   * Authenticate and authorize API requests
   * Implement rate limiting
   * Use CSRF protection for state-changing operations

5. **Data Handling**:
   * Filter sensitive information before client-side exposure
   * Properly anonymize PII/PHI in datasets
   * Implement access controls for different data sources

For a comprehensive list of security considerations, refer to the [Security Improvements](docs/security_improvements.md) document.

## Customizing Datasets

The template supports multiple datasets that can be integrated for RAG functionality:

1. **Data Processing**:
   * Place raw data in an appropriate storage location
   * Process and convert data to embeddings
   * Create vector stores from the embeddings

2. **Dataset Integration**:
   * Update the `DatasetContext.tsx` to include your new dataset
   * Configure the appropriate vector store in the services layer

3. **UI Configuration**:
   * The `DemoDatasetSelector` component allows users to switch between available datasets

## UI Variations

This template provides three different chat interface implementations:

1. **Side Panel Chat** (`SideChatInterface.tsx`):
   * Slides in from the edge of the screen
   * Ideal for persistent chat assistance across multiple pages

2. **Inline Chat** (`InlineChatInterface.tsx`):
   * Embedded directly within page content
   * Best for dedicated help sections or knowledge base pages

3. **Lightbox Chat** (`LightboxChatInterface.tsx`):
   * Displays in a modal overlay
   * Useful for providing assistance without navigating away from current content

All variations maintain consistent branding, accessibility, and bilingual support.

## Accessibility

The interface is designed with accessibility in mind:

* Proper heading hierarchy
* Keyboard navigation support
* Screen reader compatibility
* Sufficient color contrast
* Focus management

Continuous testing is recommended to ensure WCAG 2.1 compliance.

## License

This project is not yet licensed. Consider adding an appropriate open-source license if you plan to distribute it.

---

For questions or feedback, please open an issue or contact the development team.