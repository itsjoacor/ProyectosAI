export async function sendQuestion(question) {
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      return data.answer || "No response.";
    } catch (err) {
      return "⚠️ Error reaching the API.";
    }
  }
  