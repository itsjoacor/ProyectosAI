#va a buscar en una DB vect - local.
#Porque vect -> porque va a buscar de forma vectorizada los datos de forma mas rapida.

#ID,PRODUCT_NAME,DESCRIPTION,STOCK,PRICE,TOTAL_SALES


from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import pandas as pd

data_frame = pd.read_csv("colthing_50_0.csv")
embeddings = OllamaEmbeddings(model="mxbai-embed-large")

db_location = "./chroma_langchain_db"
add_documents = not os.path.exists(db_location)


if add_documents:
    documents = []
    ids = []

    for i, row in data_frame.iterrows():
        document = Document(
            page_content=(
                    str(row["ID"]) + " " +
                    row["PRODUCT_NAME"]
            ),
            metadata={
                "description": row["DESCRIPTION"],
                "stock": row["STOCK"],
                "price": row["PRICE"],
                "total_sales": row["TOTAL_SALES"]

            },
                id=str(i)
        )
        ids.append(str(i))
        documents.append(document)


vector_store = Chroma(
    collection_name = "product-catalog",
    persist_directory=db_location,
    embedding_function=embeddings,
)


if add_documents:
    vector_store.add_documents(documents=documents, ids=ids)

retriever = vector_store.as_retriever(
    search_kwargs={"k": 6}

)


























