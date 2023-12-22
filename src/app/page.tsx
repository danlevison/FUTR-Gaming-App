import GallerySlider from "@/components/GallerySlider"
import Hero from "@/components/home/Hero"
import PopularGames from "@/components/home/PopularGames"
import Link from "next/link"

export default function Home() {
	return (
		<main
			className="w-full"
			style={{ width: "calc(100% - 70px)" }}
		>
			<Hero />
			<PopularGames />
			<GallerySlider />
		</main>
	)
}
