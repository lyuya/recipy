
import { generateTextGemini } from "@/services/gemini.service";
import { generateTextOpenAI } from "@/services/openAI.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ data: string | null } | { error: string }>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const messages = req.body;
    let response;
    if (process.env.AI_API === "GEMINI") {
        try {
            response = await generateTextGemini(messages);
        } catch (error: unknown) {
            console.error('Error:', error);
            return res.json({ error: 'An error occurred' });
        }
    } else if (process.env.AI_API === "OPENAI") {
        try {
            response = await generateTextOpenAI(messages);
        } catch (error: unknown) {
            console.error('Error:', error);
            return res.json({ error: 'An error occurred' });
        }
    } else {
        console.error('Error:', 'set an environment variable AI_API to choose an AI API and set correctly an API key.');
        return res.json({ error: 'An error occurred: set an environment variable AI_API to choose an AI API.' });
    }

    try {
        const data = await response;
        if (data !== undefined) {
            return res.status(200).json({ data });
        } else {

        }
    } catch (error: unknown) {
        console.error('Error:', error);
        return res.json({ error: 'An error occurred' });
    }
}
