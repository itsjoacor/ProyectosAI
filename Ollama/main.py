from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from vector import retriever
import os



#Importo el modelo instalado de ollama - cmd version
model = OllamaLLM(model="Gemma2")

#especificar lo que quiero que me responda con un template
TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "template.txt")
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    template = f.read()


#
prompt = ChatPromptTemplate.from_template(template)

#nos permite combinar diferentes cosas para correr en la LLM
chain = prompt | model

#le tengo que pasar las variables numbers question.
history= ""
while True:
    print("########################### Hey There i´m Ollama (Gemma2) im here to answer your questions ###########################################")
    question = input("Type your question or press q to quit: ")

    if question.upper() == "Q":
        print("See you later!")
        break


    subject = retriever.invoke(question)
    result = chain.invoke({"subject": subject, "question": question, "history": history})
    print(result)
    history +=  f"\nUser:{question}\nAI:{result}"
