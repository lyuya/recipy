import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";




const openAIConfig = {
    apiKey: process.env.OPENAI_API_KEY
};

const openai = new OpenAI(openAIConfig);

const generateText = async (prompt: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        max_tokens: 800,
        messages: [
            { role: "system", content: "You are a helpful assistant that provides detailed cooking recipes." },
            { role: "user", content: `Provide a detailed cooking recipe for: ${prompt}` },
          ],
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
    } catch (error: HttpError) {
        console.error('Error:', error);
        return res.status().json({ error: 'An error occurred'});
    }

    try {
        const data = await response;
        return res.status(200).json({ data });
    } catch (error) {
        console.error('Error:', error);
        return res.json({ error: 'An error occurred' });
    }
}
