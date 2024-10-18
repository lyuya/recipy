import { PromptQuery } from "@/types/promptQuery";

export const getRecipes = async (prompt : PromptQuery) => {
    const response = await fetch('/api/generateRecipeInText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
    });
    return await response.json();
} 