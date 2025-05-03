from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import requests
import os


def get_headphones_data():
    try:
        response = requests.get("http://127.0.0.1:8000/headphones", timeout=5)
        response.raise_for_status()
        products = response.json()
        return "\n".join([
            f"{p['title']} - ${p['price']} - {p['features']}"
            for p in products
        ])
    except Exception as e:
        return f"Error fetching headphone data: {e}"



TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "template.txt")
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    template = f.read()

model = OllamaLLM(model="Gemma2")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def handle_conversation():
    chat_history = ""
    headphone_data = get_headphones_data()

    print("Hello! Ask me anything about headphones. Type Q to quit.")
    while True:
        user_input = input("Your question: ")
        if user_input.strip().upper() == "Q":
            print("Goodbye!")
            break

        result = chain.invoke({
            "chat_history": chat_history,
            "headphone_data": headphone_data,
            "user_input": user_input
        })

        print("Bot:", result)
        chat_history += f"\nUser: {user_input}\nAI: {result}"

if __name__ == "__main__":
    handle_conversation()
