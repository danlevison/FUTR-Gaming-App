import Link from "next/link"
import Image from "next/image"
import heroImg from "@/../public/assets/hero-img.jpg"
import { FaGamepad } from "react-icons/fa"

export default function Hero() {
	return (
		<section className="relative flex items-center min-h-screen px-8">
			<Image
				src={heroImg}
				alt="Space"
				placeholder="blur"
				quality={100}
				fill
				sizes="100vw"
				style={{ objectFit: "cover" }}
				className="z-[-50] opacity-50"
			/>
			<div className="max-w-[1240px]">
				<div className="w-full max-w-[500px] md:ml-10 lg:ml-24">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide">
						Find your game.
					</h1>
					<p className="my-7 leading-relaxed text-base md:text-lg">
						Jump-start your gaming collection with titles from Steam,
						PlayStation, Xbox, GOG and more. Enhance your profile and show off
						your gaming interests!
					</p>
					<Link
						href="games"
						className="flex items-center gap-4 w-full max-w-[170px] bg-transparent uppercase border-accentPrimary border-2 rounded-md p-2"
					>
						<FaGamepad size={30} />
						Search now
					</Link>
				</div>
			</div>
		</section>
	)
}
