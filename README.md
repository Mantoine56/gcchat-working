# AI Assistant Template

This repository provides a template for building conversational AI assistants with Retrieval Augmented Generation (RAG) capabilities using Next.js, TypeScript, and Python. It's designed to be a starting point for creating chatbots that can leverage custom datasets to provide informed responses.

## Table of Contents
1.  [Overview](#overview)
2.  [Features](#features)
3.  [Project Structure](#project-structure)
4.  [Local Development Setup](#local-development-setup)
5.  [How It Works](#how-it-works)
6.  [Environment Variables](#environment-variables)
7.  [Customizing Datasets](#customizing-datasets)
8.  [License](#license)

## Overview
*   **Framework**: Next.js
*   **Language**: TypeScript (frontend, API), Python (data processing)
*   **Core Functionality**: Conversational AI with RAG.
*   **Styling**: Tailwind CSS
*   **AI Integration**: Designed to work with OpenAI APIs for embeddings and chat completions.

## Features
*   **Chat Interface**: Responsive UI for user interaction.
*   **RAG Pipeline**: Retrieves relevant context from custom datasets to augment LLM responses.
*   **Dataset Management**:
    *   Supports multiple datasets (e.g., ChromaDB, FAISS for vector storage).
    *   Includes example Python scripts for data processing, embedding generation, and indexing.
    *   UI component for switching between active datasets.
*   **Streaming API**: Streams responses from the LLM for a better user experience.
*   **Configurable**: Key aspects like API keys and model names are configurable via environment variables.

## Project Structure

```
.
├── app/                    // Next.js app directory
│   ├── api/                // API routes
│   │   ├── chat/
│   │   │   ├── streaming/route.ts // Streaming chat API with RAG
│   │   │   └── route.ts           // Non-streaming chat API (example)
│   │   └── rag/route.ts         // API for RAG specific tasks (example)
│   ├── chat-demo/          // Chat demo page
│   ├── dashboard/          // Dashboard page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              // Main application page
├── components/             // React components
│   ├── ui/                 // Generic UI elements
│   ├── ChatInput.tsx
│   ├── ChatInterface.tsx
│   ├── ChatMessage.tsx
│   └── DatasetSelector.tsx   // Component to switch datasets
├── contexts/               // React contexts (e.g., DatasetContext)
├── data/                   // Data directory (ignored by git by default)
│   ├── raw/                // Place for raw data files
│   ├── processed/          // Place for processed data and indexes
│   └── pses/faiss_index/   // Example FAISS index location
│   └── chroma_db/          // Example ChromaDB location
├── hooks/                  // Custom React hooks
├── public/                 // Static assets
├── scripts/                // Python scripts for data processing
│   ├── prepare_data.py     // Example: Process travel data, generate embeddings, FAISS index
│   ├── process_pses_data.py// Example: Process PSES data, generate embeddings, FAISS index
│   └── query_travel_data.py// Example: Script to query FAISS index
├── services/               // Backend services (TypeScript)
│   ├── ai.ts               // AI service wrappers
│   ├── langchain.ts        // LangChain integration
│   ├── rag.ts              // RAG specific logic
│   └── custom-vector-store.ts // Custom vector store implementations
├── .env.example            // Example environment variables file
├── next.config.ts
├── tailwind.config.ts
├── requirements.txt        // Python dependencies
└── package.json
```

**Key Areas:**
*   **`app/api/chat/streaming/route.ts`**: Core API for handling user messages, performing RAG, and streaming LLM responses.
*   **`services/rag.ts` & `services/langchain.ts`**: Implement the RAG logic, including context retrieval and LLM interaction.
*   **`scripts/`**: Contains Python scripts for preparing your datasets (cleaning, chunking, embedding, indexing). You will likely adapt these for your own data.
*   **`data/`**: This directory is for your datasets. It's `.gitignore`'d; you'll need to manage your data storage strategy.

## Local Development Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/YourOrg/your-repo-name.git
    cd your-repo-name
    ```

2.  **Set Up Environment Variables**
    *   Copy `.env.example` to `.env.local`:
        ```bash
        cp .env.example .env.local
        ```
    *   Edit `.env.local` and add your `OPENAI_API_KEY` and any other required variables.

3.  **Install Frontend Dependencies**
    ```bash
    npm install
    # or
    # yarn install
    ```

4.  **Set Up Python Environment & Dependencies**
    *   It's recommended to use a virtual environment:
        ```bash
        python3 -m venv venv
        source venv/bin/activate  # On Windows use `venv\Scripts\activate`
        ```
    *   Install Python packages:
        ```bash
        pip install -r requirements.txt
        ```

5.  **Prepare Your Data** (Crucial for RAG)
    *   Place your raw data file(s) in a suitable location (e.g., `data/raw/`).
    *   **Adapt and run the data processing scripts** located in the `scripts/` directory to clean, chunk, embed, and index your data. For example:
        ```bash
        # Example: python scripts/your_data_processing_script.py --input data/raw/my_data.csv --output data/processed/my_data_index
        ```
    *   Ensure the application knows where to find your processed data/indexes (this might involve configuration changes in `services/langchain.ts` or a dedicated dataset configuration file if you implement one). The template provides examples for 'travel' and 'pses' datasets.

6.  **Run the Next.js Development Server**
    ```bash
    npm run dev
    ```
    Your application should be available at `http://localhost:3000`.

## How It Works

1.  **User Sends a Message**: The `ChatInput` component captures the user's message.
2.  **API Request**: The client sends the message to the `/api/chat/streaming` endpoint.
3.  **Context Retrieval (RAG)**:
    *   The API, using services in `services/rag.ts` and `services/langchain.ts`, queries your configured vector store (e.g., FAISS, ChromaDB) based on the user's message to find relevant context from your dataset(s).
4.  **Prompt Augmentation**: The retrieved context is combined with the user's message and system instructions to create an augmented prompt.
5.  **LLM Interaction**: The augmented prompt is sent to the configured LLM (e.g., OpenAI GPT model).
6.  **Streaming Response**: The LLM's response is streamed back to the client and displayed in the `ChatInterface`.

## Environment Variables
Create a `.env.local` file by copying `.env.example` and fill in the necessary values:

*   `OPENAI_API_KEY`: **Required**. Your API key for OpenAI services (used for embeddings and chat completions).
*   _(Add other environment variables specific to your template or commonly needed, e.g., `DB_CONNECTION_STRING`, `MODEL_NAME`, etc.)_

## Customizing Datasets

This template is designed to be flexible with data sources. Here's a general guide:

1.  **Data Ingestion & Processing**:
    *   Place your raw data (CSV, JSON, text files, etc.) into the `data/raw/` directory (or your preferred location).
    *   Adapt the Python scripts in the `scripts/` directory or create new ones to:
        *   Read and clean your data.
        *   Chunk the data into manageable pieces for embedding.
        *   Generate embeddings using a chosen model (e.g., OpenAI's `text-embedding-3-small`).
        *   Create a vector index (e.g., FAISS, ChromaDB) and store it (e.g., in `data/processed/`).
2.  **Service Layer Configuration**:
    *   Update `services/langchain.ts` or related files to:
        *   Point to your new vector index locations and metadata.
        *   Handle the specific structure or querying needs of your dataset.
    *   The `DatasetContext.tsx` and `DatasetSelector.tsx` allow users to switch between datasets. You'll need to update these if you change the available datasets or how they are identified.
3.  **Prompt Engineering**:
    *   Modify the system prompts and context augmentation logic in `services/rag.ts` or `services/langchain.ts` (`getSystemPrompt` function) to best suit your data and the desired behavior of the AI assistant.

## License

This project is not yet licensed. Consider adding an open-source license like MIT or Apache 2.0 if you plan to distribute it.

---

Enjoy building your AI assistant! Feel free to contribute to this template or send feedback.