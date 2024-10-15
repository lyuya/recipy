import Header from "@/components/header";
import Search from "@/components/search";

export default function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <Search></Search>
      </main>
      <footer>
        <div className="flex justify-center text-sm text-zinc-500 p-1">
          Copyright by <a href="https://github.com/lyuya">Yanan</a>
        </div>
      </footer>
    </>
  );
}
