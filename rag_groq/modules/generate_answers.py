import json
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain.schema import Document
from tqdm import tqdm
from modules.rag_pipeline import load_qa_chain
from PyPDF2 import PdfReader


def extract_text_from_pdf(pdf_path):
    """
    Extracts and returns all text from a PDF file.

    Args:
        pdf_path (str): Path to the PDF file.

    Returns:
        str: Combined text from all pages of the PDF.
    """
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    return full_text


def run_rag_pipeline(pdf_path=None, question="", output_path=None, guideline_index_path="guideline_index"):
    """
    Runs a Retrieval-Augmented Generation (RAG) pipeline using guidelines as context only.
    The patient PDF is used as input, not merged into the vectorstore.

    Args:
        pdf_path (str or None): Path to the patient exam PDF.
        question (str): The user's question (can be auto-generated from PDF).
        output_path (str or None): Path to save the result as JSON.
        guideline_index_path (str): Directory with the prebuilt FAISS index (guidelines only).

    Returns:
        dict: Dictionary with the question, generated answer, and source contexts.
    """
    print("📥 Loading guideline vectorstore...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    guideline_vs = FAISS.load_local(
        guideline_index_path,
        embeddings,
        allow_dangerous_deserialization=True
    )

    # 🧾 If a patient PDF is provided, use its content to enrich the question
    if pdf_path:
        print("📄 Extracting text from uploaded PDF...")
        patient_text = extract_text_from_pdf(pdf_path)
        # Build a meaningful question using the exam data
        question = (
            f"The following are results from a patient's medical report:\n\n"
            f"{patient_text[:2000]}\n\n"
            "Based on the guidelines, what do these results mean? "
            "Reply in **no more than 3 short sentences**, be concise."
        )

    print("🤖 Running QA chain with guideline context only...")
    qa_chain = load_qa_chain(guideline_vs)
    response = qa_chain.invoke({"query": question})

    result = {
        "question": question,
        "answer": response["result"],
        "contexts": [doc.page_content for doc in response["source_documents"]]
    }

    if output_path:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=4, ensure_ascii=False)
        print(f"✅ Saved result to: {output_path}")
    else:
        print(json.dumps(result, indent=4, ensure_ascii=False))

    return result
