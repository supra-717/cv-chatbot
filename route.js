
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: "You are a chatbot that only answers questions about Supratik Saha’s professional background, experience, skills, and accomplishments." },
          ...messages
        ],
      }),
    });

    const data = await completion.json();

    return new Response(JSON.stringify({ reply: data.choices?.[0]?.message?.content || 'Sorry, something went wrong.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
