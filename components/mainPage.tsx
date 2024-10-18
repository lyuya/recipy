import React, { useState } from "react";
import Typewriter from "./typewriter";
import { PromptQuery } from "@/types/promptQuery";
import SearchBar from "./searchBar";
import { getRecipes } from "@/services/client.service";

export default function MainPage() {
	const [recipe, setRecipe] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const fetchRecipeInText = async (keyWords: string) => {
		setRecipe("");
		setLoading(true);
		const prompt: PromptQuery = { keyWords };
		try {
			const data = await getRecipes(prompt);
			setRecipe(data.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<>
			<div id="search" className="relative">
				<div className="h-full">
					<section className="h-full flex justify-center">
						<div className="p-6 w-4/5 overflow-auto leading-5 bg-white/50">
							{loading && <div className="typing-loader"></div>}
							{recipe.length > 0 && <Typewriter text={recipe}></Typewriter>}
							{!(loading || recipe.length > 0) && (
								<div>
									Tell me what ingredients do you want to cook, what kind of
									dish do you prefer, which ingredient do you want to avoid,
									etc.
								</div>
							)}
						</div>
					</section>
				</div>
			</div>
			<SearchBar
				onSearchInText={async (keywords) => await fetchRecipeInText(keywords)}
			></SearchBar>
		</>
	);
}
