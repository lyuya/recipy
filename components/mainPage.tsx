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
            <div id="search" className="h-full flex justify-center">
                <div className="m-3 p-6 w-4/5 overflow-auto leading-5 bg-white/50">
                    {loading && <div className="typing-loader"></div>}
                    {recipe.length > 0 && <Typewriter text={recipe}></Typewriter>}
                    {!(loading || recipe.length > 0) && (
                        <div className="h-full content-center font-mono font-bold px-5 text-center">
                            Tell us what ingredients you want to cook with, your preferred type of dish, any ingredients you want to avoid, and more!
                        </div>
                    )}
                </div>
            </div>
            <SearchBar
                onSearchInText={async (keywords) => await fetchRecipeInText(keywords)}
            ></SearchBar>
        </>
    );
}
