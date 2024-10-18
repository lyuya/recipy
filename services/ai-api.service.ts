import { generateTextGemini } from "./gemini.service";
import { generateTextOpenAI } from "./openAI.service";

const generatePromptForTextRecipe = (prompt: string) => {
	let generatedPrompt = "";
	if (!prompt || !prompt) {
		throw new Error("Prompt cannot be empty.");
	} else {
		generatedPrompt = `Provide me with some recipes related to these keywords： ${prompt}. `;
	}
	return generatedPrompt;
};

const API_PROVIDER = {
	GEMINI: generateTextGemini,
	OPENAI: generateTextOpenAI,
};

const generateText = (prompt: string, apiProvider: "GEMINI" | "OPENAI") => {
	const generatedPrompt = generatePromptForTextRecipe(prompt);
	return API_PROVIDER[apiProvider](generatedPrompt);
};

export { generateText };
