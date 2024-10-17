import { useState } from "react";
interface SearchBarProps {
    onSearchInText: (keyWords: string) => void,
    onSearchImage: (keyWords: string) => void,
}
export default function SearchBar({ onSearchInText, onSearchImage }: SearchBarProps) {
    const [keyWordsToSearch, setKeyWordsToSearch] = useState<string>('');

    return (
        <div className="mt-4 bg-transparent w-full flex justify-center sticky bottom-10">
            <div className="w-3/5">
                <div className="inline-flex w-full border border-4 border-black rounded-md h-12 px-3 py-1 bg-white shadow-lg">
                    <input className="w-full h-full appearance-none  focus:outline-none focus:bg-transparent bg-transparent"
                        placeholder="type your ingredients here..."
                        value={keyWordsToSearch}
                        onChange={(e) => setKeyWordsToSearch(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.code == 'Enter') {
                                onSearchInText(keyWordsToSearch)
                            }
                        }}
                    ></input>
                    <div className="flex gap-2">
                        <button className="hover:scale-125 ease-out	duration-300" onClick={() => onSearchInText(keyWordsToSearch)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                        <button className="hover:scale-125 ease-out	duration-300" onClick={() => onSearchImage(keyWordsToSearch)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </button>                        
                    </div>

                </div>
            </div>
        </div>
    );
}