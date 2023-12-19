import GallerySlider from "@/components/GallerySlider"
import Hero from "@/components/home/Hero"
import PopularGames from "@/components/home/PopularGames"
import Link from "next/link"

export default function Home() {
	return (
		<main className="w-full">
			<Hero />
			<PopularGames />
			<GallerySlider />
			<section className="flex flex-col justify-center items-center min-h-screen w-full max-w-[1440px] mx-auto py-20 px-8 text-center">
				<h2 className="font-bold uppercase text-3xl sm:text-4xl tracking-wider">
					Join the <span className="text-accentPrimary">community</span>
				</h2>
				<p className="leading-relaxed sm:text-lg max-w-[700px] py-10">
					Welcome to our gaming Discord community! Dive into a hub of gaming
					excellence, where enthusiasts unite to share experiences, discover
					releases, and discuss strategies. Whether you&apos;re a seasoned
					player or just starting your gaming journey, join us for vibrant
					discussions, exclusive insights, and a supportive network of
					like-minded individuals. 🚀🌐 Level up your gaming experience with us!
					🎮
				</p>
				<Link
					href={"/"}
					className="bg-accentPrimary p-3 text-lg rounded-md uppercase font-bold"
				>
					Join Discord
				</Link>
			</section>
		</main>
	)
}
