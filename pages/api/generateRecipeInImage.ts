import { PromptQuery } from "@/types/promptQuery";
import { NextApiRequest, NextApiResponse } from "next";
import { Image } from "openai/resources/index.mjs";

const generatePromptForImageRecipe = (prompt: PromptQuery) => {
    let generatedPrompt = '';
    if (!prompt || !prompt.keyWords) {
        throw new Error("Prompt cannot be empty.");
    } else {
        generatedPrompt = `I want an image of one or more recipes related to these keywords： ${prompt.keyWords}.`;
    }
    return generatedPrompt;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ data: Image | undefined } | { error: string }>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const messages = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    try {
        res.write(`data: Initiating image generation...\n\n`);
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: generatePromptForImageRecipe(messages),
                n: 1,
                size: "1024x1024",
            }),
        });

        if (!response.ok) {
            res.write(`data: Error: Failed to generate image.\n\n`);
            res.end();
            return;
        }

        const json = await response.json();
        const imageUrl = json.data[0].url;
        res.write(`data: Image generation in progress...\n\n`);
        for (let i = 0; i < 3; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            res.write(`data: Progress ${((i + 1) * 33)}%\n\n`);
        }
        res.write(`data: Generated! ${imageUrl}\n\n`);
        res.write('data: DONE\n\n');
        res.end();
    } catch (error: unknown) {
        console.error(error);
        res.write(`data: Error!\n\n`);
        res.end();
    }
}
