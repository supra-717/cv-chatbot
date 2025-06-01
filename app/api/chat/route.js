
export async function POST(req) {
  const { messages } = await req.json();
  const systemPrompt = "You are an AI assistant trained to answer questions about Supratik Saha. Only answer based on Supratik’s career, projects, experiences, and achievements.";

  const chatMessages = [
    { role: "system", content: systemPrompt },
    ...messages
  ];

  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: chatMessages
    })
  });

  const data = await completion.json();
  return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
