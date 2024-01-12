import Hero from "@/components/home/Hero"
import GamesOfYear from "@/components/home/GamesOfYear"
import GallerySlider from "@/components/home/GallerySlider"

export default function Home() {
	return (
		<main className="w-full">
			<Hero />
			<GamesOfYear />
			<GallerySlider />
		</main>
	)
}
