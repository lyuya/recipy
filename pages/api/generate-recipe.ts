import { PromptQuery } from "@/types/promptQuery";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";




const openAIConfig = {
    apiKey: process.env.OPENAI_API_KEY
};

const openai = new OpenAI(openAIConfig);

const generateText = async (prompt: PromptQuery) => {
    let generatedPrompt = '';
    if (!prompt || !prompt.ingredients) {
        return 'Tell me what ingredients do you want to cook ?';
    } else {
        generatedPrompt = `Provide a detailed cooking recipe for only these ingredients: ${prompt.ingredients}. `;
        if (prompt.cusine) {
            generatedPrompt = generatedPrompt + `with ${prompt.cusine} style. `
        }
        if (prompt.dietPref) {
            generatedPrompt = generatedPrompt + `It will be great if the recipe is ${prompt.dietPref}`
        }
    }
    const messageParams: ChatCompletionMessageParam[] = [
        { role: "system", content: "You are a helpful assistant that provides some detailed cooking recipes with the given ingredients." },
        { role: "user", content: generatedPrompt },
      ];
      console.log("messageParams : ", messageParams)
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 800,
        messages: messageParams,
    });

    return response.choices[0].message.content;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    // test
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const messages = req.body;
    let response;
    try {
        response = await generateText(messages);
    } catch (error: any) {
        console.error('Error:', error.response.message);
        return res.json({ error: 'An error occurred'});
    }

    try {
        const data = await response;
        return res.status(200).json({ data });
    } catch (error: any) {
        console.error('Error:', error.response.message);
        return res.json({ error: 'An error occurred' });
    }
}
