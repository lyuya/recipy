import { generateText } from "@/services/openAI.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const messages = req.body;
    let response;
    try {
        response = await generateText(messages);
    } catch (error: any) {
        console.error('Error:', error.response.message);
        return res.json({ error: 'An error occurred' });
    }

    try {
        const data = await response;
        return res.status(200).json({ data });
    } catch (error: any) {
        console.error('Error:', error.response.message);
        return res.json({ error: 'An error occurred' });
    }
}
