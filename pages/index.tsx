import Header from "@/components/header";
import MainPage from "@/components/mainPage";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<MainPage />
			</main>
			<footer>
				<div className="flex justify-center text-sm text-zinc-500 p-1">
					Copyright by <a href="https://github.com/lyuya"> Yanan</a>
				</div>
			</footer>
		</>
	);
}
