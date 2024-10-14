import { AutoComplete, Input } from "antd/lib";
import React, { useState } from 'react';

export default function Search() {
const [recipe, setRecipe] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const fetchRecipe = async (prompt: string) => {
    setLoading(true);
    const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setRecipe(data.recipe);
    setLoading(false);
}
    return (
        <div className="relative">
            <div className="flex justify-center">
                <AutoComplete
                    size="large"
                >
                    <Input.Search size="large" placeholder="Give me the ingredients that you have right now !" enterButton onSearch={fetchRecipe}/>
                </AutoComplete>
            </div>
            <div>
                <section>
                    <p>{recipe}</p>
                </section>
            </div>
        </div>
    )
}