import { useEffect, useState } from "react";
import Image from 'next/image'

export default function Header() {
    const [navBg, setNavBg] = useState(false);
    const changeNavBg = () => {
        setNavBg(window.scrollY >= 50);
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
          window.removeEventListener('scroll', changeNavBg);
        }
      }, [])
    return (
        <header className={"sticky top-0 z-10 " + (navBg ? "bg-white" : "bg-header")}>
            <div className="flex w-ful justify-center py-2">
                <Image width={80} src="asset/face-1-svgrepo-com.svg" alt="bowl" />
                <div className="flex items-center">
                    <h1 className="text-3xl font-serif font-extrabold text-black">Recipy</h1>
                </div>
            </div>
        </header>
    );
} 