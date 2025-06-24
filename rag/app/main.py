# app/main.py
from fastapi import FastAPI, Body
from rag.models.phi_model import load_phi_model, generate_with_phi
from rag.rag_retriever import retrieve_context

app = FastAPI()

# Load the Phi model at startup
phi_model = load_phi_model()

@app.post("/rag")
def rag_endpoint(query: str = Body(..., embed=True)):
    context = retrieve_context(query)
    prompt = f"Context: {context}\nQuestion: {query}"
    answer = generate_with_phi(phi_model, prompt)
    return {"answer": answer}
