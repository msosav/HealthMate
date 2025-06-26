from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import shutil, os
from uuid import uuid4
from modules.generate_answers import run_rag_pipeline

app = FastAPI()

@app.post("/ask")
async def ask_question(
    pdf: UploadFile = File(...),
    question: str = Form(...),
    save: bool = Form(False)
):
    try:
        file_id = str(uuid4())
        pdf_path = f"temp_{file_id}.pdf"
        output_path = f"answer_{file_id}.json" if save else None

        with open(pdf_path, "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)

        result = run_rag_pipeline(pdf_path, question, output_path=output_path)

        os.remove(pdf_path)
        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
