import { PromptQuery } from "@/types/promptQuery";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generateTextGemini = async (promptQuery: PromptQuery) => {
    const apiKey = process.env.GEMINI_API_KEY
    if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = promptQuery
        const res = await model.generateContent(prompt.keyWords);
        return res.response.text();
    }
}

export { generateTextGemini }