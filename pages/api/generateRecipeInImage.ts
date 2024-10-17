import { generateImage } from "@/services/openAI.service";
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
        response = await generateImage(messages);
    } catch (error: any) {
        console.error('Error:', error.response);
        throw new Error("An error occurred");
    }

    try {
        const data = await response;
        return res.status(200).json({ data });
    } catch (error: any) {
        console.error('Error:', error.response.message);
        throw new Error("An error occurred")
    }
}
