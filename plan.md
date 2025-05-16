# MVP RAG (Retrieval Augmented Generation) Plan

This is a sprint-based plan to create an MVP product where the AI chatbot can leverage data from Travel Q Data.csv. The goal is to enable users to ask questions about the CSV data and get relevant answers via a Retrieval Augmented Generation workflow.

## Sprint 1: Data Preparation & Basic Setup

### 1.1 Analyze the CSV
- [x] Load Travel Q Data.csv into a data-analysis tool (Python, Excel, or your choice)
- [x] Inspect columns: which columns are relevant to the chatbot’s queries?
- [x] Identify missing values, duplicates, or data that needs cleaning

### 1.2 Clean & Normalize the CSV
- [x] Remove irrelevant rows or columns
- [x] Handle missing values
- [x] Correct encoding or formatting issues if present
- [x] Save cleaned version of the data

Example Script (Python)

```python
import pandas as pd

df = pd.read_csv("Travel Q Data.csv")
# Basic cleaning
df.drop_duplicates(inplace=True)
df.fillna("", inplace=True)

# Optionally select columns
relevant_columns = ["ColumnA", "ColumnB", "ColumnC"]
df = df[relevant_columns]

# Save cleaned version
df.to_csv("cleaned_travel_q_data.csv", index=False)
```

## Sprint 2: Chunk & Transform Data

### 2.1 Chunking Strategy
- [x] Define optimal chunk size for passages
- [x] Determine chunking approach (per row vs. paragraphs)
- [x] Create chunking specification document

### 2.2 Generate Passages
- [x] Implement passage generation logic
- [x] Create consistent text block format
- [x] Store passages in structured format (JSON/CSV)
- [x] Validate passage quality and consistency

Our chunking approach:
- Each travel record is converted into a single, self-contained passage
- Passages include: Title, Purpose, Destination, Travel Period, Expenses, and Additional Comments
- Format: `Title: {title} | Purpose: {purpose} | Destination: {destination} | Travel Period: {start} to {end} | Expenses: {expenses} | Reference: {ref_number} | Organization: {org}`
- This format ensures all relevant information is preserved while maintaining readability

## Sprint 3: Embeddings & Vector Database

### 3.1 Select an Embedding Model
- [x] Convert text chunks (passages) into numerical vectors
- [x] Selected sentence-transformers (all-MiniLM-L6-v2) for efficient local embedding generation
- [x] Implemented robust embedding pipeline with error handling and logging

### 3.2 Store Vectors in a Vector Database
- [x] Migrated from ChromaDB to FAISS for a more lightweight and efficient approach
- [x] Implemented comprehensive data preparation pipeline
- [x] Added robust error handling and logging
- [x] Created efficient embedding-to-storage workflow

Implementation Highlights:
```python
from sentence_transformers import SentenceTransformer
import faiss

# Initialize model and index
model = SentenceTransformer('all-MiniLM-L6-v2')
dimension = model.get_sentence_embedding_dimension()
index = faiss.IndexFlatL2(dimension)

# Generate and store embeddings
for passage in passages:
    embedding = model.encode(passage).astype('float32')
    index.add(embedding.reshape(1, -1))

# Save for persistence
faiss.write_index(index, "travel_data.index")
```

## Sprint 4: Retrieval Endpoint & Next.js Integration

### 4.1 Create a Retrieval Function
- [x] Implemented semantic search using FAISS and sentence-transformers
- [x] Added percentage match scores for better result interpretation
- [x] Enhanced passage format to include traveler names and better formatting
- [x] Improved data cleaning and handling of empty values

### 4.2 Combine Retrieved Passages with the User's Prompt
- [x] Created efficient RAG service without server dependencies
- [x] Modified chat API route to use new search system
- [x] Enhanced system prompt with well-formatted context
- [x] Removed ChromaDB server dependency for simpler deployment

### 4.3 Testing & Integration
- [x] Test Python script independently
- [x] Test Node.js integration
- [x] Test end-to-end functionality
- [x] Fix frontend to LM Studio connectivity issues
- [x] Validate search result quality and relevance

## Sprint 5: Optimization & Deployment

### 5.1 Performance Improvements
- [ ] Implement caching for frequent queries
- [ ] Add batch processing for multiple queries
- [ ] Optimize Python script execution
- [ ] Profile and optimize memory usage

### 5.2 Error Handling & Logging
- [x] Add comprehensive error handling in chat route
- [x] Implement logging for Python script
- [x] Add fallback behavior for failed searches
- [x] Improve error messages and debugging

### 5.3 User Experience Enhancements
- [x] Improve context formatting in responses
- [ ] Add loading states for search operations
- [ ] Add confidence scores to responses
- [ ] Implement feedback mechanism for search quality
- [ ] Add pagination for long search results
- [ ] Implement response caching for identical queries

### 5.4 Documentation & Maintenance
- [ ] Create comprehensive API documentation
- [ ] Document system architecture and components
- [ ] Create maintenance and troubleshooting guide
- [ ] Add monitoring and alerting
- [ ] Document response formatting guidelines
- [ ] Create user guide with example queries

### Next Steps
1. Implement response caching system for better performance
2. Add user feedback mechanism for result quality
3. Optimize Python script execution time
4. Enhance monitoring and logging
5. Add pagination for search results
6. Create comprehensive documentation
7. Implement automated testing
8. Add response quality metrics

## Completed Milestones
- [x] Migrated from ChromaDB to FAISS
- [x] Implemented efficient search system
- [x] Created robust data pipeline
- [x] Fixed frontend connectivity issues
- [x] Enhanced error handling and logging
- [x] Improved context formatting
- [x] Added match score indicators
- [x] Removed server dependencies
- [x] Enhanced response readability
- [x] Implemented natural language formatting
- [x] Added clear system prompts

## Current System Architecture

### Components
1. **Frontend**: Next.js application with chat interface
2. **Backend**: 
   - Next.js API routes for chat handling
   - Python script for FAISS-based search
   - LM Studio for text generation
3. **Data Storage**:
   - FAISS index for vector search
   - Preprocessed passages in structured format

### Data Flow
1. User sends question via chat interface
2. Chat API extracts latest question
3. Python script performs FAISS search
4. Results enhanced with match scores
5. Context added to chat messages
6. Enhanced prompt sent to LM Studio
7. Response returned to user

### Key Features
- Efficient vector search with FAISS
- Match score indicators for relevance
- Robust error handling and fallbacks
- Lightweight deployment without extra servers
- Clear and informative system prompts

## Technical Stack
- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, Python
- **Vector Search**: FAISS, sentence-transformers
- **LLM**: LM Studio (local model)
- **Data Processing**: pandas, numpy
- **Development**: npm, pip