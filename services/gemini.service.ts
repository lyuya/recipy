import { GoogleGenerativeAI } from "@google/generative-ai";

const generateTextGemini = async (prompt: string) => {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined.")
    }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const res = await model.generateContent(prompt);
        return res.response.text();
}

export { generateTextGemini }