import React, { useState } from 'react';
import Typewriter from "./typewriter";
import { PromptQuery } from "@/types/promptQuery";
import SearchBar from './searchBar';

export default function MainPage() {
    const [recipe, setRecipe] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const fetchRecipeInText = async (keyWords: string) => {
        setRecipe('');
        setImageUrl('');
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
        setImageUrl('');
        setLoading(true);
        const prompt: PromptQuery = { keyWords }
        const response = await fetch('/api/generateRecipeInImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
        });

        if (!response.ok) {
            console.error("An error occured !")
            setLoading(false);
            return;
        }


        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        let imageGenerated = false;

        while (!done) {
            const { value, done: readerDone } = await reader?.read()!;
            done = readerDone;
            const chunkValue = decoder.decode(value, { stream: true });
            const resArray = chunkValue.split('\n\n');
            const resWithImageUrl = resArray.find(res => res.includes('Generated!'));
            if (resWithImageUrl) {
                const url = resWithImageUrl.split(' ')[2]; // Extract the URL from the message
                setImageUrl(url);
                imageGenerated = true;
            }
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
                            {imageUrl && <div className="relative"><img src={imageUrl} /></div>}
                            {recipe.length > 0 && (<Typewriter text={recipe}></Typewriter>)}
                            {!(loading || recipe.length > 0 || imageUrl) && (<div>Tell me what ingredients do you want to cook, what kind of dish do you prefer, which ingredient do you want to avoid, etc.</div>)}
                        </div>
                    </section>
                </div>
            </div>
            <SearchBar onSearchInText={async (keywords) => await fetchRecipeInText(keywords)} onSearchImage={async (keywords) => await fetchRecipeInImage(keywords)}></SearchBar>
        </>
    )
}