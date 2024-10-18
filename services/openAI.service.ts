import { PromptQuery } from "@/types/promptQuery";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openAIConfig = {
    apiKey: process.env.OPENAI_API_KEY
};

const openai = new OpenAI(openAIConfig);
const generatePromptForTextRecipe = (prompt: PromptQuery) => {
    let generatedPrompt = '';
    if (!prompt || !prompt.keyWords) {
        throw new Error("Prompt cannot be empty.");
    } else {
        generatedPrompt = `Provide me with some recipes related to these keywords： ${prompt.keyWords}. `;
    }
    return generatedPrompt;
};

const generateTextOpenAI = async (prompt: PromptQuery) => {
    const generatedPrompt = generatePromptForTextRecipe(prompt);
    const messageParams: ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant that provides some detailed cooking recipes with the given ingredients." },
        { role: "user", content: generatedPrompt },
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