export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center text-sm text-zinc-500 p-1">
                © {new Date().getFullYear()} <a href="https://github.com/lyuya">Yanan LYU</a>
            </div>
        </footer>
    )
}