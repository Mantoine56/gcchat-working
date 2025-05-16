# GC Chat Improvement Plan for PSES Dataset Integration

This document outlines the implementation plan for enhancing the GC Chat application to better handle the 11-million row PSES dataset (800MB). The plan focuses on three key improvement areas:

1. CSV Handling & Processing Optimizations ✅
2. LangChain Integration for RAG ✅
3. Streaming Responses ✅

**Status Update (May 14, 2025)**: Implementation complete! All three key areas have been implemented successfully. The application now supports both Travel and PSES datasets with streaming responses using LangChain.

## 1. CSV Handling & Processing Optimizations

### Initial Setup & Data Preparation
- [x] Create a new Python script `process_pses_data.py` for handling the large CSV
- [x] Implement csv chunking with optimal chunk size (2000 chars) and overlap (500 chars)
- [x] Add proper logging to track processing progress
- [x] Store pre-chunked data as JSONL for faster reuse

### Multiprocessing & Performance
- [x] Implement multiprocessing for parallel embedding generation
- [x] Add progress tracking for the embedding process
- [x] Create checkpointing to allow resuming interrupted processes
- [x] Optimize memory usage with batch processing

### Vector Storage Integration
- [x] Implement FAISS index creation for PSES data
- [x] Add versioning for FAISS indexes
- [x] Create a metadata storage system for chunks
- [x] Implement periodic index refresh capability

### Additional Improvements
- [x] Added a sample processing script `process_pses_sample.py` for faster testing
- [x] Fixed bug in the text splitter implementation (changed `split_texts` to `split_text`)
- [x] Added detailed error handling and recovery mechanisms

### Python Script Example:
```python
import multiprocessing as mp
import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
import json
import os

def process_pses_csv(csv_path, output_dir):
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Read CSV in chunks to handle large file
    chunks = []
    for df_chunk in pd.read_csv(csv_path, chunksize=10000):
        # Process each row in the chunk
        for _, row in df_chunk.iterrows():
            # Convert row to text
            text = " ".join([f"{col}: {val}" for col, val in row.items()])
            chunks.append(text)
    
    # Split text into smaller chunks for embedding
    splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
    text_chunks = splitter.split_texts(chunks)
    
    # Save chunks to JSONL for reuse
    with open(os.path.join(output_dir, "pses_chunks.jsonl"), "w") as f:
        for chunk in text_chunks:
            f.write(json.dumps({"text": chunk}) + "\n")
    
    return text_chunks

def embed_chunk(chunk):
    # Placeholder for embedding function
    # Will be replaced with actual embedding code
    pass

def generate_embeddings(chunks, output_dir):
    # Use multiprocessing to speed up embedding generation
    with mp.Pool() as p:
        vectors = p.map(embed_chunk, chunks)
    
    # Save vectors to disk
    # Will be replaced with FAISS index creation
    return vectors

if __name__ == "__main__":
    chunks = process_pses_csv("path/to/pses_data.csv", "data/pses")
    generate_embeddings(chunks, "data/pses")
```

## 2. LangChain Integration for RAG

### LangChain Setup
- [x] Install LangChain: `npm install langchain @langchain/openai @langchain/community`
- [x] Create base LangChain configuration files
- [x] Define environment variables for LangChain

### Vector Store Integration
- [x] Implement FaissStore wrapper for existing FAISS indexes
- [x] Create a unified interface for different datasets
- [x] Add document loading utilities

### RAG Pipeline Implementation
- [x] Replace custom RAG logic with LangChain chains
- [x] Create retrievers for different datasets (Travel, PSES)
- [x] Implement RetrievalQAChain for query answering
- [x] Add prompt templates for dataset-specific instructions

### API Integration
- [x] Update API routes to use LangChain chains
- [x] Ensure proper error handling with LangChain
- [x] Maintain dataset switching functionality
- [x] Add instrumentation for monitoring chain performance

### Additional Improvements
- [x] Implemented fallback mechanism to traditional RAG when LangChain fails
- [x] Added detailed documentation in `services/langchain.ts`
- [x] Created dataset-specific system prompts to improve relevance

### TypeScript Implementation Example:
```typescript
// services/langchain.ts
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { DatasetType } from "../contexts/DatasetContext";
import path from 'path';

// Initialize OpenAI with API key
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Create a LangChain store for each dataset
export async function getVectorStore(dataset: DatasetType) {
  const storePath = dataset === 'travel' 
    ? path.join(process.cwd(), 'data', 'travel', 'faiss_index')
    : path.join(process.cwd(), 'data', 'pses', 'faiss_index');
  
  // Load the appropriate FAISS store
  return await FaissStore.load(storePath, embeddings);
}

// Get dataset-specific retriever
export async function getRetriever(dataset: DatasetType) {
  const store = await getVectorStore(dataset);
  
  return store.asRetriever({
    k: 5, // Number of documents to retrieve
    filter: dataset === 'pses' ? { type: 'pses_data' } : { type: 'travel_data' },
  });
}

// Create QA chain for a specific dataset
export async function createQAChain(dataset: DatasetType) {
  const retriever = await getRetriever(dataset);
  const model = new ChatOpenAI({
    modelName: "gpt-4-turbo",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  
  return RetrievalQAChain.fromLLM(model, retriever);
}
```

## 3. Streaming Responses

### Backend Implementation
- [x] Update API routes to support streaming
- [x] Implement streaming with OpenAI's SDK
- [x] Create appropriate response headers and encodings
- [x] Add error handling for stream interruptions

### Frontend Implementation
- [x] Create a custom hook for consuming streamed responses
- [x] Implement UI for displaying streaming tokens
- [x] Add loading states and progress indicators
- [x] Ensure compatibility with the dataset selector

### Deployment & Testing
- [x] Test streaming with different browsers
- [x] Measure latency improvements
- [x] Ensure streaming works with both datasets
- [x] Add fallback for environments where streaming isn't supported

### Additional Improvements
- [x] Created `hooks/useStreamingChat.ts` to manage streaming state in React
- [x] Added visually appealing typing indicators during streaming
- [x] Maintained original UI while adding streaming functionality

### Implementation Example:
```typescript
// Implemented in our API endpoints
export async function POST(req: Request) {
  const { messages, dataset = 'travel' } = await req.json();
  
  // Set up streaming response
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  
  try {
    // Get the latest user question
    const question = getLatestQuestion(messages);
    
    // Use LangChain's streaming capability
    const langchainStream = await streamingQuery(question, datasetType);
    
    // Process the stream and forward tokens to client
    for await (const chunk of langchainStream) {
      const token = chunk.text || chunk.answer || chunk.content || '';
      await writer.write(encoder.encode(token));
    }
    
    writer.close();
  } catch (error) {
    console.error('Error in streaming:', error);
    const errorMessage = 'An error occurred while generating the response.';
    await writer.write(encoder.encode(errorMessage));
    writer.close();
  }

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}

// Frontend hook (hooks/useStreamingChat.ts)
import { useState, useEffect } from 'react';
import { DatasetType } from '../contexts/DatasetContext';

export function useStreamingChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function streamChat(prompt: string, dataset: DatasetType) {
    setIsStreaming(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: prompt }],
          dataset 
        }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('Response body is null');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialResponse = '';
      
      // Process the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        partialResponse += decoder.decode(value, { stream: true });
        setMessages(prev => [...prev.slice(0, -1), partialResponse]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsStreaming(false);
    }
  }
  
  return { messages, isStreaming, error, streamChat };
}
```

## Implementation Timeline

1. **Week 1: CSV Processing & Data Preparation** 
   - Focus on processing the PSES dataset
   - Set up multiprocessing and chunking
   - Generate and store embeddings

2. **Week 2: LangChain Integration**
   - Install and configure LangChain
   - Migrate RAG pipeline to use LangChain
   - Ensure dataset switching works with LangChain

3. **Week 3: Streaming Implementation**
   - Implement backend streaming
   - Create frontend streaming components
   - Test and optimize the streaming experience

## Success Criteria

- PSES dataset (11M rows) processed successfully with reasonable memory usage
- Query response time under 3 seconds for most queries
- First tokens appear within 300ms with streaming
- Seamless switching between Travel and PSES datasets
- Improved relevance of RAG results

## Dependencies

- OpenAI API key for embeddings and completions
- Node.js 18+ and Python 3.8+
- Sufficient disk space for PSES embeddings (approximately 2-3 GB)
- At least 16GB RAM for processing the PSES dataset
