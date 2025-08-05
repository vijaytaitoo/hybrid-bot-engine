import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askAI(prompt: string): Promise<string> {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    return res.choices[0].message.content || "Нет ответа";
  } catch (err) {
    console.error("AI Error:", err);
    return "Ошибка AI";
  }
} 