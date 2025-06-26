# modules/rag_pipeline.py

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_groq import ChatGroq
from dotenv import load_dotenv


def create_faiss_index_from_text(text):
    from langchain.schema import Document
    from langchain.text_splitter import RecursiveCharacterTextSplitter

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = splitter.split_documents([Document(page_content=text)])

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return FAISS.from_documents(docs, embeddings)


def load_qa_chain(vectorstore):
    """Loads the RetrievalQA chain using Groq (LLaMA3)."""
    load_dotenv()  # Required to get GROQ_API_KEY from environment

    llm = ChatGroq(
        temperature=0.0,
        model_name="llama3-8b-8192"
    )

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})

    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True
    )
