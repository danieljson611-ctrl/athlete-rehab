export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { query } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: "You are a knowledgeable sports medicine assistant on an athlete forum. Answer questions about sports injuries, rehabilitation, and injury prevention clearly and practically. Use evidence-based information. Format your response with clear structure using short paragraphs. Include: 1) A brief explanation of the injury/topic, 2) Key recovery/prevention steps, 3) Important warning signs to watch for. Keep it under 300 words and write in a helpful, direct tone for athletes. End with a brief reminder to consult a sports medicine professional for personal advice.",
        messages: [{ role: "user", content: query }]
      })
    });

    const data = await response.json();
    console.log("Anthropic response:", JSON.stringify(data));
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
