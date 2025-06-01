
'use client';
import { useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Supratik's AI assistant. Ask me anything about his profile." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <main className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Ask Me About Supratik Saha</h1>
      <div className="w-full max-w-2xl bg-white p-4 rounded shadow space-y-4 max-h-[500px] overflow-y-auto">
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === "user" ? "text-right" : "text-left text-blue-800"}>
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && <p className="italic">Thinking...</p>}
      </div>
      <div className="flex w-full max-w-2xl mt-4 space-x-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Ask something..." />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </main>
  );
}
