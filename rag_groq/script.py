from modules.ingest import build_vectorstore_from_pdf

build_vectorstore_from_pdf("docs/data.pdf", output_dir="guideline_index")
