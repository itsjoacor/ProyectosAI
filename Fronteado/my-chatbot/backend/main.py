from model_chain import chain, get_headphones_data
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = os.path.join(os.path.dirname(__file__), "headphones.json")

@app.get("/headphones")
def get_headphones():
    if not os.path.exists(DATA_PATH):
        return {"error": "Data file not found."}
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    question = body.get("question", "")
    headphone_data = get_headphones_data()
    response = chain.invoke({
        "chat_history": "",
        "headphone_data": headphone_data,
        "user_input": question
    })
    return {"answer": response}
