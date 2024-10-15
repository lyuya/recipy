import React, { useState } from 'react';
import Typewriter from "./typewriter";
import { PromptQuery } from "@/types/promptQuery";

export default function Search() {
    const [recipe, setRecipe] = useState<string>('');
    // const [loading, setLoading] = useState<boolean>(false);
    const [ingredientToSearch, setIngredientToSearch] = useState<string>('');
    const fetchRecipe = async () => {
        // setLoading(true);
        const prompt: PromptQuery = {
            ingredients: ingredientToSearch,
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
        // setLoading(false);
    }
    return (
        <>
            <div className="absolute bottom-8 bg-transparent w-full flex justify-center">
                <div className="w-4/5">
                    <div className="inline-flex w-full border border-4 border-black rounded-md h-12 px-3 py-1 bg-white">
                        <input className="w-full h-full appearance-none  focus:outline-none focus:bg-white "
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
            <div id="search" className="relative">

                <div className="h-full">
                    <section className="h-full flex justify-center">
                        <div className="border border-4 border-black rounded-2xl bg-neutral-100/80 my-8 p-6 w-4/5 overflow-auto">
                            <p>
                                <Typewriter delay={50} text={recipe}>
                                </Typewriter>

                            </p>
                        </div>

                    </section>
                </div>
            </div>
        </>

    )
}