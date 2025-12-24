import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg.text })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "bot", text: data.answer }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "❌ Error getting response" }
      ]);
    }

    setLoading(false);
  }

  return (
    <div style={styles.chatBox}>
      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#DCF8C6" : "#F1F0F0"
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && <div style={styles.msg}>🤖 Thinking...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something from the document..."
          style={styles.input}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px"
  },
  messages: {
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "10px",
    height: '50vh',
    overflowY: 'scroll'
  },
  msg: {
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "75%"
  },
  inputBox: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "8px"
  },
  button: {
    padding: "8px 16px",
    cursor: "pointer"
  }
};
