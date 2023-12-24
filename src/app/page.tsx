import GallerySlider from "@/components/GallerySlider"
import Hero from "@/components/home/Hero"
import PopularGames from "@/components/home/PopularGames"

export default function Home() {
	return (
		<main className="w-full md:w-[calc(100%-70px)]">
			<Hero />
			<PopularGames />
			<GallerySlider />
		</main>
	)
}
