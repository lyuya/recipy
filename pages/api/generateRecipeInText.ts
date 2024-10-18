import { generateText } from "@/services/ai-api.service";
import { PromptQuery } from "@/types/promptQuery";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ data: string | null } | { error: string }>,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}
	const messages: PromptQuery = req.body;
	let response;

	const apiProvider = process.env.AI_API;
	if (apiProvider === "GEMINI" || apiProvider === "OPENAI") {
		try {
			response = await generateText(messages.keyWords, apiProvider);
			if (response !== undefined) {
				return res.status(200).json({ data: response });
			} else {
				throw Error("No data returned.");
			}
		} catch (error: unknown) {
			console.error("Error:", error);
			return res.json({ error: "An error occurred" });
		}
	} else {
		console.error(
			"Error:",
			"set an environment variable AI_API to choose an AI API and set correctly an API key.",
		);
		return res.json({
			error:
				"An error occurred: set an environment variable AI_API to choose an AI API.",
		});
	}
}
