import React, { useState } from 'react';
import Typewriter from "./typewriter";
import { PromptQuery } from "@/types/promptQuery";

export default function Search() {

    const [recipe, setRecipe] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [ingredientToSearch, setIngredientToSearch] = useState<string>('');
    const fetchRecipe = async () => {
        setLoading(true);
        const prompt: PromptQuery = {
            keyWords: ingredientToSearch,
        }
        const response = await fetch('/api/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        });

        const data = await response.json();
        setRecipe(data.data);
        setLoading(false);
    }

    return (
        <>
            <div id="search" className="relative">

                <div className="h-full">
                    <section className="h-full flex justify-center">
                        <div className="rounded-2xl p-6 w-4/5 overflow-auto">
                            {loading ? (<div className="typing-loader"></div>) : recipe.length > 0 ?
                                (<Typewriter text={recipe}>
                                </Typewriter>) : 
                                (<div>Tell me what ingredients do you want to cook, what kind of dish do you prefer, which ingredient do you want to avoid, etc.</div>)
                            }
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-4 bg-transparent w-full flex justify-center sticky bottom-10">
                <div className="w-3/5">
                    <div className="inline-flex w-full border border-4 border-black rounded-md h-12 px-3 py-1 bg-white/80">
                        <input className="w-full h-full appearance-none  focus:outline-none focus:bg-transparent bg-transparent"
                            placeholder="type your ingredients here..."
                            value={ingredientToSearch}
                            onChange={(e) => setIngredientToSearch(e.target.value)}
                        ></input>
                        <button onClick={fetchRecipe}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}