import Hero from "@/components/home/Hero"
import PopularGames from "@/components/home/PopularGames"
import GallerySlider from "@/components/GallerySlider"

export default function Home() {
	return (
		<main className="w-full">
			<Hero />
			<PopularGames />
			<GallerySlider />
		</main>
	)
}
