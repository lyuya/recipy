import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not defined.")
}

const openai = new OpenAI({ apiKey});

const generateTextOpenAI = async (prompt: string) => {
    const messageParams: ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant that provides some detailed cooking recipes with the given ingredients." },
        { role: "user", content: prompt },
    ];
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 800,
        messages: messageParams,
    });

    return response.choices[0].message.content;
}

export { generateTextOpenAI }