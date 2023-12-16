import GallerySlider from "@/components/GallerySlider"
import Hero from "@/components/home/Hero"
import PopularGames from "@/components/home/PopularGames"

export default function Home() {
	return (
		<main>
			<Hero />
			<PopularGames />
			<GallerySlider />
		</main>
	)
}
