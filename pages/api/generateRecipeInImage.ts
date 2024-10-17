import { generateImage } from "@/services/openAI.service";
import { NextApiRequest, NextApiResponse } from "next";
import { Image } from "openai/resources/index.mjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ data: Image | undefined} | { error: string }>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const messages = req.body;
    let response;
    try {
        response = await generateImage(messages);
    } catch (error: unknown) {
        console.error('Error:', error);
        throw new Error("An error occurred");
    }

    try {
        const data = await response;
        return res.status(200).json({ data });
    } catch (error: unknown) {
        console.error('Error:', error);
        throw new Error("An error occurred")
    }
}
