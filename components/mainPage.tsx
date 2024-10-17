import React, { useState } from 'react';
import Typewriter from "./typewriter";
import { PromptQuery } from "@/types/promptQuery";
import SearchBar from './searchBar';
import { Image as OpenAIImage } from 'openai/resources/images.mjs';
import Image from 'next/image';

export default function MainPage() {
    const [recipe, setRecipe] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [image, SetImage] = useState<OpenAIImage>();
    const fetchRecipeInText = async (keyWords: string) => {
        setRecipe('');
        SetImage(undefined);
        setLoading(true);
        const prompt: PromptQuery = { keyWords }
        const response = await fetch('/api/generateRecipeInText', {
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

    const fetchRecipeInImage = async (keyWords: string) => {
        setRecipe('');
        SetImage(undefined);
        setLoading(true);
        const prompt: PromptQuery = { keyWords }
        try {
            const response = await fetch('/api/generateRecipeInImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prompt),
            });
            const data = await response.json();
            SetImage(data.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <>
            <div id="search" className="relative">
                <div className="h-full">
                    <section className="h-full flex justify-center">
                        <div className="p-6 w-4/5 overflow-auto leading-5 bg-white/50">
                            {loading && (<div className="typing-loader"></div>)}
                            {image && image.url && <div className="relative"><Image alt="dish-image" src={image.url} /></div>}
                            {recipe.length > 0 && (<Typewriter text={recipe}></Typewriter>)}
                            {!(loading || recipe.length > 0 || image) && (<div>Tell me what ingredients do you want to cook, what kind of dish do you prefer, which ingredient do you want to avoid, etc.</div>)}
                        </div>
                    </section>
                </div>
            </div>
            <SearchBar onSearchInText={async (keywords) => await fetchRecipeInText(keywords)} onSearchImage={async (keywords) => await fetchRecipeInImage(keywords)}></SearchBar>
        </>
    )
}