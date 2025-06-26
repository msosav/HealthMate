# HealthMate RAG (Retrieval-Augmented Generation)

HealthMate RAG is a Retrieval-Augmented Generation (RAG) system designed to answer health-related questions by combining information retrieval with generative AI. It leverages local document indexes and language models to provide accurate, context-aware responses.

## Features
- Ingests and indexes health guidelines and exam documents
- Retrieves relevant context from indexed data
- Generates answers using a language model
- Modular pipeline for easy extension

## Installation
1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd HealthMate
   ```
2. Install dependencies:
   ```powershell
   pip install -r rag_groq/requirements.txt
   ```

## Usage
- To run the main application:
  ```powershell
  python rag_groq/app.py
  ```
- To ingest new documents:
  ```powershell
  python rag_groq/modules/ingest.py
  ```
- To generate answers programmatically:
  ```powershell
  python rag_groq/modules/generate_answers.py
  ```

## Project Structure
```
rag_groq/
  app.py                # Main application entry point
  requirements.txt      # Python dependencies
  script.py             # Utility or script file
  test.ipynb            # Jupyter notebook for testing
  docs/                 # Source documents (PDFs)
  guideline_index/      # FAISS and pickle indexes
  modules/              # Core modules (ingest, pipeline, answer generation)
```

## Requirements
- Python 3.10+
- See `rag_groq/requirements.txt` for package dependencies

## License
[MIT License](LICENSE)
